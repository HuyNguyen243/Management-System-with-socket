import React,{useEffect, useRef} from 'react';

import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { addCustomerRequest } from '../../redux/sale/action';
import { useDispatch,useSelector } from 'react-redux';
import { CustomerRules } from '../../constants';
import { Toast } from 'primereact/toast';
import { getCountries } from '../../commons/getCountry';

import { EMAIL_REGEX, PHONE_REGEX } from '../../constants';
import { searchDropdown } from '../../commons/searchDropDown';
import { toastMsg } from '../../commons/toast'; 

const CreateCustomer = ({isOpenCreateCustomer, setIsOpenCreateCustomer}) => {
    const toast = useRef(null);

    const dispatch = useDispatch()
    const defaultValues = {
        fullname: '',
        birth: null,
        phone: "",
        email: "",
        country: '',
        city: '',
        address: '',
    }
    const { control, formState: { errors }, handleSubmit, reset, setValue } = useForm({ defaultValues });
    const user = useSelector(state=>state.auth?.user)
    const customer = useSelector(state=>state.sale.customer)
    const [countries,setCountries] =React.useState(null)
    const [filteredCountry, setFilteredCountry] = React.useState(null); 
    const [cities,setCities] = React.useState(null);
    const [filteredCity, setFilteredCity] = React.useState(null); 

    useEffect(() => {
        const getcountries = new getCountries()
        getcountries.get().then(data => setCountries(data));
    }, []);

    useEffect(()=>{
        if(customer?.data){
            reset();
            setIsOpenCreateCustomer(false)
            toastMsg.success(toast,'Tạo khách hàng mới thành công')
        }
        if(customer?.error){
            toastMsg.error(toast,'Tạo khách hàng mới thất bại')
        }
    },[customer,reset,setIsOpenCreateCustomer])

    const onSubmit = (data) => {
        if(Object.keys(errors).length === 0){
            data.create_by = user?.data?.id_system
            data.status = CustomerRules.STATUS.PENDING
            dispatch(addCustomerRequest(data))
        }
    };

    const handleChangeCountry = (e,field)=>{
        setValue("city","")
        field.onChange(e.value)
        if(countries[e.value]){
            setCities(countries[e.value])
        }
    }

  return (
    <>
        <Toast ref={toast} position="bottom-left"/>
        <Sidebar visible={isOpenCreateCustomer} position="right" onHide={() => setIsOpenCreateCustomer(false)} className="create__job">
            <div className="creat__job">
                <div className="creat__job--title">
                    <h2>Tạo khách hàng mới</h2>
                </div>
                <form className=" grid modal__creat--job " onSubmit={handleSubmit(onSubmit)}>
                    <div className="field col-12 md:col-12 grid">
                        <div className="field col-12 md:col-12">
                            <span htmlFor="autocomplete">Nhập tên khách hàng: <span className="warning">*</span></span>
                                <Controller name="fullname" 
                                    control={control} 
                                    rules={{ required: true }} render={({ field, fieldState }) => (
                                    <InputText 
                                    id={field.name} 
                                    {...field}
                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                    placeholder="Tên khách hàng"
                                    />
                                )} />
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
                            <img src="/images/calendar.svg" alt="" className="calendar__image"/>
                        </div>
                        <div className="field col-12 md:col-6 ">
                            <span htmlFor="withoutgrouping">Số điện thoại: <span className="warning">*</span></span>
                                <Controller name="phone" 
                                    control={control} 
                                    rules={{ required: true,pattern:{value: PHONE_REGEX} }} render={({ field, fieldState }) => (
                                    <InputText  
                                    id={field.name} 
                                    {...field}
                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                    placeholder="Số điện thoại"
                                    />
                                )} />
                        </div> 
                        <div className="field col-12 md:col-6">
                            <span htmlFor="original__link">Email: <span className="warning">*</span></span>
                                <Controller name="email" 
                                    control={control} 
                                    rules={{ required: true,pattern:{value:EMAIL_REGEX} }} render={({ field, fieldState }) => (
                                    <InputText 
                                    id={field.name} 
                                    {...field}
                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                    placeholder="Nhập email"
                                    />
                                )} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <span htmlFor="original__link">Quốc gia: <span className="warning">*</span></span>
                                <Controller name="country" 
                                    control={control} 
                                    rules={{ required: true }} render={({ field, fieldState }) => (
                                    <AutoComplete 
                                    suggestions={filteredCountry}
                                    completeMethod={(e)=>searchDropdown(e,countries,setFilteredCountry)} field=""
                                    aria-label="Countries"
                                    id={field.name}
                                    value={field.value} onChange={(e) =>handleChangeCountry(e,field)}
                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                    dropdownAriaLabel="Select name" 
                                    placeholder="Quốc gia"
                                    />
                                )} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <span htmlFor="cost">Thành phố: <span className="warning">*</span></span>
                                <Controller name="city" 
                                    control={control} 
                                    rules={{ required: true }} render={({ field, fieldState }) => (
                                    <AutoComplete 
                                    suggestions={filteredCity}
                                    completeMethod={(e)=>searchDropdown(e,cities,setFilteredCity)} field=""
                                    aria-label="Cities" 
                                    id={field.name}
                                    value={field.value} onChange={(e) =>{field.onChange(e.value)}}
                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                    dropdownAriaLabel="Select name"
                                    placeholder="Thành phố"
                                    />
                                )} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <span htmlFor="employees">Địa chỉ: <span className="warning">*</span></span>
                                <Controller name="address" 
                                    control={control} 
                                    rules={{ required: true }} render={({ field, fieldState }) => (
                                    <InputText 
                                    id={field.name} 
                                    {...field}
                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                    placeholder="Địa chỉ"
                                    />
                                )} />
                        </div>
                    </div>
                    <div className="btn_modal field col-12 md:col-12 grid position_bottom">
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <Button label="Hủy bỏ" className="p-button-outlined cancel--btn" onClick={()=>{setIsOpenCreateCustomer(false);reset()} }/>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <Button label="Tạo mới" className="p-button-outlined p-button-secondary confirm--btn" type="submit"/>
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