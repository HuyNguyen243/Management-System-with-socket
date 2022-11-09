import React, { useState, useEffect, useRef } from 'react';

import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { formatTimeStamp, formatDate } from '../../commons/dateTime'
import {
    EMAIL_REGEX, 
    PHONE_REGEX, 
    UserRules, 
    USER_IS_ONLINE,
    USER_IS_STOPPING,
    USER_IS_OFFLINE
} from "../../constants"
import {
    editCustomerRequest,
    deleteCustomerRequest
} from '../../redux/sale/action';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { names, customer_status } from "./dropDown";

import { useForm } from "react-hook-form";

const InformationUser = ({ isOpenInformationUser, setIsOpenInformationUser, rowdata, setIsOpenCreateUser }) => {
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [customerStatus, setCustomerStatus] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [filteredNameCustomers, setFilteredNameCustomers] = useState(null);
    const putCustomer = useSelector(state => state.sale.editcustomer)
    const deleteCustomer = useSelector(state => state.sale.deletecustomer)

    const dispatch = useDispatch()
    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm();
    const toast = useRef(null);

    useEffect(() => {
        if (putCustomer?.data) {
            setIsOpenInformationUser(false)
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Cập nhật thành công', life: 1000 });
        }

        if (putCustomer?.error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Cập nhật thất bại', life: 1000 });
        }

        if (deleteCustomer?.data) {
            setIsOpenInformationUser(false)
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Xóa khách hàng thành công', life: 1000 });
        }

        if (deleteCustomer?.error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Xóa khách hàng thất bại', life: 1000 });
        }

    }, [putCustomer, setIsOpenInformationUser, deleteCustomer])

    useEffect(() => {
        console.log(rowdata);
        if (rowdata?.data) {
            setValue("fullname", rowdata?.data?.fullname)
            setValue("phone", rowdata?.data?.information?.phone)
            setValue("births", new Date(rowdata?.data?.information?.births))
            setValue("start_day", new Date(rowdata?.data?.information?.start_day))
            setValue("address", rowdata?.data?.information?.address?.detail)
            setValue("email", rowdata?.data?.information?.email)
            if (rowdata?.data?.status) {
                for (let item of customer_status) {
                    if (item.code === rowdata?.data?.status) {
                        setCustomerStatus(item)
                        break
                    }
                }
            }
        }
    }, [rowdata, setValue])

    const searchName = (event) => {
        setTimeout(() => {
            let _filteredNameCustomers;
            if (!event.query.trim().length) {
                _filteredNameCustomers = [...names];
            }
            else {
                _filteredNameCustomers = names.filter((item) => {
                    return item.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setFilteredNameCustomers(_filteredNameCustomers);
        }, 50);
    }

    const onSubmit = (data) => {
        setIsSubmit(true)
        if (city !== "" && country !== "") {
            const result = Object.assign(rowdata.data, {}, {
                fullname: data.fullname,
                information: {
                    phone: data.phone,
                    birth: data.birth,
                    email: data.email,
                    address: {
                        country: data.country,
                        city: data.city,
                        detail: data.address,
                    }
                },
                status: customerStatus?.code,
                _modified_at: new Date(Date.now())
            })
            data.status = customerStatus?.code
            const formData = {
                data: data,
                result: result,
                index: rowdata?.index
            }
            dispatch(editCustomerRequest(formData))
        }
    };

    const handleCloseModal = () => {
        setIsOpenInformationUser(false)
        setIsSubmit(false)
        reset()
    }

    const handleDeleteUser = () => {
        const formdata = {}
        formdata.id = rowdata?.data?.id_system
        formdata.index = rowdata?.index
        dispatch(deleteCustomerRequest(formdata))
    }

    const handleRemoveRow = (event) => {
        const myConfirm = confirmPopup({
            target: event.currentTarget,
            message: 'Bạn có chắc muốn tài khoản nhân viên này?',
            icon: 'pi pi-exclamation-triangle',
            accept: handleDeleteUser,
        });

        myConfirm.show();
    }
    const handleCreateNewUser = () => {
        setIsOpenInformationUser(false)
        setTimeout(() => {
            setIsOpenCreateUser(true)
        }, 100)
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
                    <form className=" grid modal__creat--job no_flex" onSubmit={handleSubmit(onSubmit)}>
                        <div className="field col-12 md:col-12 grid">
                            <div className="field col-12 md:col-6">
                                <span htmlFor="autocomplete">Mã nhân viên: </span>
                                <span className="p-float-label pt-3 cursor__normal">
                                    {rowdata?.data?.id_system}
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label open__modal text-bold">
                                    <span onClick={handleCreateNewUser}>Tạo nhân viên mới</span>
                                </span>
                            </div><div className="field col-12 md:col-6 create__job--calendar">
                                <span htmlFor="calendar">Ngày tháng năm sinh:</span>
                                <span className="p-float-label pt-3 cursor__normal">
                                    {formatDate(formatTimeStamp(rowdata?.data?.births))}
                                </span>
                            </div>
                            <div className="field col-12 md:col-6 create__job--calendar">
                                <span htmlFor="calendar">Ngày bắt đầu làm:</span>
                                <span className="p-float-label pt-3 cursor__normal">
                                    {formatDate(formatTimeStamp(rowdata?.data.start_day))}
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="employees">Trạng thái nhân viên:</span>
                                <span className="p-float-label pt-3">
                                    {
                                        rowdata?.data.status === UserRules.STATUS.OFFLINE ? rowdata?.data.status : ''
                                        // {
                                        //     // if(rowdata) {

                                        //     // }
                                        // }
                                    }
                                </span>
                            </div>
                            <div className="field col-12 md:col-12 ">
                                <span htmlFor="autocomplete">Tên nhân viên: <span className="warning">*</span></span>
                                <span className="p-float-label ">
                                    <InputText
                                        defaultValue={rowdata?.data?.fullname}
                                        onChange={(e) => setValue("fullname", e.target.value)}
                                        {...register("fullname", { required: true })}
                                        className={errors?.fullname && "p-invalid"}
                                    />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6 ">
                                <span htmlFor="withoutgrouping">Số điện thoại: <span className="warning">*</span></span>
                                <span className="p-float-label">
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
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="original__link">Email: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <InputText
                                        defaultValue={rowdata?.data?.email}
                                        onChange={(e) => setValue("email", e.target.value)}
                                        {...register("email", { required: true, pattern: EMAIL_REGEX })}
                                        className={errors?.email && "p-invalid"}
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

export default InformationUser