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
import { UserRules, JobRules } from "../../constants";
import { InputText } from 'primereact/inputtext';
import { timezoneToDate } from '../../commons/dateTime';


const InformationJobs = () => {
    const toast = useRef(null);
    const dispatch = useDispatch()

    const [editStatusJobs, setEditStatusJobs] = useState(false);
    const [editTypeJobs, setEditTypeJobs] = useState(false);
    const [editQuality, setEditQuality] = useState(false);
    const [editModels, setEditModels] = useState(false);
    const [editFile, setEditTypeFile] = useState(false);
    const [editOrgLink, setEditOrgLink] = useState(false);

    const [typeFile, setTypeFile] = useState(false);
    const [statusJobs, setStatusJobs] = useState(false);
    const [typeJobs, setTypeJobs] = useState(false);

    const user = useSelector(state => state.auth.user)
    const isOpenInformationJob = useSelector(state => state.modal.isOpenInformationJob)
    const rowdata = useSelector(state => state.modal?.dataModalInformationJob)
    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm();


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
        reset()
    }

    const copyToClipboard = () => {
        toastMsg.success(toast, 'Sao chép mã thành công')
        copy(rowdata?.data?.id_system);
    }

    return (
        <>
            <Toast ref={toast} position="bottom-left" />
            <Sidebar visible={isOpenInformationJob} position="right" onHide={handleCloseModal} className="create__job">
                <div className="creat__job">
                    <div className="creat__job--title">
                        <h2>Thông tin công việc </h2>
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
                                <span htmlFor="statusjobs">Trạng thái công việc ( SALER ):<span className="warning">*</span></span>
                                <span onClick={(e) => setEditStatusJobs(true)} className="p-float-label cursor__edit">
                                    {editStatusJobs ?
                                        (
                                            <Dropdown
                                                options={type_status_jobs}
                                                optionLabel="name"
                                                defaultValue={statusJobs}
                                                value={statusJobs}
                                                onChange={e => setStatusJobs(e.value)}
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
                                <span htmlFor="typejobs">Loại công việc :<span className="warning">*</span></span>
                                <span onClick={(e) => setEditTypeJobs(true)} className="p-float-label cursor__edit">
                                    {editTypeJobs ?
                                        (
                                            <Dropdown
                                                options={type_jobs}
                                                optionLabel="name"
                                                defaultValue={typeJobs}
                                                value={typeJobs}
                                                onChange={e => setTypeJobs(e.value)}
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
                                <span htmlFor="start_day">Ngày tạo công việc:</span>
                                <span className="p-float-label pt-3 cursor__normal font-bold">
                                    {timezoneToDate(rowdata?.data.start_day)}
                                </span>
                            </div>
                            <div className="field col-12 md:col-6 create__job--calendar">
                                <span htmlFor="end_day">Ngày hạn chót công việc: <span className="warning">*</span></span>
                                <span className="p-float-label pt-3 cursor__normal font-bold">
                                    {timezoneToDate(rowdata?.data.end_day)}
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="statusjobs">Định dạng file:<span className="warning">*</span></span>
                                <span onClick={(e) => setEditTypeFile(true)} className="p-float-label cursor__edit">
                                    {editFile ?
                                        (
                                            <Dropdown
                                                options={type_files}
                                                optionLabel="name"
                                                defaultValue={typeFile}
                                                value={typeFile}
                                                onChange={e => setTypeFile(e.value)}
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
                                <span htmlFor="statusjobs">Editor:<span className="warning">*</span></span>
                                <span onClick={(e) => setEditTypeFile(true)} className="p-float-label cursor__edit">
                                    {editFile ?
                                        (
                                            <Dropdown
                                                options={type_files}
                                                optionLabel="name"
                                                defaultValue={typeFile}
                                                value={typeFile}
                                                onChange={e => setTypeFile(e.value)}
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
                            <div className="field col-12 md:col-6 create__job--calendar">
                                <span htmlFor="start_day">Link ảnh gốc:<span className="warning">*</span></span>
                                <span onClick={(e) => setEditOrgLink(true)} className="p-float-label mt-3 cursor__edit">
                                    {editOrgLink ?
                                        (
                                            <InputText
                                                defaultValue={rowdata?.data?.org_link}
                                                onChange={(e) => setValue("org_link", e.target.value)}
                                                {...register("org_link", { required: true, min: 1 })}
                                                className={errors?.quality && "p-invalid"}
                                            />
                                        ) : (
                                            <span className='font-bold cursor__normal'>
                                                <a href={rowdata?.data.org_link} target="_blank" rel="noreferrer">Link liên kết</a>
                                            </span>
                                        )
                                    }

                                </span>
                            </div>
                            <div className="field col-12 md:col-6 create__job--calendar">
                                <span htmlFor="start_day">Link ảnh gốc:<span className="warning">*</span></span>
                                <span onClick={(e) => setEditOrgLink(true)} className="p-float-label mt-3 cursor__edit">
                                    {editOrgLink ?
                                        (
                                            <InputText
                                                defaultValue={rowdata?.data?.org_link}
                                                onChange={(e) => setValue("org_link", e.target.value)}
                                                {...register("org_link", { required: true, min: 1 })}
                                                className={errors?.quality && "p-invalid"}
                                            />
                                        ) : (
                                            <span className='font-bold cursor__normal'>
                                                <a href={rowdata?.data.org_link} target="_blank" rel="noreferrer">Link liên kết</a>
                                            </span>
                                        )
                                    }

                                </span>
                            </div>
                            <div className="field col-12 md:col-12">
                                <span className="p-float-label">
                                    <span className="information_job_title">Nội dung yêu cầu :</span>
                                    <InputTextarea
                                        autoResize
                                        className="aria_content"
                                        disabled
                                        style={{ height: "150px" }}
                                    />
                                </span>
                            </div>
                            <div className="field col-12 md:col-12">
                                <span className="p-float-label">
                                    <span className="information_job_title">Yêu cầu của khách hàng :</span>
                                    <InputTextarea
                                        autoResize
                                        className="aria_note"
                                        disabled
                                        style={{ height: "150px" }}
                                    />
                                </span>
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
            </Sidebar>
        </>
    )
}

export default InformationJobs