import React, { useEffect } from 'react';

import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { addCustomerRequest } from '../../redux/sale/action';
import { useDispatch, useSelector } from 'react-redux';
import { CustomerRules } from '../../constants';
import { getCountries } from '../../commons/getCountry';
import { AutoComplete } from 'primereact/autocomplete';

import { EMAIL_REGEX, PHONE_REGEX } from '../../constants';
import { setIsOpenModalCreateCustomer } from '../../redux/modal/modalSlice';
import { overlay } from '../../commons/overlay';
import { searchDropdown } from '../../commons/searchDropDown';

const CreateCustomer = () => {
    const isOpenCreateCustomer = useSelector(state => state.modal.isOpenModalCreateCustomer)

    const dispatch = useDispatch()
    const defaultValues = {
        fullname: '',
        birth: null,
        phone: "",
        email: "",
        country: '',
        city: '',
        address: '',
        infor_reminder: ''
    }
    const { control, formState: { errors }, handleSubmit, reset, setValue } = useForm({ defaultValues });
    const user = useSelector(state => state.auth?.user)
    const [countries, setCountries] = React.useState([])
    const [cities, setCities] = React.useState([]);
    const [filteredCountry, setFilteredCountry] = React.useState(null);
    const [filteredCity, setFilteredCity] = React.useState(null);
    const customer = useSelector(state => state.sale.customer)

    useEffect(() => {
        if (isOpenCreateCustomer) {
            overlay.enable()
        } else {
            overlay.disable()
        }
    }, [isOpenCreateCustomer])

    useEffect(() => {
        const getcountries = new getCountries()
        getcountries.get().then(data => setCountries(data));
    }, []);

    useEffect(() => {
        if (customer?.data && !customer?.error) {
            dispatch(setIsOpenModalCreateCustomer(false))
        }
    }, [customer, reset, dispatch])

    const onSubmit = (data) => {
        if (Object.keys(errors).length === 0) {
            data.create_by = user?.data?.id_system
            data.status = CustomerRules.STATUS.PENDING
            dispatch(addCustomerRequest(data))
        }
    };

    const handleChangeCountry = (e, field) => {
        setValue("city", "")
        field.onChange(e.value)
        if (countries[e.value]) {
            setCities(countries[e.value])
        }
    }

    return (
        <>
            <Sidebar visible={isOpenCreateCustomer} position="right" onHide={() => {dispatch(setIsOpenModalCreateCustomer(false)); reset();}} className="create__job">
                <div className="creat__job">
                    <div className="creat__job--title">
                        <h2>Tạo khách hàng mới</h2>
                    </div>
                    <form className=" grid modal__creat--job" autoComplete="off" onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => { return e.key !== 'Enter'; }}>
                        <div className="field col-12 md:col-12 grid">
                            <div className="field col-12 md:col-12">
                                <span htmlFor="autocomplete">Nhập tên khách hàng: <span className="warning">*</span></span>
                                <Controller name="fullname"
                                    control={control}
                                    rules={{ required: "Chưa điền tên khách hàng", minLength: 3 }} render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            className={classNames({ 'p-invalid': fieldState.invalid })}
                                            placeholder="Tên khách hàng"
                                        />
                                    )} />
                                {
                                    errors?.fullname && <span className="warning" style={{ fontSize: "12px" }}>{errors?.fullname.message}</span>
                                }
                                {
                                    errors?.fullname?.type === "minLength" && <span className="warning" style={{ fontSize: "12px" }}>Tên ít nhất 6 ký tự</span>
                                }
                            </div>
                            <div className="field col-12 md:col-12">
                                <span >Biệt danh:  <span className="warning">*</span></span>
                                <span className="">
                                    <Controller name="infor_reminder"
                                        control={control}
                                        rules={{ required: "Chưa điền biệt danh" }} render={({ field, fieldState }) => (
                                            <InputText
                                                autoComplete="disabled"
                                                id={field.name}
                                                {...field}
                                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                                placeholder="Điền biệt danh"
                                            />
                                        )} />
                                </span>
                                {
                                errors?.infor_reminder && <span className="warning" style={{ fontSize: "12px" }}>{errors?.infor_reminder.message}</span>
                                }
                            </div>
                          
                            <div className="field col-12 md:col-6 create__job--calendar">
                                <span htmlFor="calendar">Ngày tháng năm sinh:<span className="warning">*</span></span>
                                <Controller name="birth"
                                    control={control}
                                    rules={{ required: false }} render={({ field, fieldState }) => (
                                        <Calendar
                                            id={field.name} className={classNames({ 'p-invalid': fieldState.invalid })}
                                            value={field.value} onChange={(e) => field.onChange(e.value)}
                                            placeholder="Ngày sinh"
                                        />
                                    )} />
                                <img src="/images/calendar.svg" alt="" className="calendar__image" />
                            </div>
                            <div className="field col-12 md:col-6 ">
                                <span htmlFor="withoutgrouping">Số điện thoại: <span className="warning">*</span></span>
                                <Controller name="phone"
                                    control={control}
                                    rules={{ required: "Chưa điền số điện thoại", pattern: { value: PHONE_REGEX } }} render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            className={classNames({ 'p-invalid': fieldState.invalid })}
                                            placeholder="Số điện thoại"
                                        />
                                    )} />
                                {
                                    errors?.phone && <span className="warning" style={{ fontSize: "12px" }}>{errors?.phone.message}</span>
                                }
                                {
                                    errors?.phone?.type === "pattern" && <span className="warning" style={{ fontSize: "12px" }}>Số điện thoại không hợp lệ</span>
                                }
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="original__link">Email: <span className="warning">*</span></span>
                                <Controller name="email"
                                    control={control}
                                    rules={{ required: "Chưa điền địa chỉ email", pattern: { value: EMAIL_REGEX } }} render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            className={classNames({ 'p-invalid': fieldState.invalid })}
                                            placeholder="Nhập email"
                                        />
                                    )} />
                                {
                                    errors?.email && <span className="warning" style={{ fontSize: "12px" }}>{errors?.email.message}</span>
                                }
                                {
                                    errors?.email?.type === "pattern" && <span className="warning" style={{ fontSize: "12px" }}>Email không hợp lệ</span>
                                }
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="original__link">Quốc gia: <span className="warning">*</span></span>
                                <Controller name="country"
                                    control={control}
                                    rules={{ required: true }} render={({ field, fieldState }) => (
                                        <AutoComplete
                                            suggestions={filteredCountry}
                                            completeMethod={(e) => searchDropdown(e, countries, setFilteredCountry)} field=""
                                            aria-label="Countries"
                                            id={field.name}
                                            value={field.value} onChange={(e) => handleChangeCountry(e, field)}
                                            className={errors?.country && "p-invalid"}
                                            dropdownAriaLabel="Select name"
                                            placeholder="Quốc gia"
                                        />
                                    )}
                                />
                                {
                                    errors?.country && <span className="warning" style={{ fontSize: "12px" }}>{errors?.country.message}</span>
                                }
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="cost">Thành phố: <span className="warning">*</span></span>
                                {
                                    <Controller name="city"
                                        control={control}
                                        rules={{ required: true }} render={({ field, fieldState }) => (
                                            <AutoComplete
                                                suggestions={filteredCity}
                                                completeMethod={(e) => searchDropdown(e, cities, setFilteredCity)} field=""
                                                aria-label="Cities"
                                                id={field.name}
                                                value={field.value} onChange={(e) => { field.onChange(e.value) }}
                                                className={errors?.city && "p-invalid"}
                                                dropdownAriaLabel="Select name"
                                                placeholder="Thành phố"
                                            />
                                        )}
                                    />
                                }
                                {
                                    errors?.city && <span className="warning" style={{ fontSize: "12px" }}>{errors?.city.message}</span>
                                }
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="employees">Địa chỉ: <span className="warning">*</span></span>
                                <Controller name="address"
                                    control={control}
                                    rules={{ required: "Chưa điền địa chỉ" }} render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            className={classNames({ 'p-invalid': fieldState.invalid })}
                                            placeholder="Địa chỉ"
                                        />
                                    )} />
                                {
                                    errors?.address && <span className="warning" style={{ fontSize: "12px" }}>{errors?.address.message}</span>
                                }
                            </div>
                        </div>
                        <div className="btn_modal field col-12 md:col-12 grid position_bottom">
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label">
                                    <Button label="Hủy bỏ" className="p-button-outlined cancel--btn"
                                        onClick={() => { dispatch(setIsOpenModalCreateCustomer(false)); reset() }}
                                    />
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

export default CreateCustomer