import React,{ useState, useEffect, useRef } from 'react';

import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmPopup,confirmPopup } from 'primereact/confirmpopup';
import { useNavigate,useLocation } from 'react-router';

import { EMAIL_REGEX, PHONE_REGEX } from "../../constants"
import { 
    editCustomerRequest,
    deleteCustomerRequest
 } from '../../redux/sale/action';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { names,customer_status } from "./dropDown";

import { useForm } from "react-hook-form";

const InformationCustomer = ({isOpenInformationCustomer, setIsOpenInformationCustomer, rowdata}) => {
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [customerStatus, setCustomerStatus] = useState(null);
    const [listJobs, setlistJobs] = useState([]);
    const [isSubmit,setIsSubmit] = useState(false);
    const [filteredNameCustomers, setFilteredNameCustomers] = useState(null);
    const urlParams = new URLSearchParams(window.location.search);
    const pageURL = Number(urlParams?.get('page'))
    const navigate = useNavigate()
    const location = useLocation()
    const { pathname } = location

    const putCustomer = useSelector(state =>state.sale.editcustomer)
    const deleteCustomer = useSelector(state =>state.sale.deletecustomer)
    const countDataTable = useSelector(state =>state.table.countData)

    const dispatch = useDispatch()
    const { register,setValue, handleSubmit, formState: { errors }, reset } = useForm();
    const toast = useRef(null);

    useEffect(() => {
        if(putCustomer?.data){
            setIsOpenInformationCustomer(false)
            toast.current.show({severity:'success',summary: 'Success' , detail:'Cập nhật thành công', life: 1000});
        }

        if(putCustomer?.error){
            toast.current.show({severity:'error',summary: 'Error' , detail:'Cập nhật thất bại', life: 1000});
        }

        if(deleteCustomer?.data){
            setIsOpenInformationCustomer(false)
            toast.current.show({severity:'success',summary: 'Success' , detail:'Xóa khách hàng thành công', life: 1000});
        }
        
        if(deleteCustomer?.error){
            toast.current.show({severity:'error',summary: 'Error' , detail:'Xóa khách hàng thất bại', life: 1000});
        }

    },[putCustomer, setIsOpenInformationCustomer, deleteCustomer])

    useEffect(()=>{
        if(rowdata?.data){
            setCountry(rowdata?.data?.information?.address?.country)
            setCity(rowdata?.data?.information?.address?.city.toLowerCase())
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
        if(city !== "" && country !== ""){
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
        }
    };

    const handleCloseModal = ()=>{
        setIsOpenInformationCustomer(false)
        setIsSubmit(false)
        reset()
    }

    const handleDeleteCustomer = ()=>{
        const formdata = {}
        formdata.id = rowdata?.data?.id_system
        formdata.index = rowdata?.index
        dispatch(deleteCustomerRequest(formdata))
        if(pageURL && pageURL > 1){
            if(countDataTable > 5){
                navigate({
                    pathname: pathname,
                    search: `?page=${pageURL - 1}`,
                });
            }
        }
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

  return (
    <>
        <ConfirmPopup />
        <Toast ref={toast} position="bottom-right"/>
        <Sidebar visible={isOpenInformationCustomer} position="right" onHide={handleCloseModal} className="create__job">
            <div className="creat__job">
                <div className="creat__job--title flex justify-content-between">
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
                            <span className="p-float-label">
                                <InputText disabled
                                    value={rowdata?.data?.id_system}
                                />
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
                            <span className="p-float-label">
                                <AutoComplete 
                                    suggestions={filteredNameCustomers}
                                    completeMethod={searchName} 
                                    field="name"
                                    value={country}
                                    onChange={(e)=>{setCountry(e.value);setValue("country",e.value)}}
                                    aria-label="Countries" 
                                    dropdownAriaLabel="Select name"
                                    className={isSubmit && country === "" && "p-invalid"}
                                    
                                />
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span htmlFor="cost">Thành phố: <span className="warning">*</span></span>
                            <span className="p-float-label">
                                <AutoComplete 
                                    suggestions={filteredNameCustomers}
                                    value={city}
                                    onChange={(e)=>{setCity(e.value);setValue("city",e.value)}}
                                    completeMethod={searchName} field="name"
                                    aria-label="Cities" 
                                    dropdownAriaLabel="Select name" 
                                    className={isSubmit && city === "" && "p-invalid"}
                                />
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