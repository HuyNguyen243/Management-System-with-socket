import React,{ useState, useEffect } from 'react';

import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import {names} from "./dropDown";
import { EMAIL_REGEX, PHONE_REGEX } from "../../constants"
import { editCustomerRequest } from '../../redux/sale/action';
import { useDispatch } from 'react-redux';

import { useForm } from "react-hook-form";

const InformationCustomer = ({isOpenInformationCustomer, setIsOpenInformationCustomer, rowdata}) => {
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [listJobs, setlistJobs] = useState([]);
    const [isSubmit,setIsSubmit] = useState(false);
    const dispatch = useDispatch()
    const { register,setValue, handleSubmit, formState: { errors }, reset } = useForm();

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
        }
    },[rowdata,setValue])

    const [filteredNameCustomers, setFilteredNameCustomers] = React.useState(null);

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
                _modified_at: new Date(Date.now())
            })
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
  return (
    <Sidebar visible={isOpenInformationCustomer} position="right" onHide={handleCloseModal} className="create__job">
        <div className="creat__job">
            <div className="creat__job--title">
                <h2>Thông tin khách hàng </h2>
            </div>
            <form className=" grid modal__creat--job no_flex" onSubmit={handleSubmit(onSubmit)}>
                <div className="field col-12 md:col-12 grid">
                    <div className="field col-12 md:col-6">
                        <span htmlFor="autocomplete">Nhập tên khách hàng: <span className="warning">*</span></span>
                        <span className="p-float-label">
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
  )
}

export default InformationCustomer