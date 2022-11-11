import React, { useState, useEffect, useRef } from 'react';

import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { formatTimeStamp, formatDate } from '../../commons/dateTime'
import {
    EMAIL_REGEX,
    PHONE_REGEX,
    UserRules,
} from "../../constants"
import { toastMsg } from '../../commons/toast';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import copy from "copy-to-clipboard";
import { useForm } from "react-hook-form";
import { Dropdown } from 'primereact/dropdown';
import { role } from "./dropDown";
import { editEmployeeRequest, deleteEmployeeRequest } from "../../redux/overviewEmployee/actionEmployee";
const InformationUser = ({ isOpenInformationUser, setIsOpenInformationUser, rowdata, setIsOpenCreateUser }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [isEditUsername, setEditUsername] = useState(false);
    const [isEditPhone, setEditPhone] = useState(false);
    const [isEditEmail, setEditEmail] = useState(false);
    const [isEditRole, setEditRole] = useState(false);
    const putUser = useSelector(state => state.employee?.edituser)
    const deleteUser = useSelector(state => state.employee?.deleteuser)

    const dispatch = useDispatch()
    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm();
    const toast = useRef(null);
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        if (putUser?.data) {
            setIsOpenInformationUser(false)
            toastMsg.success(toast, 'Cập nhật thành công')
        }

        if (putUser?.error) {
            toastMsg.error(toast, 'Cập nhật thất bại')
        }



    }, [putUser, setIsOpenInformationUser])

    useEffect(() => {
        if (deleteUser?.data) {
            setIsOpenInformationUser(false)
            toastMsg.success(toast, 'Xóa khách hàng thành công')
        }

        if (deleteUser?.error) {
            toastMsg.error(toast, 'Xóa khách hàng thất bại')
        }
    }, [deleteUser, setIsOpenInformationUser])

    useEffect(() => {
        if (rowdata?.data) {
            setValue("fullname", rowdata?.data?.fullname)
            setValue("phone", rowdata?.data?.phone)
            setValue("births", new Date(rowdata?.data?.births))
            setValue("start_day", new Date(rowdata?.data?.start_day))
            setValue("address", rowdata?.data?.address)
            setValue("email", rowdata?.data?.email)
            if (rowdata?.data?.role) {
                for (let item of role) {
                    if (item.code === rowdata?.data?.role) {
                        setUserRole(item)
                        break
                    }
                }
            }
        }
    }, [rowdata, setValue])

    const onSubmit = (data) => {
        setIsSubmit(true)
        delete data["births"];
        delete data["start_day"];
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
            dispatch(editEmployeeRequest(formData))
        }
    };

    const handleCloseModal = () => {
        setIsOpenInformationUser(false)
        setIsSubmit(false)
        setEditEmail(false)
        setEditPhone(false)
        setEditRole(false)
        setEditUsername(false)
        reset()
    }

    const handleDeleteUser = () => {
        const formdata = {}
        formdata.id = rowdata?.data?.id_system
        formdata.index = rowdata?.index
        dispatch(deleteEmployeeRequest(formdata))
    }

    const handleRemoveRow = (event) => {
        const myConfirm = confirmPopup({
            target: event.currentTarget,
            message: 'Bạn có chắc muốn xóa tài khoản nhân viên này?',
            icon: 'pi pi-exclamation-triangle',
            accept: handleDeleteUser,
            acceptLabel: "Đồng ý",
            rejectLabel: "Hủy bỏ"
        });

        myConfirm.show();
    }
    const handleCreateNewUser = () => {
        setIsOpenInformationUser(false)
        setTimeout(() => {
            setIsOpenCreateUser(true)
        }, 100)
    }

    const copyToClipboard = () => {
        toastMsg.success(toast, 'Sao chép mã nhân viên thành công')
        copy(rowdata?.data?.id_system);
    }
    return (
        <>
            <ConfirmPopup />
            <Toast ref={toast} position="bottom-left" />
            <Sidebar visible={isOpenInformationUser} position="right" onHide={handleCloseModal} className="create__job">
                <div className="creat__job">
                    <div className="creat__job--title flex justify-content-between">
                        <h2>Thông tin nhân viên </h2>
                        <Button onClick={handleRemoveRow}><img src="images/trash.svg" alt="" className="image__trash" /></Button>
                    </div>
                    <form className=" grid modal__creat--job no_flex" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div className="field col-12 md:col-12 grid">
                            <div className="field col-12 md:col-6">
                                <span htmlFor="autocomplete">Mã nhân viên: </span>
                                <span className="p-float-label pt-3 flex justify-content-between cursor__normal">
                                    <span className='font-bold'>{rowdata?.data?.id_system}</span>
                                    <img src="images/copy.svg" alt="" label="Bottom Right" onClick={copyToClipboard} className="cursor-pointer" />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label open__modal text-bold">
                                    <span onClick={handleCreateNewUser}>Tạo nhân viên mới</span>
                                </span>
                            </div><div className="field col-12 md:col-6 create__job--calendar">
                                <span htmlFor="calendar">Ngày tháng năm sinh:</span>
                                <span className="p-float-label pt-3 cursor__normal font-bold">
                                    {formatDate(formatTimeStamp(rowdata?.data?.births))}
                                </span>
                            </div>
                            <div className="field col-12 md:col-6 create__job--calendar">
                                <span htmlFor="calendar">Ngày bắt đầu làm:</span>
                                <span className="p-float-label pt-3 cursor__normal font-bold">
                                    {formatDate(formatTimeStamp(rowdata?.data.start_day))}
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="employees">Trạng thái nhân viên:</span>
                                <span className={"p-float-label mt-3 m-0 flex justify-content-between align-items-center " + (rowdata?.data.status === UserRules.STATUS.OFFLINE ? 'btn_stop ' : (rowdata?.data.status === UserRules.STATUS.ONLINE ? 'btn_success' : 'btn_pending'))}>
                                    <span className={rowdata?.data.status === UserRules.STATUS.OFFLINE ? 'dots_offline ' : (rowdata?.data.status === UserRules.STATUS.ONLINE ? 'dots_online' : 'dots_busy')} ></span>{UserRules._STATUS[rowdata?.data.status]}
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="employees">Chức vụ nhân viên:<span className="warning">*</span></span>
                                <span onClick={(e) => setEditRole(true)} className="p-float-label ">
                                    {isEditRole ?
                                        (
                                            <Dropdown
                                                options={role}
                                                optionLabel="name"
                                                defaultValue={userRole}
                                                value={userRole}
                                                onChange={e => setUserRole(e.value)}
                                                disabled={user?.data?.role !== UserRules.ROLE.ADMIN ? true : false}
                                            />
                                        ) : (
                                            <span className='p-float-label mt-3'>
                                                <span className='font-bold'>{UserRules.ROLE_NAME[rowdata?.data?.role]}</span>
                                            </span>
                                        )
                                    }
                                </span>
                            </div>
                            <div className="field col-12 md:col-12 ">
                                <span htmlFor="autocomplete">Tên nhân viên: <span className="warning">*</span></span>
                                <span onClick={(e) => setEditUsername(true)} className="p-float-label cursor__edit mt-3">
                                    {isEditUsername ?
                                        (
                                            < InputText
                                                defaultValue={rowdata?.data?.fullname}
                                                onChange={(e) => setValue("fullname", e.target.value)}
                                                {...register("fullname", { required: true })}
                                                className={errors?.fullname && "p-invalid"}
                                            />
                                        ) : (
                                            <span className='font-bold'>{rowdata?.data?.fullname}</span>
                                        )
                                    }
                                </span>
                            </div>
                            <div className="field col-12 md:col-6 ">
                                <span htmlFor="withoutgrouping">Số điện thoại: <span className="warning">*</span></span>
                                <span onClick={(e) => setEditPhone(true)} className="p-float-label cursor__edit mt-3">
                                    {isEditPhone ?
                                        (
                                            <InputText
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                defaultValue={rowdata?.data?.phone}
                                                onChange={(e) => setValue("phone", e.target.value)}
                                                {...register("phone", { required: true, pattern: PHONE_REGEX })}
                                                className={errors?.phone && "p-invalid"}
                                            />
                                        ) : (
                                            <span className='font-bold'>{rowdata?.data?.phone}</span>
                                        )
                                    }
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="original__link">Email: <span className="warning">*</span></span>
                                <span onClick={(e) => setEditEmail(true)} className="p-float-label cursor__edit mt-3">
                                    {isEditEmail ?
                                        (
                                            <InputText
                                                defaultValue={rowdata?.data?.email}
                                                onChange={(e) => setValue("email", e.target.value)}
                                                {...register("email", { required: true, pattern: EMAIL_REGEX })}
                                                className={errors?.email && "p-invalid"}
                                            />
                                        ) : (
                                            <span className='font-bold'>{rowdata?.data?.email}</span>
                                        )
                                    }
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="original__link">Địa chỉ: <span className="warning">*</span></span>
                                <span className="p-float-label cursor__normal mt-3">
                                    {rowdata?.data?.address ? (<span className='font-bold'>{rowdata?.data?.address}</span>) : (<span className=''>Trống</span>)}
                                </span>
                            </div>
                            <div className="field col-12 md:col-12">
                                <span htmlFor="original__link">Danh sách công việc:</span>
                                <span className="p-float-label cursor__normal mt-3">
                                    <span className='font-bold'>{rowdata?.data?.address}</span>
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

export default InformationUser