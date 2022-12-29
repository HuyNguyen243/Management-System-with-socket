import React, { useEffect, useRef, useState } from 'react';

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
import { toastMsg } from '../../commons/toast';
import { EMAIL_REGEX, PHONE_REGEX } from '../../constants';
import { setIsOpenModalCreateUser } from '../../redux/modal/modalSlice';
import { overlay } from '../../commons/overlay';

const CreateUser = () => {
    const toast = useRef(null);
    let maxDate = new Date();
    const dispatch = useDispatch()
    const [createSuccess, setCreateSuccess] = useState(true);
    const isOpenCreateUser = useSelector(state => state.modal.isOpenModalCreateUser)
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
    const { control, formState: { errors }, handleSubmit, reset, setValue, watch } = useForm({ defaultValues });
    const user = useSelector(state => state.auth?.user)
    const employee = useSelector(state => state.employee?.user)
    const randomPass = Math.random().toString(36).slice(-8);
    const [password] = useState(randomPass || null)
    
    useEffect(()=>{
        if(isOpenCreateUser){
            overlay.disable()
        }else{
            overlay.enable()
        }
    },[isOpenCreateUser])

    const onSubmit = (data) => {
        if (Object.keys(errors).length === 0) {
            data.create_by = user?.data.id_system;
            data.role = data.role?.code;
            dispatch(addEmployeeRequest(data))
        }
    };

    useEffect(() => {
        if (password) {
            setValue("password", password)
        }
    }, [password, setValue])

    useEffect(() => {
        if (employee?.data && !employee?.error) {
            setCreateSuccess(false)
            toastMsg.success(toast, 'Tạo thành viên mới thành công')
        }
        if (employee?.error) {
            setCreateSuccess(true)
            toastMsg.error(toast, employee?.data?.message)
        }
    }, [
        employee, reset, dispatch
    ])

    const copyToClipboard = (type) => {
        if (type === 'password') {
            toastMsg.success(toast, 'Sao chép mật khẩu thành công')
            copy(password);
        } else {
            toastMsg.success(toast, 'Sao chép tên đăng nhập thành công')
            copy(watch().username);
        }
    }

    return (
        <>
            <Toast ref={toast} position="bottom-left" />
            <Sidebar visible={isOpenCreateUser} position="right" onHide={() => { dispatch(setIsOpenModalCreateUser(false)); reset() }} className="create__job">
                <div className="creat__job">
                    <div className="creat__job--title">
                        <h2>Tạo nhân viên mới</h2>
                    </div>
                    <form className=" grid modal__creat--job no_flex" autoComplete="off" onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => { return e.key !== 'Enter'; }}>
                        <div className="field col-12 md:col-12 grid">
                            <div className="field col-12 md:col-12">
                                <span >Nhập tên nhân viên: <span className="warning">*</span></span>
                                <span className="">
                                    <Controller name="fullname"
                                        control={control}
                                        rules={{ required: "Chưa điền tên nhân viên" , minLength: 6 }} render={({ field, fieldState }) => (
                                            <InputText
                                                autoComplete="off"
                                                id={field.name}
                                                {...field}
                                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                                placeholder="Chọn nhân viên"
                                            />
                                        )} />
                                </span>
                            {
                                errors?.fullname &&  <span className="warning" style={{fontSize:"12px"}}>{errors?.fullname.message}</span>
                            }
                            {
                                errors?.fullname?.type === "minLength" &&  <span className="warning" style={{fontSize:"12px"}}>Tên nhân viên ít nhất 6 ký tự</span>
                            }
                            </div>
                            <div className="field col-12 md:col-12">
                                <span >Nhập tên đăng nhập: <span className="warning">*</span></span>
                                <span className="relative">
                                    <Controller name="username"
                                        control={control}
                                        rules={{ required: "Chưa điền tên đăng nhập" , minLength: 6 }} render={({ field, fieldState }) => (
                                            <InputText
                                                onKeyPress={(event) => {
                                                    if (event.key === " ") {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                autoComplete="off"
                                                id={field.name}
                                                {...field}
                                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                                placeholder="Điền tên đăng nhập"
                                            />
                                        )} />
                                    <img src="images/copy.svg" alt="" label="Bottom Left" className='copy__icon absolute copy__name' onClick={() => copyToClipboard("name")} />
                                </span>
                                {
                                    errors?.username &&  <span className="warning" style={{fontSize:"12px"}}>{errors?.username.message}</span>
                                }
                                 {
                                errors?.username?.type === "minLength" &&  <span className="warning" style={{fontSize:"12px"}}>Tên đăng nhập ít nhất 6 ký tự</span>
                            }
                            </div>
                            <div className="field col-12 md:col-12">
                                <span htmlFor="autocomplete">Mật khẩu mặc định:</span>
                                <span className="flex justify-content-between">
                                    <InputText
                                        readOnly={true}
                                        id="password"
                                        name="password"
                                        defaultValue={password}
                                        className={'readonly-class disabled'}
                                    />
                                    <img src="images/copy.svg" alt="" label="Bottom Left" className='copy__icon absolute copy__pwd' onClick={() => copyToClipboard("password")} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6 create__user--calendar">
                                <span htmlFor="calendar">Ngày tháng năm sinh:</span>
                                <span className="">
                                    <Controller name="births"
                                        control={control}
                                        rules={{ required: false }} render={({ field, fieldState }) => (
                                            <Calendar
                                                readOnlyInput
                                                maxDate={maxDate}
                                                id={field.name} className={classNames({ 'p-invalid': fieldState.invalid })}
                                                value={field.value} onChange={(e) => field.onChange(e.value)}
                                                placeholder="Chọn ngày tháng năm sinh"
                                            />
                                        )} />
                                </span>
                                <img src="/images/calendar.svg" alt="" className="calendar__image" />
                            </div>
                            <div className="field col-12 md:col-6 create__user--calendar">
                                <span htmlFor="calendar">Ngày bắt đầu làm:</span>
                                <span className=" ">
                                    <Controller name="start_day"
                                        control={control}
                                        rules={{ required: false }} render={({ field, fieldState }) => (
                                            <Calendar
                                                readOnlyInput
                                                maxDate={maxDate}
                                                id={field.name} className={classNames({ 'p-invalid': fieldState.invalid })}
                                                value={field.value} onChange={(e) => field.onChange(e.value)}
                                                placeholder="Chọn ngày bắt đầu làm"
                                            />
                                        )} />
                                </span>
                                <img src="/images/calendar.svg" alt="" className="calendar__image" />
                            </div>
                            <div className="field col-12 md:col-6 ">
                                <span htmlFor="withoutgrouping">Số điện thoại: <span className="warning">*</span></span>
                                <span className="">
                                    <Controller name="phone"
                                        control={control}
                                        rules={{ required: "chưa điền số điện thoại", pattern: { value: PHONE_REGEX } }} render={({ field, fieldState }) => (
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
                                                placeholder="Số điện thoại"
                                            />
                                        )} />
                                </span>
                                {
                                    errors?.phone &&  <span className="warning" style={{fontSize:"12px"}}>{errors?.phone.message}</span>
                                }
                                {
                                    errors?.phone?.type === "pattern" &&  <span className="warning" style={{fontSize:"12px"}}>Số điện thoại không hợp lệ</span>
                                }
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="employees">Chức vụ: <span className="warning">*</span></span>
                                <span className="">
                                    <Controller name="role"
                                        control={control}
                                        rules={{ required: "Chọn chức vụ" }} render={({ field, fieldState }) => (
                                            <Dropdown
                                                options={role}
                                                optionLabel="name"
                                                value={field.value} onChange={(e) => field.onChange(e.value)}
                                                className={classNames({ 'p-invalid': fieldState.invalid }, "create__role_type")}
                                                placeholder="Chọn chức vụ"
                                            />
                                        )} />
                                </span>
                                {
                                    errors?.role &&  <span className="warning" style={{fontSize:"12px"}}>{errors?.role.message}</span>
                                }
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="original__link">Email: <span className="warning">*</span></span>
                                <span className="">
                                    <Controller name="email"
                                        control={control}
                                        rules={{ required: "Chưa điền email", pattern: { value: EMAIL_REGEX } }} render={({ field, fieldState }) => (
                                            <InputText
                                                autoComplete="disabled"
                                                id={field.name}
                                                {...field}
                                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                                placeholder="Điền email"
                                            />
                                        )} />
                                </span>
                                {
                                    errors?.email &&  <span className="warning" style={{fontSize:"12px"}}>{errors?.email.message}</span>
                                }
                                {
                                    errors?.email?.type === "pattern" &&  <span className="warning" style={{fontSize:"12px"}}>Email không hợp lệ</span>
                                }
                            </div>

                            <div className="field col-12 md:col-6">
                                <span htmlFor="employees">Địa chỉ nhân viên:</span>
                                <span className="">
                                    <Controller name="address"
                                        control={control}
                                        rules={{ required: false }} render={({ field, fieldState }) => (
                                            <InputText
                                                autoComplete="disabled"
                                                id={field.name}
                                                {...field}
                                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                                placeholder="Điền địa chỉ"
                                            />
                                        )} />
                                </span>
                            </div>
                        </div>
                        {createSuccess &&
                            <div className="btn_modal field col-12 md:col-12 grid position_bottom">
                                <div className="field col-12 md:col-6">
                                    <span className="">
                                        <Button label="Hủy bỏ" className="p-button-outlined cancel--btn" type="button"
                                            onClick={() => { dispatch(setIsOpenModalCreateUser(false));reset() }} />
                                    </span>
                                </div>
                                <div className="field col-12 md:col-6">
                                    <span className="">
                                        <Button label="Tạo mới" className="p-button-outlined p-button-secondary confirm--btn" type="submit" />
                                    </span>
                                </div>
                            </div>
                        }
                    </form>
                </div>
            </Sidebar>
        </>
    )
}

export default CreateUser;