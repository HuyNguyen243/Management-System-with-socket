import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { useForm, Controller } from "react-hook-form";
import { EMAIL_REGEX, PHONE_REGEX, CustomerRules } from "../../constants"
import {
    editCustomerRequest,
    deleteCustomerRequest
} from '../../redux/sale/action';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { customer_status } from "./dropDown";
import { getCountries } from '../../commons/getCountry';
import { searchDropdown } from '../../commons/searchDropDown';
import { toastMsg } from '../../commons/toast';
import { UserRules } from '../../constants';
import copy from "copy-to-clipboard";
import { setIsOpenModalInformationCustomer } from '../../redux/modal/modalSlice';
import { timezoneToDate } from '../../commons/dateTime';
import { overlay } from '../../commons/overlay';
import { resetEditCustomer } from '../../redux/sale/saleSlice';

const InformationCustomer = () => {
    const [customerStatus, setCustomerStatus] = useState(null);
    const rowdata = useSelector(state => state.modal.dataModalInformationCustomer)
    const putCustomer = useSelector(state => state.sale.editcustomer)
    const deleteCustomer = useSelector(state => state.sale.deletecustomer)
    const isOpenInformationCustomer = useSelector(state => state.modal.isOpenModalInformationCustomer)
    const user = useSelector(state => state.auth.user)
    const [cities, setCities] = React.useState(null);
    const [filteredCity, setFilteredCity] = React.useState(null);
    const [countries, setCountries] = React.useState(null)
    const [filteredCountry, setFilteredCountry] = React.useState(null);

    const [isOpenInput, setIsOpenInput] = useState({})

    const dispatch = useDispatch()
    const { control, register, setValue, handleSubmit, formState: { errors }, reset } = useForm();
    const toast = useRef(null);

    const resetModal = React.useCallback(() => {
        dispatch(setIsOpenModalInformationCustomer(false))
        reset({ data: 'test' })
        setIsOpenInput({})
    }, [dispatch, reset])

    useEffect(() => {
        if (isOpenInformationCustomer) {
            overlay.disable()
        } else {
            overlay.enable()
        }
    }, [isOpenInformationCustomer])

    useEffect(() => {
        if (putCustomer?.data && !putCustomer?.error) {
            resetModal()
            toastMsg.success(toast, 'Cập nhật thành công')
            setTimeout(() => {
                dispatch(resetEditCustomer())
            }, 500);
        }

        if (putCustomer?.error) {
            toastMsg.error(toast, 'Cập nhật thất bại')
        }


    }, [putCustomer, dispatch, resetModal])

    useEffect(() => {
        if (deleteCustomer?.data && !deleteCustomer?.error) {
            resetModal()
            toastMsg.success(toast, 'Xóa khách hàng thành công')
            setTimeout(() => {
                dispatch(resetEditCustomer())
            }, 500);
        }

        if (deleteCustomer?.error) {
            toastMsg.success(toast, 'Xóa khách hàng thất bại')
        }
    }, [deleteCustomer, dispatch, resetModal])

    useEffect(() => {
        const getcountries = new getCountries()
        getcountries.get().then(data => setCountries(data));
    }, []);

    const getStatus = (status, getName = false) => {
        for (let item of customer_status) {
            if (item.code === status) {
                if (getName) {
                    return item.name
                } else {
                    return item
                }
            }
        }
    }

    useEffect(() => {
        if (rowdata?.data) {
            setValue("fullname", rowdata?.data?.fullname)
            setValue("phone", rowdata?.data?.information?.phone)
            setValue("birth", new Date(rowdata?.data?.information?.birth))
            setValue("address", rowdata?.data?.information?.address?.detail)
            setValue("country", rowdata?.data?.information?.address?.country)
            setValue("city", rowdata?.data?.information?.address?.city)
            setValue("email", rowdata?.data?.information?.email)
            setValue("infor_reminder", rowdata?.data?.infor_reminder)
            if (rowdata?.data?.status) {
                setCustomerStatus(getStatus(rowdata?.data?.status))
            }
        }
    }, [rowdata, setValue])

    const handleChangeCountry = (e, field) => {
        setValue("city", "")
        field.onChange(e.value)
        if (countries[e.value]) {
            setCities(countries[e.value])
        }
    }
    const onSubmit = (data) => {
        if (Object.keys(isOpenInput).length > 0) {
            const obj = {};
            const result = {
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
                infor_reminder: data?.infor_reminder,
                create_by: rowdata?.data?.create_by,
                id_system: rowdata?.data?.id_system,
                list_jobs: rowdata?.data?.list_jobs,
                _create_at: rowdata?.data?._create_at,
            }
            data.status = customerStatus?.code

            for (let item in result) {
                if (item !== "information" && result[item] !== rowdata?.data[item]) {
                    obj[item] = result[item]
                }
                
                if (item === "information") {
                    for (let item2 in result.information) {
                        const child2 = result[item][item2]
                        if (item2 !== "address" && item2 !== "birth" && child2 !== rowdata?.data[item][item2]) {
                            obj[item2] = child2
                        }
                        if (item2 === "birth") {
                            if (timezoneToDate(child2) !== timezoneToDate(rowdata?.data[item][item2])) {
                                obj[item2] = child2
                            }
                        }
                        if (item2 === "address") {
                            for (let item3 in child2) {
                                if (child2[item3] !== rowdata?.data[item][item2][item3]) {
                                    obj[item3] = child2[item3]
                                }
                            }
                        }
                    }
                }
            }
    
            if (Object.keys(obj).length > 0) {
                const formData = {
                    data: obj,
                    result: result,
                    index: rowdata?.index
                }
                dispatch(editCustomerRequest(formData))
            }
        }
    };

    const handleDeleteCustomer = () => {
        const formdata = {}
        formdata.id = rowdata?.data?.id_system
        formdata.index = rowdata?.index
        dispatch(deleteCustomerRequest(formdata))
    }

    const handleRemoveRow = (event) => {
        const myConfirm = confirmPopup({
            target: event.currentTarget,
            message: 'Bạn có chắc muốn xóa khách hàng này?',
            icon: 'pi pi-exclamation-triangle',
            accept: handleDeleteCustomer,
        });
        myConfirm.show();
    }

    const copyToClipboard = (type) => {
        toastMsg.info(toast, 'Sao chép thành công')
        if (type === "id_system") {
            copy(rowdata?.data?.id_system);
        }
        if (type === "create_by") {
            copy(rowdata?.data?.create_by);
        }
    }

    const handleOpenInput = (key) => {
        if (!Object.keys(isOpenInput).includes(key)) {
            setIsOpenInput({ ...isOpenInput, [key]: true })
        }
    }

    return (
        <>
            <ConfirmPopup />
            <Toast ref={toast} position="bottom-left" />
            <Sidebar visible={isOpenInformationCustomer} position="right" onHide={resetModal} className="create__job">
                <div className="creat__job">
                    <div className="creat__job--title flex justify-content-between" style={{ marginRight: "10px" }}>
                        <h2>Thông tin khách hàng </h2>
                        {
                            !rowdata?.error &&
                            <Button onClick={handleRemoveRow}><img src="images/trash.svg" alt="" className="image__trash" /></Button>
                        }
                    </div>
                    <form className=" grid modal__creat--job no_flex" onSubmit={handleSubmit(onSubmit)}>
                        {
                            rowdata?.error ?
                                <span className="notfound">Thông tin khách hàng không tồn tại</span>
                                :
                                <div className="field col-12 md:col-12 grid">
                                    <div className="field col-12 md:col-6 ">
                                        <span htmlFor="autocomplete">Tên khách hàng: <span className="warning">*</span></span>
                                        <span className="p-float-label cursor__edit">
                                            {
                                                isOpenInput?.fullname
                                                    ?
                                                    <InputText
                                                        defaultValue={rowdata?.data?.fullname}
                                                        onChange={(e) => setValue("fullname", e.target.value)}
                                                        {...register("fullname", { required: true, minLength: 3 })}
                                                        className={errors?.fullname && "p-invalid"}
                                                    />
                                                    :
                                                    <p onClick={() => handleOpenInput("fullname")} className="font-bold mt-3">{rowdata?.data?.fullname}</p>
                                            }

                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6 ">
                                        <span htmlFor="autocomplete">Biệt danh: <span className="warning">*</span></span>
                                        <span className="p-float-label cursor__edit">
                                            {
                                                isOpenInput?.infor_reminder
                                                    ?
                                                    <InputText
                                                        defaultValue={rowdata?.data?.infor_reminder}
                                                        onChange={(e) => setValue("infor_reminder", e.target.value)}
                                                        {...register("infor_reminder", { required: true })}
                                                        className={errors?.infor_reminder && "p-invalid"}
                                                    />
                                                    :
                                                    <p onClick={() => handleOpenInput("infor_reminder")} className="font-bold mt-3">{rowdata?.data?.infor_reminder}</p>
                                            }

                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="autocomplete">Mã khách hàng: </span>
                                        <span className="p-float-label pt-3 flex justify-content-between font-bold ">
                                            {rowdata?.data?.id_system}
                                            <img src="images/copy.svg" alt="id_system" className='cursor-pointer'  label="Bottom Right" onClick={(e) => copyToClipboard(e.target.alt)} />
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6 create__job--calendar">
                                        <span htmlFor="calendar">Ngày tháng năm sinh:<span className="warning">*</span></span>
                                        {
                                            isOpenInput?.birth
                                                ?
                                                <>
                                                    <span className="p-float-label ">
                                                        <Calendar
                                                            value={new Date(rowdata?.data?.information?.birth)}
                                                            onChange={e => setValue("birth", e.value)}
                                                            {...register("birth", { required: true })}
                                                            className={errors?.birth && "p-invalid"}
                                                        />
                                                    </span>
                                                    <img src="/images/calendar.svg" alt="" className="calendar__image" />
                                                </>
                                                :
                                                <p onClick={() => handleOpenInput("birth")} className="font-bold mt-3 cursor__edit">
                                                    {timezoneToDate(rowdata?.data?.information?.birth)}
                                                </p>
                                        }
                                    </div>
                                    <div className="field col-12 md:col-6 ">
                                        <span htmlFor="withoutgrouping">Số điện thoại: <span className="warning">*</span></span>
                                        <span className="p-float-label cursor__edit">
                                            {
                                                isOpenInput?.number
                                                    ?
                                                    <InputText
                                                        defaultValue={rowdata?.data?.information?.phone}
                                                        onChange={(e) => setValue("phone", e.target.value)}
                                                        {...register("phone", { required: true, pattern: PHONE_REGEX })}
                                                        className={errors?.phone && "p-invalid"}
                                                    />
                                                    :
                                                    <p onClick={() => handleOpenInput("number")} className="font-bold mt-3">{rowdata?.data?.information?.phone}</p>
                                            }
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="original__link">Email: <span className="warning">*</span></span>
                                        <span className="p-float-label cursor__edit">
                                            {
                                                isOpenInput?.email
                                                    ?
                                                    <InputText
                                                        defaultValue={rowdata?.data?.information?.email}
                                                        onChange={(e) => setValue("email", e.target.value)}
                                                        {...register("email", { required: true, pattern: EMAIL_REGEX })}
                                                        className={errors?.email && "p-invalid"}
                                                    />
                                                    :
                                                    <p onClick={() => handleOpenInput("email")} className="font-bold mt-3">{rowdata?.data?.information?.email}</p>
                                            }
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="original__link">Quốc gia: <span className="warning">*</span></span>
                                        {
                                            isOpenInput?.country
                                                ?
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
                                                :
                                                <p onClick={() => handleOpenInput("country")} className="font-bold mt-3 cursor__edit">{rowdata?.data?.information?.address?.country}</p>
                                        }

                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="cost">Thành phố: <span className="warning">*</span></span>
                                        <span className="p-float-label cursor__edit">
                                            {
                                                isOpenInput?.city
                                                    ?
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
                                                    :
                                                    <p onClick={() => handleOpenInput("city")} className="font-bold mt-3 ">{rowdata?.data?.information?.address?.city}</p>
                                            }
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="employees">Địa chỉ: <span className="warning">*</span></span>
                                        <span className="p-float-label cursor__edit">
                                            {
                                                isOpenInput?.address
                                                    ?
                                                    <InputText
                                                        defaultValue={rowdata?.data?.information?.address?.detail}
                                                        onChange={(e) => setValue("address", e.target.value)}
                                                        {...register("address", { required: true })}
                                                        className={errors?.address && "p-invalid"}
                                                    />
                                                    :
                                                    <p onClick={() => handleOpenInput("address")} className="font-bold mt-3">{rowdata?.data?.information?.address?.detail}</p>
                                            }
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="employees">Trạng thái khách hàng: <span className="warning">*</span></span>
                                        <span className="p-float-label cursor__edit">
                                            {
                                                isOpenInput?.status
                                                    ?
                                                    <Dropdown
                                                        options={customer_status}
                                                        optionLabel="name"
                                                        value={customerStatus}
                                                        onChange={e => setCustomerStatus(e.value)}
                                                        placeholder="Trạng thái khách hàng"
                                                        disabled={user?.data?.role !== UserRules.ROLE.ADMIN ? true : false}
                                                    />
                                                    :
                                                    <p onClick={() => handleOpenInput("status")} className={"p-label mt-3 m-0 " + (rowdata?.data?.status === CustomerRules.STATUS.PENDING ? "btn_pending" : (rowdata?.data?.status === CustomerRules.STATUS.REQUEST ? "btn_success" : "btn_stop"))}>{getStatus(rowdata?.data?.status, true)}</p>
                                            }
                                        </span>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="autocomplete">ID Người tạo: </span>
                                        <span className="p-float-label pt-3 flex justify-content-between font-bold">
                                            {rowdata?.data?.create_by}
                                            <img src="images/copy.svg" alt="create_by"  label="Bottom Right" className='cursor-pointer' onClick={(e) => copyToClipboard(e.target.alt)} />
                                        </span>
                                    </div>
                                </div>
                        }
                        <div className="btn_modal field col-12 md:col-12 grid position_bottom">
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label">
                                    <Button label="Hủy bỏ" className="p-button-outlined cancel--btn" type="button" onClick={resetModal} />
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

export default InformationCustomer