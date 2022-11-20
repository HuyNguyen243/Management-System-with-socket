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
import { type_status_jobs, type_jobs, type_files } from "./dropDown";
import { UserRules, JobRules, NOT_SET_ADMIN } from "../../constants";
import { InputText } from 'primereact/inputtext';
import { timezoneToDate } from '../../commons/dateTime';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { AutoComplete } from 'primereact/autocomplete';
import { dataParseEditor } from '../manager/jobs/dataParse';
import { dashboardEmployeeRequest } from "../../redux/overviewEmployee/actionEmployee";
import { deleteJobsRequest } from "../../redux/overviewJobs/actionJobs";
import { itemUserTemplate } from "../modal/TemplateDropDown";

const InformationJobs = () => {
    const toast = useRef(null);
    const dispatch = useDispatch()

    const [editStatusJobs, setEditStatusJobs] = useState(false);
    const [editTypeJobs, setEditTypeJobs] = useState(false);
    const [editQuality, setEditQuality] = useState(false);
    const [editModels, setEditModels] = useState(false);
    const [editFile, setEditTypeFile] = useState(false);
    const [editOrgLink, setEditOrgLink] = useState(false);
    const [editDoneLink, setEditDoneLink] = useState(false);
    const [editTotalCost, setEditTotalCost] = useState(false);
    const [editEditorCost, setEditEditorCost] = useState(false);
    const [editEditor, setEditEditor] = useState(false);

    const [typeFile, setTypeFile] = useState(false);
    const [statusJobs, setStatusJobs] = useState(false);
    const [typeJobs, setTypeJobs] = useState(false);
    const [selectEditor, setSelectEditor] = useState(false);
    const [filteredNameEditor, setFilteredNameEditor] = React.useState(null);

    const user = useSelector(state => state.auth.user)
    const isOpenInformationJob = useSelector(state => state.modal.isOpenInformationJob)
    const rowdata = useSelector(state => state.modal?.dataModalInformationJob)
    const deletejobs = useSelector(state => state.jobs?.deletejobs)

    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm();
    const employees = useSelector(state => state.employee?.dashboard)

    let editorName = dataParseEditor(employees?.data)


    useEffect(() => {
        if (rowdata?.data?.status_jobs) {
            for (let item of type_status_jobs) {
                if (item.code === rowdata?.data?.status_jobs) {
                    setStatusJobs(item)
                    break
                }
            }
        }
        if (rowdata?.data?.work_types) {
            for (let item of type_jobs) {
                if (item.code === rowdata?.data?.work_types) {
                    setTypeJobs(item)
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
            toastMsg.success(toast, 'Xóa khách hàng thành công')
        }
        if (deletejobs?.error) {
            toastMsg.error(toast, 'Xóa khách hàng thất bại')
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
        let keyword = "?keyword=Editor";
        dispatch(dashboardEmployeeRequest(keyword));
    }, [dispatch, filteredNameEditor])

    const onSubmit = (data) => {

        // delete data["births"];
        // delete data["start_day"];
        // const formDataPut = {}
        // Object.keys(data).forEach(item => {
        //     if (data[item] !== rowdata?.data[item]) {
        //         Object.assign(formDataPut, { [item]: data[item] })
        //     }
        // });
        // if (Object.keys(formDataPut).length > 0) {
        //     Object.assign(formDataPut, { id_system: rowdata?.data?.id_system })
        //     const formData = {
        //         data: data,
        //         result: formDataPut,
        //         index: rowdata?.index
        //     }
        //     dispatch(editEmployeeRequest(formData))
        // }
    };

    const handleCloseModal = () => {
        dispatch(setIsOpenInformationJob(false));
        setEditStatusJobs(false);
        setEditTypeJobs(false);
        setEditModels(false);
        setEditQuality(false);
        setEditTypeFile(false);
        setEditOrgLink(false);
        setEditDoneLink(false);
        setEditTotalCost(false);
        setEditEditorCost(false);
        setEditEditor(false);
        reset()
    }
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
                            <div className="field col-12 md:col-6 ">
                                <span htmlFor="typejobs">Loại ảnh :<span className="warning">*</span></span>
                                <span className="p-float-label  flex justify-content-between align-items-center cursor__edit">
                                    <span onClick={(e) => setEditQuality(true)} className="col-12 md:col-3">
                                        {editQuality ?
                                            (
                                                <InputText
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    defaultValue={rowdata?.data?.quality}
                                                    onChange={(e) => setValue("quality", e.target.value)}
                                                    {...register("quality", { required: true, min: 1 })}
                                                    className={errors?.quality && "p-invalid"}
                                                />
                                            ) : (
                                                <span className='p-float-label mt-3'>
                                                    <span className='font-bold'>{rowdata?.data?.quality}</span>
                                                </span>
                                            )
                                        }
                                    </span>
                                    <span className='mt-3'> - </span>
                                    <span onClick={(e) => setEditModels(true)} className="col-12 md:col-9">
                                        {editModels ?
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
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="status_jobs">Trạng thái công việc ( SALER ) :<span className="warning">*</span></span>
                                <span onClick={(e) => setEditStatusJobs(true)} className="p-float-label cursor__edit">
                                    {editStatusJobs ?
                                        (
                                            <Dropdown
                                                options={type_status_jobs}
                                                optionLabel="name"
                                                defaultValue={statusJobs}
                                                value={statusJobs}
                                                onChange={(e) => { setStatusJobs(e.value); setValue("status_jobs", e.value.code); }}
                                                disabled={(user?.data?.role === UserRules.ROLE.EDITOR && user?.data?.role === UserRules.ROLE.LEADER_EDITOR) ? true : false}
                                            />
                                        ) : (
                                            <span className={"p-float-label mt-3 m-0 flex justify-content-between align-items-center " + (rowdata?.data.status_jobs === JobRules.STATUS_JOBS.INCOMPLETE ? 'btn_stop ' : (rowdata?.data.status_jobs === JobRules.STATUS_JOBS.COMPLETE ? 'btn_success' : 'btn_pending'))}>
                                                {JobRules.STATUS_JOBS_NAME[rowdata?.data?.status_jobs]}
                                            </span>
                                        )
                                    }
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="work_types">Loại công việc :<span className="warning">*</span></span>
                                <span onClick={(e) => setEditTypeJobs(true)} className="p-float-label cursor__edit">
                                    {editTypeJobs ?
                                        (
                                            <Dropdown
                                                options={type_jobs}
                                                optionLabel="name"
                                                defaultValue={typeJobs}
                                                value={typeJobs}
                                                onChange={(e) => { setTypeJobs(e.value); setValue("work_types", e.value.code); }}
                                                disabled={(user?.data?.role === UserRules.ROLE.EDITOR && user?.data?.role === UserRules.ROLE.LEADER_EDITOR) ? true : false}
                                            />
                                        ) : (
                                            <span className="p-float-label mt-3 flex justify-content-between align-items-center font-bold" >
                                                {JobRules.JOBS_TYPES_NAME[rowdata?.data?.work_types]}
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
                                <span className="p-float-label pt-3 cursor__normal font-bold">
                                    {timezoneToDate(rowdata?.data.end_day)}
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="photo_types">Định dạng file :<span className="warning">*</span></span>
                                <span onClick={(e) => setEditTypeFile(true)} className="p-float-label cursor__edit">
                                    {editFile ?
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
                            <div className="field col-12 md:col-6">
                                <span htmlFor="id_editor">Editor :<span className="warning">*</span></span>
                                <span onClick={(e) => setEditEditor(true)} className="cursor__edit">
                                    {editEditor ?
                                        (
                                            <AutoComplete
                                                suggestions={filteredNameEditor}
                                                completeMethod={searchName} field="name"
                                                dropdown
                                                forceSelection
                                                itemTemplate={itemUserTemplate}
                                                {...register("id_editor", { required: true })}
                                                id={"id_editor"}
                                                value={selectEditor} onChange={(e) => { setSelectEditor(e.value); }}
                                                className={"icon__search"}
                                                dropdownAriaLabel="Select name"
                                            />
                                        ) : (
                                            <span className="p-float-label mt-3" >
                                                {rowdata?.data?.id_editor ? rowdata?.data?.id_editor : "Chưa giao việc"}
                                            </span>
                                        )
                                    }
                                </span>
                            </div>
                            <div className="field col-12 md:col-6 create__job--calendar">
                                <span htmlFor="org_link">Link ảnh gốc :<span className="warning">*</span></span>
                                <span onClick={(e) => setEditOrgLink(true)} className="p-float-label mt-3 cursor__edit">
                                    {editOrgLink ?
                                        (
                                            <InputText
                                                defaultValue={rowdata?.data?.org_link}
                                                onChange={(e) => setValue("org_link", e.target.value)}
                                                {...register("org_link", { required: true })}
                                                className={errors?.org_link && "p-invalid"}
                                            />
                                        ) : (
                                            <span className=''>
                                                <a href={rowdata?.data.org_link} target="_blank" rel="noreferrer">Link liên kết</a>
                                            </span>
                                        )
                                    }
                                </span>
                            </div>
                            <div className="field col-12 md:col-6 create__job--calendar">
                                <span htmlFor="finished_link">Link ảnh hoàn thành :<span className="warning">*</span></span>
                                <span onClick={(e) => setEditDoneLink(true)} className="p-float-label mt-3 cursor__edit">
                                    {editDoneLink ?
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
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="total_cost">Chi phí tổng :<span className="warning">*</span></span>
                                <span onClick={(e) => setEditTotalCost(true)} className="p-float-label mt-3 cursor__edit">
                                    {editTotalCost ?
                                        (
                                            <InputText
                                                defaultValue={rowdata?.data?.total_cost}
                                                onChange={(e) => setValue("total_cost", e.target.value)}
                                                {...register("total_cost", { required: true })}
                                                className={errors?.total_cost && "p-invalid"}
                                            />
                                        ) : (
                                            <span className='font-bold'>
                                                {rowdata?.data.total_cost} $
                                            </span>
                                        )
                                    }
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="editor_cost">Chi phí Editor :<span className="warning">*</span></span>
                                <span onClick={(e) => setEditEditorCost(true)} className="p-float-label mt-3 cursor__edit">
                                    {editEditorCost ?
                                        (
                                            <InputText
                                                defaultValue={rowdata?.data?.total_cost}
                                                onChange={(e) => setValue("editor_cost", e.target.value)}
                                                {...register("editor_cost", { required: true })}
                                                className={errors?.editor_cost && "p-invalid"}
                                            />
                                        ) : (
                                            <span className='font-bold'>
                                                {rowdata?.data.editor_cost}
                                            </span>
                                        )
                                    }
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="saler_cost">Chi phí Saler :</span>
                                <span className="p-float-label mt-3 cursor__normal">
                                    <span className='font-bold'>
                                        {rowdata?.data.saler_cost} $
                                    </span>
                                </span>

                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="saler_cost">Lợi nhuận :</span>
                                <span className="p-float-label mt-3 cursor__normal">
                                    <span className='font-bold'>
                                        {rowdata?.data.admin_cost}
                                    </span>
                                </span>
                            </div>
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
                                    onChange={(e) => setValue("request_content", e.target.value)}
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