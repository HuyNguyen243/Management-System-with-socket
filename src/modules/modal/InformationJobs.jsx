import React, { useEffect, useState } from 'react'
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import copy from "copy-to-clipboard";
import { setIsOpenInformationJob } from '../../redux/modal/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from 'primereact/dropdown';
import { customer_status, type_files } from "./dropDown";
import { UserRules, JobRules, NOT_SET_ADMIN, NAME_ROOM } from "../../constants";
import { InputText } from 'primereact/inputtext';
import { timezoneToDate } from '../../commons/dateTime';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { dashboardEmployeeRequest } from "../../redux/overviewEmployee/actionEmployee";
import { deleteJobsRequest, editJobsRequest, doneJobsRequest } from "../../redux/overviewJobs/actionJobs";
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { formatUSD, formatVND, convertUSD } from '../../commons/formatCost';
import { itemUserTemplate } from '../modal/TemplateDropDown';
import { overlay } from '../../commons/overlay';
import { getEmployeePerformance } from '../../redux/employeePerformance/action';
import { useLocation } from 'react-router';
import { resetJobRequest } from '../../redux/overviewJobs/jobsSlice';
import { orderIds } from '../../commons/message.common'
import { socket } from "../../_services/socket";
import { getCurrentRoom, setIsOpenChat } from '../../redux/messages/messageSlice';
import { resetJobCreated } from '../../redux/overviewJobs/jobsSlice';
import { inforToast, errorToast } from '../../commons/toast';

const InformationJobs = () => {
    const dispatch = useDispatch();
    let minDate = new Date();
    const [typeFile, setTypeFile] = useState(false);
    const location = useLocation();
    const { pathname } = location;
    const [statusCustomer, setStatusCustomer] = useState(false);
    const [workNotes, setWorkNotes] = useState(false);
    const [requestContent, setRequestContent] = useState(false);
    const [selectEditor, setSelectEditor] = useState(false);
    const [isOpenInput, setIsOpenInput] = useState({})
    const [idUserCreateJob, setIdUserCreateJob] = useState("")
    const [idEditorAdded, setIdEditorAdded] = useState("")

    const user = useSelector(state => state.auth.user)
    const isOpenInformationJob = useSelector(state => state.modal.isOpenInformationJob)
    const rowdata = useSelector(state => state.modal?.dataModalInformationJob)
    const deletejobs = useSelector(state => state.jobs?.deletejobs)
    const updatejobs = useSelector(state => state.jobs?.editjobs)
    const donejobs = useSelector(state => state.jobs?.donejobs)
    const members = useSelector(state=> state.message.allMembers)
    const currentUser = useSelector(state=> state.message.currentUser)

    const { control, register, setValue, handleSubmit, formState: { errors }, reset } = useForm();

    const employees = useSelector(state => state.employee?.dashboard)

    useEffect(() => {
        if (isOpenInformationJob) {
            overlay.disable()
        } else {
            overlay.enable()
        }
    }, [isOpenInformationJob])

    useEffect(() => {
        if (rowdata?.data?.status_jobs) {
            for (let item of customer_status) {
                if (item.code === rowdata?.data?.status_customer) {
                    setStatusCustomer(item)
                    break
                }
            }
        }
        if (rowdata?.data?.photo_types) {
            for (let item of type_files) {
                if (item.code === rowdata?.data?.photo_types) {
                    setTypeFile(item)
                    break
                }
            }
        }
        if (rowdata?.data?.work_notes) {
            setWorkNotes(rowdata?.data?.work_notes)
        }
        if (rowdata?.data?.request_content) {
            setRequestContent(rowdata?.data?.request_content)
        }
        if(rowdata?.data){
            setIdUserCreateJob(rowdata?.data?.id_saler)
            setIdEditorAdded(rowdata?.data?.id_editor)
        }
    }, [rowdata, setValue])

    useEffect(() => {
        if (deletejobs?.data) {
            if(pathname === "/workflow-management"){
                dispatch(getEmployeePerformance())
            }
            dispatch(setIsOpenInformationJob(false))
        }
    }, [deletejobs, dispatch, pathname])

    useEffect(() => {
        if (isOpenInformationJob && user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" && user?.data?.role !== "SALER") {
            let keyword = "?keyword=Editor";
            dispatch(dashboardEmployeeRequest(keyword));
        }
    }, [dispatch, isOpenInformationJob, user?.data])

    const handleOpenInput = (key) => {
        if (!Object.keys(isOpenInput).includes(key)) {
            setIsOpenInput({ ...isOpenInput, [key]: true })
        }
    }
    const handleCloseModal = React.useCallback(() => {
        dispatch(setIsOpenInformationJob(false));
        setSelectEditor(false);
        setIsOpenInput({});
        reset()
    }, [dispatch,
        setSelectEditor,
        reset,
    ])

    useEffect(() => {
        if (updatejobs?.data && !updatejobs?.error) {
            handleCloseModal()
            if(pathname === "/workflow-management"){
                dispatch(getEmployeePerformance())
            }
            setTimeout(() => {
                dispatch(resetJobRequest())
            }, 500);
        }
    
        setTimeout(() => {
            dispatch(resetJobCreated())
        }, 500);
    }, [updatejobs, dispatch, handleCloseModal, pathname])

    useEffect(() => {
        if (donejobs?.data && !donejobs?.error) {
            if(pathname === "/workflow-management"){
                dispatch(getEmployeePerformance())
            }
            handleCloseModal()
            setTimeout(() => {
                dispatch(resetJobRequest())
            }, 500);
        }
    }, [donejobs, dispatch, handleCloseModal, pathname])

    const handleDeleteJobs = () => {
        const formdata = {}
        formdata.id = rowdata?.data?.id_system
        formdata.index = rowdata?.index
        dispatch(deleteJobsRequest(formdata))
    }

    const handleRemoveRow = (event) => {
        const myConfirm = confirmPopup({
            target: event.currentTarget,
            message: 'Bạn có chắc muốn xóa công việc này?',
            icon: 'pi pi-exclamation-triangle',
            accept: handleDeleteJobs,
            acceptLabel: "Đồng ý",
            rejectLabel: "Hủy bỏ"
        });

        myConfirm.show();
    }

    const copyToClipboard = (type) => {
        inforToast('Sao chép thành công')
        if (type === "id_system") {
            copy(rowdata?.data?.id_system);
        }
        if (type === "org_link") {
            copy(rowdata?.data?.org_link);
        }
        if (type === "finished_link") {
            copy(rowdata?.data?.finished_link);
        }
    }
    
    const onSubmit = (data) => {
        const formDataPut = {}
        Object.keys(data).forEach(item => {
            if (data[item] !== rowdata?.data[item]) {
                Object.assign(formDataPut, { [item]: data[item] })
            }
        });
        if (Object.keys(formDataPut).length > 0) {
            Object.assign(formDataPut, { id_system: rowdata?.data?.id_system })
            const formData = {
                data: data,
                result: formDataPut,
                index: rowdata?.index
            }
       
            if (user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR") {
                dispatch(editJobsRequest(formData))
            } else {
                if(formData?.result?.finished_link){
                    dispatch(doneJobsRequest(formData))
                }else{
                    errorToast('Chưa cập nhật Link hoàn thành')
                }
            }
        }
    };

    useEffect(() => {
        if (rowdata?.data?.org_link) {
            setValue("org_link", rowdata?.data?.org_link)
        }
    }, [rowdata, setValue])

    const handleRedirectMessage = ()=>{
        if(idUserCreateJob !== "" && idEditorAdded !== "" && idEditorAdded !== UserRules.ROLE.NOT_SET_BY_ADMIN){
            const idRoom = orderIds(idUserCreateJob, idEditorAdded, NAME_ROOM.USER)
            let room = ""
            if(user?.data?.role === UserRules?.ROLE?.SALER || user?.data?.role === UserRules?.ROLE?.ADMIN){
                room = idEditorAdded
            }else if(user?.data?.role === UserRules?.ROLE?.EDITOR ){
                room = idUserCreateJob
            }
            const result = {
                name : room,
                room : idRoom
            }
            for( let member of members){
                if(member.id_system === room){
                    result.type = member?.role
                    break
                }
            }

            socket.emit("reset-notifications",result?.room, currentUser?.id_system)
            dispatch(getCurrentRoom(result))
            dispatch(setIsOpenChat(true))
            dispatch(setIsOpenInformationJob(false));
        }
    }

    return (
        <>
            <ConfirmPopup />
            <Sidebar visible={isOpenInformationJob} position="right" onHide={handleCloseModal} className="create__job">
                <div className="creat__job">
                    <div className="creat__job--title flex justify-content-between align-items-center">
                        <div className="flex align-items-center">
                            <h2 className="mr-2">
                                Thông tin công việc
                            </h2>
                            {
                                idUserCreateJob !== "" && idEditorAdded !== "" && idEditorAdded !== UserRules.ROLE.NOT_SET_BY_ADMIN && 
                                <img src="images/btn_chat.svg" alt="" className="cursor-pointer" onClick={handleRedirectMessage}/>
                            }
                        </div>
                            {
                                user?.data?.role === "ADMIN" && rowdata?.data && Object?.keys(rowdata?.data).length > 0 &&
                                <Button onClick={handleRemoveRow}><img src="images/trash.svg" alt="" className="image__trash" /></Button>
                            }
                    </div>
                    <form className=" grid modal__creat--job no_flex" onSubmit={handleSubmit(onSubmit)}>
                        {
                            rowdata?.data && Object?.keys(rowdata?.data).length === 0 ?
                                <span className="notfound">Thông tin công việc không tồn tại</span>
                                :
                                <div className="field col-12 md:col-12 grid">
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="autocomplete">Mã công việc :</span>
                                        <span className="p-float-label mt-3 flex justify-content-between cursor__normal">
                                            <span className='font-bold mt-1'>{rowdata?.data?.id_system}</span>
                                            <img src="images/copy.svg" alt="id_system" label="Bottom Right" onClick={(e) => copyToClipboard(e.target.alt)} className="cursor-pointer" />
                                        </span>
                                    </div>
                                    {user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" &&
                                        <div className="field col-12 md:col-6">
                                            <span htmlFor="status_customer">Trạng thái khách hàng :<span className="warning">*</span></span>
                                            <span onClick={(e) => handleOpenInput("status_customer")} className={"p-float-label " + (rowdata?.data?.finished_link !== NOT_SET_ADMIN ? "cursor__edit " : isOpenInput?.status_customer ? "" : " mt-3 ")}>
                                                {(rowdata?.data?.finished_link !== NOT_SET_ADMIN && isOpenInput?.status_customer) ?
                                                    (
                                                        <Dropdown
                                                            options={customer_status}
                                                            optionLabel="name"
                                                            defaultValue={statusCustomer}
                                                            value={statusCustomer}
                                                            onChange={(e) => { setStatusCustomer(e.value); setValue("status_customer", e.value.code); }}
                                                            disabled={(user?.data?.role === UserRules.ROLE.EDITOR && user?.data?.role === UserRules.ROLE.LEADER_EDITOR) ? true : false}
                                                        />
                                                    ) : (
                                                        <span className={"p-float-label mt-3 m-0 flex justify-content-between align-items-center " + (rowdata?.data?.status_customer === JobRules.STATUS_CUSTOMER.UNREQUEST ? ' btn_stop ' : (rowdata?.data?.status_customer === JobRules.STATUS_CUSTOMER.REQUEST ? ' btn_pending' : ' btn_success '))}>
                                                            {JobRules.STATUS_CUSTOMER_NAME[rowdata?.data?.status_customer]}
                                                        </span>
                                                    )
                                                }
                                            </span>
                                        </div>
                                    }
                                    <div className="field col-12 md:col-6 ">
                                        <span htmlFor="quality">Số lượng :{user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" && <span className="warning">*</span>}</span>
                                        <span onClick={(e) => handleOpenInput("quality")} className={"p-float-label " + ((user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR") ? "cursor__edit" : isOpenInput?.quality ? "" : " mt-3 ")}>
                                            {user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" && isOpenInput?.quality ?
                                                (
                                                    <InputNumber
                                                        value={rowdata?.data?.quality}
                                                        onValueChange={(e) => setValue("quality_img", e.value)}
                                                        mode="decimal"
                                                        className=''
                                                        max={9999}
                                                        min={1}
                                                    />
                                                ) : (
                                                    <span className='p-float-label mt-3'>
                                                        <span className='font-bold'>{rowdata?.data?.quality}</span>
                                                    </span>
                                                )
                                            }
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6 ">
                                        <span htmlFor="type_models">Loại ảnh :{user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" && <span className="warning">*</span>}</span>
                                        <span onClick={(e) => handleOpenInput("type_models")} className={"p-float-label " + ((user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR") ? "cursor__edit" : isOpenInput?.type_models ? "" : " mt-3 ")}>
                                            {user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" && isOpenInput?.type_models ?
                                                (
                                                    <InputText
                                                        defaultValue={rowdata?.data?.type_models}
                                                        onChange={(e) => setValue("type_models", e.target.value)}
                                                        {...register("type_models", { required: true, })}
                                                        className={errors?.type_models && "p-invalid"}
                                                    />
                                                ) : (
                                                    <span className='p-float-label mt-3'>
                                                        <span className='mt-3 font-bold'>{rowdata?.data?.type_models}</span>
                                                    </span>
                                                )
                                            }
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6 create__job--calendar">
                                        <span htmlFor="start_day">Ngày tạo công việc :</span>
                                        <span className="p-float-label pt-3 cursor__normal font-bold">
                                            {timezoneToDate(rowdata?.data?.start_day)}
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6 create__job--calendar">
                                        <span htmlFor="end_day">Deadline : {user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" && <span className="warning">*</span>}</span>
                                        <span onClick={(e) => handleOpenInput("end_day")} className={"p-float-label font-bold " + ((user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR") ? "cursor__edit" : isOpenInput?.end_day ? "" : " mt-3")} >
                                            {user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" && isOpenInput?.end_day ?
                                                (
                                                    <Calendar
                                                        readOnlyInput
                                                        minDate={minDate}
                                                        onChange={(e) => setValue("end_day", e.value)}
                                                    />
                                                ) : (
                                                    <span className='p-float-label mt-3'>
                                                        {timezoneToDate(rowdata?.data?.end_day)}
                                                    </span>
                                                )
                                            }
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="photo_types">Định dạng file :{user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" && <span className="warning">*</span>}</span>
                                        <span onClick={(e) => handleOpenInput("photo_types")} className={"p-float-label " + ((user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR") ? "cursor__edit" : isOpenInput?.photo_types ? "" : " mt-3 ")}>
                                            {user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" && isOpenInput?.photo_types ?
                                                (
                                                    <Dropdown
                                                        options={type_files}
                                                        optionLabel="name"
                                                        defaultValue={typeFile}
                                                        value={typeFile}
                                                        onChange={(e) => { setTypeFile(e.value); setValue("photo_types", e.value.code); }}
                                                        disabled={(user?.data?.role === UserRules.ROLE.EDITOR && user?.data?.role === UserRules.ROLE.LEADER_EDITOR) ? true : false}
                                                    />
                                                ) : (
                                                    <span className="p-float-label mt-3 flex justify-content-between align-items-center font-bold" >
                                                        {JobRules.PHOTO_TYPES[rowdata?.data?.photo_types]}
                                                    </span>
                                                )
                                            }
                                        </span>
                                    </div>
                                    {
                                        user?.data?.role === "ADMIN" &&
                                        <div className="field col-12 md:col-6">
                                            <span htmlFor="id_editor">Editor :<span className="warning">*</span></span>
                                            <span onClick={(e) => handleOpenInput("id_editor")} className={"p-float-label cursor__edit " + (isOpenInput?.id_editor ? "" : " mt-3 ")}>
                                                {isOpenInput?.id_editor ?
                                                    (
                                                        <Dropdown
                                                            options={employees.data}
                                                            optionLabel="fullname"
                                                            value={selectEditor}
                                                            itemTemplate={itemUserTemplate}
                                                            onChange={(e) => { setValue("id_editor", e.value?.id_system); setSelectEditor(e.value); }}
                                                            disabled={(user?.data?.role === UserRules.ROLE.EDITOR && user?.data?.role === UserRules.ROLE.LEADER_EDITOR) ? true : false}
                                                        />
                                                    ) : (
                                                        <span className="p-float-label mt-3 font-bold" >
                                                           {rowdata?.data?.id_editor !== "NOT_SET_BY_ADMIN" ? rowdata?.data?.reminder_editor: "Chưa giao việc"}
                                                        </span>
                                                    )
                                                }
                                            </span>
                                        </div>
                                    }
                                    <div className="field col-12 md:col-6 create__job--calendar">
                                        <span htmlFor="org_link">Link ảnh gốc :{user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" && <span className="warning">*</span>}</span>
                                        <span onClick={(e) => handleOpenInput("org_link")} className={"p-float-label  " + ((user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR") ? "cursor__edit" : isOpenInput?.org_link ? "" : " mt-3 ")}>
                                            {user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" && isOpenInput?.org_link ?
                                                (
                                                    <Controller
                                                        control={control}
                                                        rules={{
                                                            required: true,
                                                        }}
                                                        render={({ field: { onChange, onBlur, value } }) => (
                                                            <InputText
                                                                onBlur={onBlur}
                                                                onChange={onChange}
                                                                value={value}
                                                            />
                                                        )}
                                                        name="org_link"
                                                    />
                                                ) : (
                                                    <span className="p-float-label mt-3 flex justify-content-between">
                                                        <a href={rowdata?.data?.org_link} target="_blank" rel="noreferrer">Link liên kết</a>
                                                        <img src="images/copy.svg" alt="org_link" label="Bottom Right" onClick={(e) => copyToClipboard(e.target.alt)} className="cursor-pointer" />
                                                    </span>
                                                )
                                            }
                                        </span>
                                    </div>
                                    {(user?.data?.role === "EDITOR" || user?.data?.role === "LEADER_EDITOR") ?
                                        (< div className="field col-12 md:col-6 create__job--calendar">
                                            <span htmlFor="finished_link">Link ảnh hoàn thành :<span className="warning">*</span></span>
                                            <span onClick={(e) => handleOpenInput("finished_link")} className={"p-float-label cursor__edit " + (isOpenInput?.finished_link ? "" : " mt-3 ")}>
                                                {isOpenInput?.finished_link ?
                                                    (
                                                        <InputText
                                                            defaultValue={rowdata?.data?.finished_link === NOT_SET_ADMIN ? "" : rowdata?.data?.finished_link}
                                                            onChange={(e) => setValue("finished_link", e.target.value)}
                                                            {...register("finished_link", { required: true })}
                                                            className={errors?.finished_link && "p-invalid"}
                                                        />
                                                    ) : (
                                                        <span className='flex justify-content-between'>
                                                            {rowdata?.data?.finished_link === NOT_SET_ADMIN ?
                                                                "Trống"
                                                                :
                                                                <>
                                                                    < a href={rowdata?.data?.finished_link} target="_blank" rel="noreferrer">Link liên kết</a>
                                                                    <img src="images/copy.svg" alt="finished_link" label="Bottom Right" onClick={(e) => copyToClipboard(e.target.alt)} className="cursor-pointer" />
                                                                </>
                                                            }
                                                        </span>
                                                    )
                                                }
                                            </span>
                                        </div>) : (
                                            < div className="field col-12 md:col-6 create__job--calendar">
                                                <span htmlFor="finished_link">Link ảnh hoàn thành :</span>
                                                <span className={"p-float-label  mt-3"}>
                                                    <span className='flex justify-content-between'>
                                                        {rowdata?.data?.finished_link === NOT_SET_ADMIN ?
                                                            "Trống"
                                                            :
                                                            <>
                                                                < a href={rowdata?.data?.finished_link} target="_blank" rel="noreferrer">Link liên kết</a>
                                                                <img src="images/copy.svg" alt="finished_link" label="Bottom Right" onClick={(e) => copyToClipboard(e.target.alt)} className="cursor-pointer" />
                                                            </>
                                                        }
                                                    </span>
                                                </span>
                                            </div>
                                        )
                                    }
                                    {user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" &&
                                        <div className="field col-12 md:col-6">
                                            <span htmlFor="total_cost">Chi phí tổng :<span className="warning">*</span></span>
                                            <span onClick={(e) => handleOpenInput("total_cost")} className={"p-float-label cursor__edit " + (isOpenInput?.total_cost ? "" : " mt-3 ")}>
                                                {isOpenInput?.total_cost ?
                                                    (
                                                        <InputNumber
                                                            inputId="currency-us"
                                                            value={convertUSD(rowdata?.data?.total_cost)} onValueChange={(e) => setValue("total_cost", e.target.value)}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            useGrouping={true}
                                                            minFractionDigits={0}
                                                            className={errors?.total_cost && "p-invalid"}
                                                        />

                                                    ) : (
                                                        <span className='font-bold'>
                                                            {formatUSD(rowdata?.data?.total_cost)}
                                                        </span>
                                                    )
                                                }
                                            </span>
                                        </div>
                                    }
                                    {user?.data?.role !== "SALER" &&
                                        <div className="field col-12 md:col-6">
                                            <span htmlFor="editor_cost"  >Chi phí Editor :{user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" && <span className="warning">*</span>}</span>
                                            <span onClick={(e) => handleOpenInput("editor_cost")} className={"p-float-label " + (user?.data?.role === "ADMIN" ? "cursor__edit" : "mt-3")}>
                                                {user?.data?.role === "ADMIN" && isOpenInput?.editor_cost ?
                                                    (
                                                        <InputNumber id="editor_cost"
                                                            inputId="currency-vn"
                                                            value={rowdata?.data?.editor_cost}
                                                            onValueChange={(e) => setValue("editor_cost", e.target.value)}
                                                            mode="currency"
                                                            currency="VND"
                                                            locale="vi-VN"
                                                            useGrouping={true}
                                                            className={"m-0"}
                                                        />
                                                    ) : (
                                                        <span className='font-bold mt-3 block'>
                                                            {rowdata?.data?.editor_cost ? formatVND(rowdata?.data?.editor_cost) : 0}
                                                        </span>
                                                    )
                                                }
                                            </span>
                                        </div>
                                    }
                                    {user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" &&
                                        <div className="field col-12 md:col-6">
                                            <span htmlFor="saler_cost">Chi phí Saler :</span>
                                            <span className="p-float-label mt-3 cursor__normal">
                                                <span className='font-bold'>
                                                    {formatUSD(rowdata?.data?.saler_cost)}
                                                </span>
                                            </span>

                                        </div>
                                    }
                                    {user?.data?.role === "ADMIN" &&
                                        <div className="field col-12 md:col-6">
                                            <span htmlFor="saler_cost">Lợi nhuận :</span>
                                            <span className="p-float-label mt-3 cursor__normal">
                                                <span className='font-bold'>
                                                    {formatUSD(rowdata?.data?.admin_cost)}
                                                </span>
                                            </span>
                                        </div>
                                    }
                                    <div className="field col-12 md:col-12">
                                        <span htmlFor="request_content">Nội dung yêu cầu :{user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" && <span className="warning">*</span>}</span>
                                        <InputTextarea
                                            autoResize
                                            className="aria_content mt-3"
                                            value={requestContent}
                                            onChange={(e) => { setRequestContent(e.target.value); setValue("request_content", e.target.value) }}
                                            style={{ height: "150px" }}
                                        />

                                    </div>
                                    <div className="field col-12 md:col-12">
                                        <span htmlFor="work_notes">Yêu cầu của khách hàng :{user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" && <span className="warning">*</span>}</span>
                                        <InputTextarea
                                            autoResize
                                            className="aria_note mt-3"
                                            value={workNotes}
                                            onChange={(e) => { setWorkNotes(e.target.value); setValue("work_notes", e.target.value) }}
                                            style={{ height: "150px" }}
                                        />
                                    </div>
                                </div>
                        }
                        <div className="btn_modal field col-12 md:col-12 grid position_bottom">
                            <div className={`field col-12 md:col-${rowdata?.data && Object?.keys(rowdata?.data).length === 0 ? "12" : "6"}`}>
                                <span className="p-float-label">
                                    <Button label="Hủy bỏ" className="p-button-outlined cancel--btn" type="button" onClick={handleCloseModal} />
                                </span>
                            </div>
                            {
                                rowdata?.data && Object?.keys(rowdata?.data).length === 0 ?
                                    ""
                                    :
                                    <div className="field col-12 md:col-6">
                                        <span className="p-float-label">
                                            <Button label="Cập nhật" className="p-button-outlined p-button-secondary confirm--btn" type="submit" />
                                        </span>
                                    </div>
                            }

                        </div>
                    </form>
                </div>
            </Sidebar >
        </>
    )
}

export default InformationJobs