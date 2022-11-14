import React,{ useState, useEffect, useRef } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmPopup,confirmPopup } from 'primereact/confirmpopup';
import { useForm,Controller } from "react-hook-form";

import { EMAIL_REGEX, PHONE_REGEX } from "../../constants"
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

const InformationCustomer = ({isOpenInformationCustomer, setIsOpenInformationCustomer, rowdata}) => {
    const [customerStatus, setCustomerStatus] = useState(null);
    const [listJobs, setlistJobs] = useState([]);

    const putCustomer = useSelector(state =>state.sale.editcustomer)
    const deleteCustomer = useSelector(state =>state.sale.deletecustomer)
    const user = useSelector(state=> state.auth.user)

    const [cities,setCities] = React.useState(null);
    const [filteredCity, setFilteredCity] = React.useState(null); 
    const [countries,setCountries] =React.useState(null)
    const [filteredCountry, setFilteredCountry] = React.useState(null);

    const dispatch = useDispatch()
    const {control, register,setValue, handleSubmit, formState: { errors }, reset, } = useForm();
    const toast = useRef(null);

    useEffect(() => {
        if(putCustomer?.data){
            setIsOpenInformationCustomer(false)
            toastMsg.success(toast,'Cập nhật thành công')
        }

        if(putCustomer?.error){
            toastMsg.error(toast,'Cập nhật thất bại')
        }

        if(deleteCustomer?.data){
            setIsOpenInformationCustomer(false)
            toastMsg.success(toast,'Xóa khách hàng thành công')
        }
        
        if(deleteCustomer?.error){
            toastMsg.success(toast,'Xóa khách hàng thất bại')
        }

    },[putCustomer, setIsOpenInformationCustomer, deleteCustomer])

    useEffect(() => {
        const getcountries = new getCountries()
        getcountries.get().then(data => setCountries(data));
    }, []);

    useEffect(()=>{
        if(rowdata?.data){
            setlistJobs(rowdata?.data?.list_jobs)
            setValue("fullname",rowdata?.data?.fullname)
            setValue("phone",rowdata?.data?.information?.phone)
            setValue("birth",new Date(rowdata?.data?.information?.birth))
            setValue("address",rowdata?.data?.information?.address?.detail)
            setValue("country",rowdata?.data?.information?.address?.country)
            setValue("city",rowdata?.data?.information?.address?.city)
            if(rowdata?.data?.status){
                for(let item of customer_status){
                    if(item.code === rowdata?.data?.status){
                        setCustomerStatus(item)
                        break
                    }
                }
            }
        }
    },[rowdata,setValue])

    const handleChangeCountry = (e,field)=>{
        setValue("city","")
        field.onChange(e.value)
        if(countries[e.value]){
            setCities(countries[e.value])
        }
    }

    const onSubmit = (data) => {
        const result = Object.assign(rowdata.data,{},{
            fullname : data.fullname,
            information: {
                phone : data.phone,
                birth : data.birth,
                email : data.email,
                address : {
                    country: data.country,
                    city: data.city,
                    detail : data.address,
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
    };

    const handleCloseModal = ()=>{
        setIsOpenInformationCustomer(false)
        reset()
    }

    const handleDeleteCustomer = ()=>{
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

    const copyToClipboard = () => {
        toastMsg.info(toast,'Copy success')
        copy(rowdata?.data?.id_system);
    }

  return (
    <>
        <ConfirmPopup />
        <Toast ref={toast} position="bottom-left"/>
        <Sidebar visible={isOpenInformationCustomer} position="right" onHide={handleCloseModal} className="create__job">
            <div className="creat__job">
                <div className="creat__job--title flex justify-content-between" style={{marginRight: "10px"}}>
                    <h2>Thông tin khách hàng </h2>
                    <Button onClick={handleRemoveRow}><img src="images/trash.svg" alt="" className="image__trash"/></Button>
                </div>
                <form className=" grid modal__creat--job no_flex" onSubmit={handleSubmit(onSubmit)}>
                    <div className="field col-12 md:col-12 grid">
                        <div className="field col-12 md:col-6 ">
                            <span htmlFor="autocomplete">Nhập tên khách hàng: <span className="warning">*</span></span>
                            <span className="p-float-label ">
                                <InputText 
                                defaultValue={rowdata?.data?.fullname} 
                                onChange={(e)=>setValue("fullname",e.target.value)} 
                                {...register("fullname", { required: true })}
                                className={errors?.fullname && "p-invalid"}
                                />
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span htmlFor="autocomplete">Mã khách hàng: </span>
                            <span className="p-float-label pt-3 flex justify-content-between">
                                {rowdata?.data?.id_system}
                                <img src="images/copy.svg" alt="" label="Bottom Right" onClick={copyToClipboard}/>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6 create__job--calendar">
                            <span htmlFor="calendar">Ngày tháng năm sinh:<span className="warning">*</span></span>
                            <span className="p-float-label ">
                                <Calendar 
                                value={new Date(rowdata?.data?.information?.birth)} 
                                onChange={e=>setValue("birth",e.value)} 
                                {...register("birth", { required: true })}
                                className={errors?.birth && "p-invalid"}
                                />
                            </span>
                            <img src="/images/calendar.svg" alt="" className="calendar__image"/>
                        </div>
                        <div className="field col-12 md:col-6 ">
                            <span htmlFor="withoutgrouping">Số điện thoại: <span className="warning">*</span></span>
                            <span className="p-float-label">
                                <InputText 
                                    defaultValue={rowdata?.data?.information?.phone} 
                                    onChange={(e)=>setValue("phone",e.target.value)}
                                    {...register("phone", { required: true,pattern: PHONE_REGEX })}
                                    className={errors?.phone && "p-invalid"}
                                />
                            </span>
                        </div> 
                        <div className="field col-12 md:col-6">
                            <span htmlFor="original__link">Email: <span className="warning">*</span></span>
                            <span className="p-float-label">
                                <InputText 
                                    defaultValue={rowdata?.data?.information?.email} 
                                    onChange={(e)=>setValue("email",e.target.value)}
                                    {...register("email", { required: true,pattern: EMAIL_REGEX  })}
                                    className={errors?.email && "p-invalid"}
                                />
                            </span>
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
                                        className={errors?.country && "p-invalid"}
                                        dropdownAriaLabel="Select name" 
                                        placeholder="Quốc gia"
                                    />
                                    )} 
                                />
                        </div>
                        <div className="field col-12 md:col-6">
                            <span htmlFor="cost">Thành phố: <span className="warning">*</span></span>
                            <span className="p-float-label">
                                 <Controller name="city" 
                                    control={control} 
                                    rules={{ required: true }} render={({ field, fieldState }) => (
                                    <AutoComplete 
                                    suggestions={filteredCity}
                                    completeMethod={(e)=>searchDropdown(e,cities,setFilteredCity)} field=""
                                    aria-label="Cities" 
                                    id={field.name}
                                    value={field.value} onChange={(e) =>{field.onChange(e.value)}}
                                    className={errors?.city && "p-invalid"}
                                    dropdownAriaLabel="Select name"
                                    placeholder="Thành phố"
                                    />
                                )} />
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span htmlFor="employees">Địa chỉ: <span className="warning">*</span></span>
                            <span className="p-float-label">
                                <InputText 
                                    defaultValue={rowdata?.data?.information?.address?.detail} 
                                    onChange={(e)=>setValue("address",e.target.value)}
                                    {...register("address", { required: true })}
                                    className={errors?.address && "p-invalid"}
                                />
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span htmlFor="employees">Trạng thái khách hàng: <span className="warning">*</span></span>
                            <span className="p-float-label">
                                <Dropdown  
                                    options={customer_status}
                                    optionLabel="name" 
                                    value={customerStatus}
                                    onChange={e=>setCustomerStatus(e.value)}
                                    placeholder="Trạng thái khách hàng"
                                    disabled={user?.data?.role !== UserRules.ROLE.ADMIN ? true : false}
                                />
                            </span>
                        </div>
                        {
                            Array.isArray(listJobs) && listJobs.length > 0 &&
                            <div className="field col-12 md:col-12 grid">
                            <div className="field col-12 md:col-12 ">
                                <span htmlFor="employees">Mã công việc đang yêu cầu: <span className="warning">*</span></span>
                            </div>
                            {
                                listJobs.map((item)=>(
                                    <div>
                                        <div className="field col-12 md:col-6 id_jobs">
                                                12345.S.67890
                                        </div>
                                        <div className="field col-12 md:col-6 btn_information_jobs">
                                                    Thông tin mã yêu cầu
                                        </div> 
                                    </div>
                                ))
                            }
                            
                            </div>
                        }
                    </div>
                    <div className="btn_modal field col-12 md:col-12 grid position_bottom">
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <Button label="Hủy bỏ" className="p-button-outlined cancel--btn" type="button" onClick={handleCloseModal}/>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <Button label="Cập nhật" className="p-button-outlined p-button-secondary confirm--btn" type="submit"/>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </Sidebar>
    </>
  )
}

export default InformationCustomer