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
import { type_status_jobs, type_jobs } from "./dropDown";
import { UserRules, JobRules } from "../../constants"
const InformationJobs = () => {
    const toast = useRef(null);
    const dispatch = useDispatch()

    const [editStatusJobs, setEditStatusJobs] = useState(false);
    const [editTypeJobs, setEditTypeJobs] = useState(false);
    const [statusJobs, setStatusJobs] = useState(false);
    const [typeJobs, setTypeJobs] = useState(false);

    const user = useSelector(state => state.auth.user)
    const isOpenInformationJob = useSelector(state => state.modal.isOpenInformationJob)
    const rowdata = useSelector(state => state.modal?.dataModalInformationJob)
    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm();


    useEffect(() => {
        console.log(rowdata?.data);
        if (rowdata?.data?.status_jobs) {
            for (let item of type_status_jobs) {
                if (item.code === rowdata?.data?.status_jobs) {
                    setStatusJobs(item)
                    break
                }
            }
        } if (rowdata?.data?.work_types) {
            for (let item of type_jobs) {
                if (item.code === rowdata?.data?.work_types) {
                    setTypeJobs(item)
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
        dispatch(setIsOpenInformationJob(false))
        setEditStatusJobs(false)
        setEditTypeJobs(false)
        // setEditRole(false)
        // setEditUsername(false)
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
                                <span className="p-float-label pt-3 flex justify-content-between cursor__normal">
                                    <span className='font-bold'>{rowdata?.data?.id_system}</span>
                                    <img src="images/copy.svg" alt="" label="Bottom Right" onClick={copyToClipboard} className="cursor-pointer" />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="statusjobs">Trạng thái công việc ( SALER ):</span>
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
                                <span htmlFor="typejobs">Loại công việc :</span>
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
                            <div className="field col-12 md:col-6">
                                <span htmlFor="typejobs">Loại ảnh :</span>
                                <span className="p-float-label pt-3 flex align-items-center cursor__normal">
                                    <span className="p-float-label cursor__normal">
                                        <span className='font-bold'>{rowdata?.data?.quality}</span>
                                    </span>
                                    <span>&emsp; - &emsp;</span>
                                    <span className="p-float-label cursor__normal">
                                        <span className='font-bold'>{rowdata?.data?.type_models}</span>
                                    </span>
                                </span>

                            </div>
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label flex justify-content-between">
                                    <strong className="information_job_title">Số lượng ảnh :</strong>
                                    <span>99</span>
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label flex justify-content-between">
                                    <strong className="information_job_title ">Link ảnh gốc :</strong>
                                    <a href="https://www.freecodecamp.org/" target="_blank" rel="noreferrer">link liên kết</a>
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label flex justify-content-between">
                                    <strong className="information_job_title">Định dạng file :</strong>
                                    <span>PSD</span>
                                </span>
                            </div>
                            <div className="field col-12 md:col-6 ">
                                <span className="p-float-label flex justify-content-between">
                                    <strong className="information_job_title">Số tiền nhận được :</strong>
                                    <span>100.000đ</span>
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