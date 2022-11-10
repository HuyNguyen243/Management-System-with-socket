import React, { useEffect, useRef } from 'react';

import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { addEmployeeRequest } from '../../redux/overviewEmployee/actionEmployee';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import copy from "copy-to-clipboard";
import { role } from "./dropDown";

import { EMAIL_REGEX, PHONE_REGEX } from '../../constants';

const CreateUser = ({ isOpenCreateUser, setIsOpenCreateUser }) => {
    const toast = useRef(null);
    let maxDate = new Date();
    const dispatch = useDispatch()
    const defaultValues = {
        fullname: '',
        username: '',
        password: '',
        births: null,
        start_day: null,
        phone: '',
        email: '',
        role: '',
        address: '',
    }
    const { control, formState: { errors }, handleSubmit, reset, setValue } = useForm({ defaultValues });
    const user = useSelector(state => state.auth?.user)
    const employee = useSelector(state => state.employee?.user)
    const onSubmit = (data) => {
        if (Object.keys(errors).length === 0) {
            data.create_by = user?.data.id_system;
            data.role = data.role?.code;
            dispatch(addEmployeeRequest(data))
        }
    };
    const randomString = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const randomPass = randomString(8)

    useEffect(() => {
        setValue("password", randomPass)
    })
    useEffect(() => {
        if (employee?.data) {
            reset();
            setIsOpenCreateUser(false)
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Tạo khách hàng mới thành công', life: 1000 });
        }
        if (employee?.error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: employee?.data?.message, life: 1000 });
        }
    }, [
        employee, reset, setIsOpenCreateUser
    ])
    const copyToClipboard = () => {
        toast.current.show({ severity: 'success', summary: 'Thành Công', detail: 'Sao chép mật khẩu thành công', life: 1000 });
        copy(randomPass);
    }
    return (
        <>
            <Toast ref={toast} position="bottom-left" />
            <Sidebar visible={isOpenCreateUser} position="right" onHide={() => setIsOpenCreateUser(false)} className="create__job">
                <div className="creat__job">
                    <div className="creat__job--title">
                        <h2>Tạo nhân viên mới</h2>
                    </div>
                    <form className=" grid modal__creat--job no_flex" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div className="field col-12 md:col-12 grid">
                            <div className="field col-12 md:col-12">
                                <span >Nhập tên nhân viên: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <Controller name="fullname"
                                        control={control}
                                        rules={{ required: true }} render={({ field, fieldState }) => (
                                            <InputText
                                                autoComplete="off"
                                                id={field.name}
                                                {...field}
                                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                            />
                                        )} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-12">
                                <span >Nhập tên đăng nhập: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <Controller name="username"
                                        control={control}
                                        rules={{ required: true }} render={({ field, fieldState }) => (
                                            <InputText
                                                autoComplete="off"
                                                id={field.name}
                                                {...field}
                                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                            />
                                        )} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-12">
                                <span htmlFor="autocomplete">Mật khẩu mặc định:</span>
                                <span className="flex justify-content-between">
                                    <InputText
                                        readOnly={true}
                                        id="password"
                                        name="password"
                                        defaultValue={randomPass}
                                        className={'readonly-class'}
                                    />

                                    <img src="images/copy.svg" alt="" label="Bottom Left" className='copy__icon' onClick={copyToClipboard} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6 create__user--calendar">
                                <span htmlFor="calendar">Ngày tháng năm sinh:</span>
                                <span className="p-float-label">
                                    <Controller name="births"
                                        control={control}
                                        rules={{ required: false }} render={({ field, fieldState }) => (
                                            <Calendar
                                                readOnlyInput
                                                maxDate={maxDate}
                                                id={field.name} className={classNames({ 'p-invalid': fieldState.invalid })}
                                                value={field.value} onChange={(e) => field.onChange(e.value)}
                                            />
                                        )} />
                                </span>
                                <img src="/images/calendar.svg" alt="" className="calendar__image" />
                            </div>
                            <div className="field col-12 md:col-6 create__user--calendar">
                                <span htmlFor="calendar">Ngày bắt đầu làm:</span>
                                <span className="p-float-label ">
                                    <Controller name="start_day"
                                        control={control}
                                        rules={{ required: false }} render={({ field, fieldState }) => (
                                            <Calendar
                                                readOnlyInput
                                                maxDate={maxDate}
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
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                autoComplete="disabled"
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
                                    <Controller name="role"
                                        control={control}
                                        rules={{ required: true }} render={({ field, fieldState }) => (
                                            <Dropdown
                                                options={role}
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
                                                autoComplete="disabled"
                                                id={field.name}
                                                {...field}
                                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                            />
                                        )} />
                                </span>
                            </div>

                            <div className="field col-12 md:col-6">
                                <span htmlFor="employees">Địa chỉ nhân viên:</span>
                                <span className="p-float-label">
                                    <Controller name="address"
                                        control={control}
                                        rules={{ required: false }} render={({ field, fieldState }) => (
                                            <InputText
                                                autoComplete="disabled"
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
                                    <Button label="Hủy bỏ" className="p-button-outlined cancel--btn" onClick={() => { reset(); setIsOpenCreateUser(false); }} />
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