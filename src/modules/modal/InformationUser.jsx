import React, { useState, useEffect, useRef } from 'react';

import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { timezoneToDate } from '../../commons/dateTime'
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
import { editEmployeeRequest, deleteEmployeeRequest } from "../../redux/overviewEmployee/actionEmployee";
import {
    setIsOpenModalCreateUser,
    setIsOpenModalInformationUser,
} from '../../redux/modal/modalSlice';
import { resetEditUser } from '../../redux/overviewEmployee/employeeSlice';
import { overlay } from '../../commons/overlay';
import { InputNumber } from 'primereact/inputnumber';

const InformationUser = () => {
    const putUser = useSelector(state => state.employee?.edituser)
    const deleteUser = useSelector(state => state.employee?.deleteuser)
    const isOpenInformationUser = useSelector(state => state.modal?.isOpenModalInformationUser)
    const rowdata = useSelector(state => state.modal?.dataModalInformationUser)
    const [isOpenInput, setIsOpenInput] = useState({})

    const dispatch = useDispatch()
    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm();
    const toast = useRef(null);

    useEffect(() => {
        if (isOpenInformationUser) {
            overlay.disable()
        } else {
            overlay.enable()
        }
    }, [isOpenInformationUser])

    useEffect(() => {
        if (putUser?.data && !putUser?.error) {
            dispatch(setIsOpenModalInformationUser(false))
            toastMsg.success(toast, 'Cập nhật thành công')
            setTimeout(()=>{
                dispatch(resetEditUser())
            },500)
        }

        if (putUser?.error) {
            toastMsg.error(toast, 'Cập nhật thất bại')
        }
    }, [putUser, dispatch])

    useEffect(() => {
        if (deleteUser?.data && !deleteUser?.error) {
            dispatch(setIsOpenModalInformationUser(false))
            toastMsg.success(toast, 'Xóa thành viên thành công')
        }
        if (deleteUser?.error) {
            toastMsg.error(toast, 'Xóa thành viên thất bại')
        }
    }, [deleteUser, dispatch])

    const onSubmit = (data) => {
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
        setIsOpenInput({});
        reset()
        dispatch(setIsOpenModalInformationUser(false))
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
        dispatch(setIsOpenModalInformationUser(false))
        setTimeout(() => {
            dispatch(setIsOpenModalCreateUser(true))
        }, 100)
    }

    const handleOpenInput = (key) => {
        if (!Object.keys(isOpenInput).includes(key)) {
            setIsOpenInput({ ...isOpenInput, [key]: true })
        }
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
                        {
                            !rowdata?.error &&
                            <Button onClick={handleRemoveRow}><img src="images/trash.svg" alt="" className="image__trash" /></Button>
                        }
                    </div>
                    <form className=" grid modal__creat--job no_flex" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        {
                            rowdata?.error ?
                                <span className="notfound">Nhân viên không tồn tại</span>
                                :
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
                                            {timezoneToDate(rowdata?.data?.births)}
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6 create__job--calendar">
                                        <span htmlFor="calendar">Ngày bắt đầu làm:</span>
                                        <span className="p-float-label pt-3 cursor__normal font-bold">
                                            {timezoneToDate(rowdata?.data?.start_day)}
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="employees">Trạng thái nhân viên:</span>
                                        <span className={"p-float-label mt-3 m-0 flex justify-content-between align-items-center " + (rowdata?.data?.status === UserRules.STATUS.OFFLINE ? 'btn_stop ' : (rowdata?.data?.status === UserRules.STATUS.ONLINE ? 'btn_success' : 'btn_pending'))}>
                                            {UserRules._STATUS[rowdata?.data?.status]}
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="employees">Chức vụ nhân viên:</span>
                                        <span className='p-float-label mt-4'>
                                            <span className='font-bold'>{UserRules.ROLE_NAME[rowdata?.data?.role]}</span>
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6 ">
                                        <span htmlFor="autocomplete">Tên nhân viên: <span className="warning">*</span></span>
                                        <span onClick={(e) => handleOpenInput("fullname")} className={"p-float-label cursor__edit " + (isOpenInput?.fullname ? "mt-2" : "mt-4")}>
                                            {isOpenInput?.fullname ?
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
                                        <span htmlFor="autocomplete">Biệt danh: <span className="warning">*</span></span>
                                        <span onClick={(e) => handleOpenInput("infor_reminder")} className={"p-float-label cursor__edit " + (isOpenInput?.infor_reminder ? "mt-2" : "mt-4")}>
                                            {isOpenInput?.infor_reminder ?
                                                (
                                                    < InputText
                                                        defaultValue={rowdata?.data?.infor_reminder}
                                                        onChange={(e) => setValue("infor_reminder", e.target.value)}
                                                        {...register("infor_reminder", { required: true })}
                                                        className={errors?.infor_reminder && "p-invalid"}
                                                    />
                                                ) : (
                                                    <span className='font-bold'>{rowdata?.data?.infor_reminder}</span>
                                                )
                                            }
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6 ">
                                        <span htmlFor="withoutgrouping">Số điện thoại: <span className="warning">*</span></span>
                                        <span onClick={(e) => handleOpenInput("phone")} className={"p-float-label cursor__edit " + (isOpenInput?.phone ? "mt-2" : "mt-4")}>
                                            {isOpenInput?.phone ?
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
                                        <span onClick={(e) => handleOpenInput("email")} className={"p-float-label cursor__edit " + (isOpenInput?.email ? "mt-2" : "mt-4")}>
                                            {isOpenInput?.email ?
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
                                        <span htmlFor="original__link">Địa chỉ: </span>
                                        <span className="p-float-label cursor__normal mt-4">
                                            {rowdata?.data?.address ? (<span className='font-bold mt-5 block'>{rowdata?.data?.address}</span>) : (<span className=''>Trống</span>)}
                                        </span>
                                    </div>
                                    {
                                        rowdata?.data?.role === UserRules?.ROLE?.SALER && 
                                        <div className="field col-12 md:col-6">
                                            <span htmlFor="original__link">Số tiền hoàn thành:($) </span>
                                            <span className="p-float-label cursor__normal mt-4">
                                                <InputNumber id="editor_cost"
                                                    inputId="currency-us"
                                                    value={rowdata?.data?.kpi_saler}
                                                    onValueChange={(e) => setValue("kpi_saler", e.target.value)}
                                                    mode="currency"
                                                    currency="USD"
                                                    locale="en-US"
                                                    useGrouping={true}
                                                    className={"m-0"}
                                                    minFractionDigits={0}
                                                />
                                            </span>
                                        </div>
                                    }
                                </div>
                        }

                        <div className="btn_modal field col-12 md:col-12 grid position_bottom">
                            <div className={`field col-12 md:col-${rowdata?.error ? "12" : "6"}`}>
                                <span className="p-float-label">
                                    <Button label="Hủy bỏ" className="p-button-outlined cancel--btn" type="button" onClick={handleCloseModal} />
                                </span>
                            </div>
                            {
                                !rowdata?.error &&
                                <div className="field col-12 md:col-6">
                                    <span className="p-float-label">
                                        <Button label="Cập nhật" className="p-button-outlined p-button-secondary confirm--btn" type="submit" />
                                    </span>
                                </div>
                            }
                        </div>
                    </form>
                </div>
            </Sidebar>
        </>
    )
}

export default InformationUser