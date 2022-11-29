import React, { useEffect, useRef, useState } from 'react'
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { toastMsg } from '../../commons/toast';
import copy from "copy-to-clipboard";
import { setIsOpenInformationJob } from '../../redux/modal/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Dropdown } from 'primereact/dropdown';
import { customer_status, type_files } from "./dropDown";
import { UserRules, JobRules, NOT_SET_ADMIN } from "../../constants";
import { InputText } from 'primereact/inputtext';
import { timezoneToDate } from '../../commons/dateTime';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { AutoComplete } from 'primereact/autocomplete';
import { dataParseEditor } from '../manager/jobs/dataParse';
import { dashboardEmployeeRequest } from "../../redux/overviewEmployee/actionEmployee";
import { deleteJobsRequest, editJobsRequest } from "../../redux/overviewJobs/actionJobs";
import { itemUserTemplate } from "../modal/TemplateDropDown";
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { formatUSD } from '../../commons/formatCost';
const InformationJobs = () => {
    const toast = useRef(null);
    const dispatch = useDispatch()
    let minDate = new Date();
    const [typeFile, setTypeFile] = useState(false);
    const [statusCustomer, setStatusCustomer] = useState(false);
    const [selectEditor, setSelectEditor] = useState(false);
    const [filteredNameEditor, setFilteredNameEditor] = useState(null);

    const [isOpenInput, setIsOpenInput] = useState({})

    const user = useSelector(state => state.auth.user)
    const isOpenInformationJob = useSelector(state => state.modal.isOpenInformationJob)
    const rowdata = useSelector(state => state.modal?.dataModalInformationJob)
    const deletejobs = useSelector(state => state.jobs?.deletejobs)
    const updatejobs = useSelector(state => state.jobs?.editjobs)

    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm();
    const employees = useSelector(state => state.employee?.dashboard)

    let editorName = dataParseEditor(employees?.data)


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
    }, [rowdata, setValue])



    useEffect(() => {
        if (deletejobs?.data) {
            dispatch(setIsOpenInformationJob(false))
            toastMsg.success(toast, 'Xóa công việc thành công')
        }
        if (deletejobs?.error) {
            toastMsg.error(toast, 'Xóa công việc thất bại')
        }
    }, [deletejobs, dispatch])

    const searchName = (event) => {
        setFilteredNameEditor(editorName);
        setTimeout(() => {
            let suggestionsList;
            if (!event.query.trim().length) {
                suggestionsList = [...editorName];
            } else {
                suggestionsList = [...editorName].filter((list) => {
                    return (
                        list.name.toLowerCase().startsWith(event.query.toLowerCase())
                        || list.id_system.toLowerCase().startsWith(event.query.toLowerCase())
                        || list.email.toLowerCase().startsWith(event.query.toLowerCase())
                    );
                });
            }
            setFilteredNameEditor(suggestionsList)
        }, 50);
    }
    useEffect(() => {
        if (isOpenInformationJob && !filteredNameEditor && user?.data?.role === "ADMIN") {
            let keyword = "?keyword=Editor";
            dispatch(dashboardEmployeeRequest(keyword));
        }
    }, [dispatch, filteredNameEditor, isOpenInformationJob, user?.data])

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
            dispatch(editJobsRequest(formData))
        }
    };
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
        reset
    ])

    useEffect(() => {
        if (updatejobs?.data && !updatejobs?.error) {
            handleCloseModal()
            toastMsg.success(toast, 'Cập nhật thành công')
        }
        if (updatejobs?.error) {
            toastMsg.error(toast, updatejobs?.data?.message)
        }
    }, [updatejobs, dispatch, handleCloseModal])

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

    const copyToClipboard = () => {
        toastMsg.success(toast, 'Sao chép mã thành công')
        copy(rowdata?.data?.id_system);
    }

    return (
        <>
            <ConfirmPopup />
            <Toast ref={toast} position="bottom-left" />
            <Sidebar visible={isOpenInformationJob} position="right" onHide={handleCloseModal} className="create__job">
                <div className="creat__job">
                    <div className="creat__job--title flex justify-content-between">
                        <h2>Thông tin công việc </h2>
                        <Button onClick={handleRemoveRow}><img src="images/trash.svg" alt="" className="image__trash" /></Button>
                    </div>
                    <form className=" grid modal__creat--job no_flex" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div className="field col-12 md:col-12 grid">
                            <div className="field col-12 md:col-6">
                                <span htmlFor="autocomplete">Mã công việc :</span>
                                <span className="p-float-label mt-3 flex justify-content-between cursor__normal">
                                    <span className='font-bold mt-1'>{rowdata?.data?.id_system}</span>
                                    <img src="images/copy.svg" alt="" label="Bottom Right" onClick={copyToClipboard} className="cursor-pointer" />
                                </span>
                            </div>
                            {user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" &&
                                <div className="field col-12 md:col-6">
                                    <span htmlFor="status_customer">Trạng thái khách hàng :<span className="warning">*</span></span>
                                    <span onClick={(e) => handleOpenInput("status_customer")} className={"p-float-label cursor__edit " + (isOpenInput?.status_customer ? "" : " mt-3 ")}>
                                        {isOpenInput?.status_customer ?
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
                                                <span className={"p-float-label mt-3 m-0 flex justify-content-between align-items-center " + (rowdata?.data.status_customer === JobRules.STATUS_CUSTOMER.UNREQUEST ? ' btn_stop ' : (rowdata?.data.status_customer === JobRules.STATUS_CUSTOMER.REQUEST ? ' btn_success' : ' btn_pending '))}>
                                                    {JobRules.STATUS_CUSTOMER_NAME[rowdata?.data?.status_customer]}
                                                </span>
                                            )
                                        }
                                    </span>
                                </div>
                            }
                            <div className="field col-12 md:col-6 ">
                                <span htmlFor="quality">Số lượng :<span className="warning">*</span></span>
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
                                <span htmlFor="type_models">Loại ảnh :<span className="warning">*</span></span>
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
                                    {timezoneToDate(rowdata?.data.start_day)}
                                </span>
                            </div>
                            <div className="field col-12 md:col-6 create__job--calendar">
                                <span htmlFor="end_day">Ngày hạn chót công việc : <span className="warning">*</span></span>
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
                                               { timezoneToDate(rowdata?.data.end_day)}
                                            </span>
                                        )
                                    }
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="photo_types">Định dạng file :<span className="warning">*</span></span>
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
                                                <AutoComplete
                                                    suggestions={filteredNameEditor}
                                                    completeMethod={searchName} field="name"
                                                    dropdown
                                                    forceSelection
                                                    itemTemplate={itemUserTemplate}
                                                    {...register("id_editor", { required: true })}
                                                    id={"id_editor"}
                                                    value={selectEditor} onChange={(e) => { setValue("id_editor", e.value.id_system); setSelectEditor(e.value); }}
                                                    className={"icon__search"}
                                                    dropdownAriaLabel="Select name"
                                                />
                                            ) : (
                                                <span className="p-float-label mt-3 font-bold" >
                                                    {rowdata?.data?.id_editor !== "NOT_SET_BY_ADMIN" ? rowdata?.data?.id_editor : "Chưa giao việc"}
                                                </span>
                                            )
                                        }
                                    </span>
                                </div>
                            }
                            <div className="field col-12 md:col-6 create__job--calendar">
                                <span htmlFor="org_link">Link ảnh gốc :<span className="warning">*</span></span>
                                <span onClick={(e) => handleOpenInput("org_link")} className={"p-float-label  " + ((user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR") ? "cursor__edit" : isOpenInput?.org_link ? "" : " mt-3 ")}>
                                    {user?.data?.role !== "LEADER_EDITOR" && user?.data?.role !== "EDITOR" && isOpenInput?.org_link ?
                                        (
                                            <InputText
                                                defaultValue={rowdata?.data?.org_link}
                                                onChange={(e) => setValue("org_link", e.target.value)}
                                                {...register("org_link", { required: true })}
                                                className={errors?.org_link && "p-invalid"}
                                            />
                                        ) : (
                                            <span className="p-float-label mt-3">
                                                <a href={rowdata?.data.org_link} target="_blank" rel="noreferrer">Link liên kết</a>
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
                                                <span className=''>
                                                    {rowdata?.data.finished_link === NOT_SET_ADMIN ?
                                                        "Trống"
                                                        :
                                                        < a href={rowdata?.data.finished_link} target="_blank" rel="noreferrer">Link liên kết</a>
                                                    }
                                                </span>
                                            )
                                        }
                                    </span>
                                </div>) : (
                                    < div className="field col-12 md:col-6 create__job--calendar">
                                        <span htmlFor="finished_link">Link ảnh hoàn thành :</span>
                                        <span className={"p-float-label  mt-3"}>
                                            <span className=''>
                                                {rowdata?.data.finished_link === NOT_SET_ADMIN ?
                                                    "Trống"
                                                    :
                                                    < a href={rowdata?.data.finished_link} target="_blank" rel="noreferrer">Link liên kết</a>
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
                                                    value={rowdata?.data?.total_cost} onValueChange={(e) => setValue("total_cost", e.target.value)}
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
                                    <span htmlFor="editor_cost">Chi phí Editor :<span className="warning">*</span></span>
                                    <span onClick={(e) => handleOpenInput("editor_cost")} className={"p-float-label " + (user?.data?.role === "ADMIN" ? "cursor__edit" : "mt-3")}>
                                        {user?.data?.role === "ADMIN" && isOpenInput?.editor_cost ?
                                            (
                                                <InputNumber id="editor_cost"
                                                    inputId="currency-vn"
                                                    // defaultValue={rowdata?.data?.editor_cost}
                                                    onValueChange={(e) => setValue("editor_cost", e.target.value)}
                                                    mode="currency"
                                                    currency="VND"
                                                    locale="vi-VN"
                                                    useGrouping={true}
                                                    className={"m-0"}
                                                />
                                            ) : (
                                                <span className='font-bold mt-3'>
                                                    {rowdata?.data?.editor_cost ? formatUSD(rowdata?.data?.editor_cost) : 0}
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
                                <span htmlFor="request_content">Nội dung yêu cầu :<span className="warning">*</span></span>
                                <InputTextarea
                                    autoResize
                                    className="aria_content mt-3"
                                    defaultValue={rowdata?.data.request_content}
                                    onChange={(e) => setValue("request_content", e.target.value)}
                                    {...register("request_content", { required: true })}
                                    style={{ height: "150px" }}
                                />
                            </div>
                            <div className="field col-12 md:col-12">
                                <span htmlFor="work_notes">Yêu cầu của khách hàng :<span className="warning">*</span></span>
                                <InputTextarea
                                    autoResize
                                    className="aria_note mt-3"
                                    defaultValue={rowdata?.data.request_content}
                                    onChange={(e) => setValue("work_notes", e.target.value)}
                                    {...register("work_notes", { work_notes: true })}
                                    style={{ height: "150px" }}
                                />
                            </div>
                        </div>
                        <div className="btn_modal field col-12 md:col-12 grid position_bottom">
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label">
                                    <Button label="Hủy bỏ" className="p-button-outlined cancel--btn" type="button" onClick={handleCloseModal} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label">
                                    <Button label="Cập nhật" className="p-button-outlined p-button-secondary confirm--btn" type="submit" />
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </Sidebar >
        </>
    )
}

export default InformationJobs