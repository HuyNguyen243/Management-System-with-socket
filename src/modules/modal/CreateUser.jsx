import React, { useEffect, useRef } from 'react';

import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { addCustomerRequest } from '../../redux/sale/action';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';

import { type_role } from "./dropDown";

import { EMAIL_REGEX, PHONE_REGEX } from '../../constants';

const CreateUser = ({ isOpenCreateUser, setIsOpenCreateUser }) => {
    const toast = useRef(null);

    const dispatch = useDispatch()
    const defaultValues = {
        fullname: '',
        birth: null,
        startwork: null,
        phone: "",
        email: "",
        type_role: '',
        address: '',
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const user = useSelector(state => state.auth?.user)
    const customer = useSelector(state => state.sale.customer)
    console.log(user);
    useEffect(() => {

        if (customer?.data) {
            reset();
            setIsOpenCreateUser(false)
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Tạo khách hàng mới thành công', life: 1000 });
        }
        if (customer?.error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Tạo khách hàng mới thất bại', life: 1000 });
        }
    }, [customer, reset, setIsOpenCreateUser])

    const onSubmit = (data) => {

        if (Object.keys(errors).length === 0) {
            data.create_by = user?.data?.id_system
            dispatch(addCustomerRequest(data))
        }
    };

    return (
        <>
            <Toast ref={toast} position="bottom-right" />
            <Sidebar visible={isOpenCreateUser} position="right" onHide={() => setIsOpenCreateUser(false)} className="create__job">
                <div className="creat__job">
                    <div className="creat__job--title">
                        <h2>Tạo nhân viên mới</h2>
                    </div>
                    <form className=" grid modal__creat--job no_flex" onSubmit={handleSubmit(onSubmit)}>
                        <div className="field col-12 md:col-12 grid">
                            <div className="field col-12 md:col-12">
                                <span htmlFor="autocomplete">Nhập tên nhân viên: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <Controller name="fullname"
                                        control={control}
                                        rules={{ required: true }} render={({ field, fieldState }) => (
                                            <InputText
                                                id={field.name}
                                                {...field}
                                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                            />
                                        )} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6 create__job--calendar">
                                <span htmlFor="calendar">Ngày tháng năm sinh:<span className="warning">*</span></span>
                                <span className="p-float-label ">
                                    <Controller name="birth"
                                        control={control}
                                        rules={{ required: false }} render={({ field, fieldState }) => (
                                            <Calendar
                                                id={field.name} className={classNames({ 'p-invalid': fieldState.invalid })}
                                                value={field.value} onChange={(e) => field.onChange(e.value)}
                                            />
                                        )} />
                                </span>
                                <img src="/images/calendar.svg" alt="" className="calendar__image" />
                            </div>
                            <div className="field col-12 md:col-6 create__job--calendar">
                                <span htmlFor="calendar">Ngày bắt đầu làm:<span className="warning">*</span></span>
                                <span className="p-float-label ">
                                    <Controller name="startwork"
                                        control={control}
                                        rules={{ required: false }} render={({ field, fieldState }) => (
                                            <Calendar
                                                id={field.name} className={classNames({ 'p-invalid': fieldState.invalid })}
                                                value={field.value} onChange={(e) => field.onChange(e.value)}
                                            />
                                        )} />
                                </span>
                                <img src="/images/calendar.svg" alt="" className="calendar__image" />
                            </div>
                            <div className="field col-12 md:col-6 ">
                                <span htmlFor="withoutgrouping">Số điện thoại: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <Controller name="phone"
                                        control={control}
                                        rules={{ required: true, pattern: { value: PHONE_REGEX } }} render={({ field, fieldState }) => (
                                            <InputText
                                                id={field.name}
                                                {...field}
                                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                            />
                                        )} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="employees">Chức vụ: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <Controller name="type_role"
                                        control={control}
                                        rules={{ required: true }} render={({ field, fieldState }) => (
                                            <Dropdown
                                                options={type_role}
                                                optionLabel="name"
                                                value={field.value} onChange={(e) => field.onChange(e.value)}
                                                className={classNames({ 'p-invalid': fieldState.invalid }, "create__role_type")}
                                            />
                                        )} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="original__link">Email: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <Controller name="email"
                                        control={control}
                                        rules={{ required: true, pattern: { value: EMAIL_REGEX } }} render={({ field, fieldState }) => (
                                            <InputText
                                                id={field.name}
                                                {...field}
                                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                            />
                                        )} />
                                </span>
                            </div>

                            <div className="field col-12 md:col-6">
                                <span htmlFor="employees">Địa chỉ nhân viên: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <Controller name="address"
                                        control={control}
                                        rules={{ required: true }} render={({ field, fieldState }) => (
                                            <InputText
                                                id={field.name}
                                                {...field}
                                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                            />
                                        )} />
                                </span>
                            </div>
                        </div>
                        <div className="btn_modal field col-12 md:col-12 grid position_bottom">
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label">
                                    <Button label="Hủy bỏ" className="p-button-outlined cancel--btn" onClick={() => {reset(); setIsOpenCreateUser(false);  }} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label">
                                    <Button label="Tạo mới" className="p-button-outlined p-button-secondary confirm--btn" type="submit" />
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </Sidebar>
        </>
    )
}

export default CreateUser;