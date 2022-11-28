import React, { useEffect, useRef } from 'react'
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { InputNumber } from 'primereact/inputnumber';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { saleCustomerRequest } from "../../redux/sale/action";
import { type_files } from "./dropDown"
import { useDispatch, useSelector } from 'react-redux';
import { dataParseCustomer } from '../manager/jobs/dataParse';
import { itemCustomerTemplate } from "../modal/TemplateDropDown";
import {
    setIsOpenModalCreateJob,
    setIsOpenModalCreateCustomer,
} from '../../redux/modal/modalSlice';
import { toastMsg } from '../../commons/toast';
import { Toast } from 'primereact/toast';
import { addJobsRequest } from "../../redux/overviewJobs/actionJobs";
const CreateJobs = () => {

    const toast = useRef(null);
    const defaultValues = {
        end_day: null,
        quality_img: "",
        org_link: '',
        photo_types: '',
        total_cost: '',
        editor_cost: '',
        request_content: '',
        work_notes: '',
        type_models: '',
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const [filteredNameCustomers, setFilteredNameCustomers] = React.useState(null);
    const [customerSelect, setCustomerSelect] = React.useState(null);
    const customers = useSelector(state => state.sale.customers)
    const addjobs = useSelector(state => state.jobs.addjobs)
    const user = useSelector(state => state.auth?.user)
    let minDate = new Date();
    const isOpenCreateJob = useSelector(state => state.modal.isOpenModalCreateJob)

    const dispatch = useDispatch()
    let customerName = dataParseCustomer(customers?.data)

    useEffect(() => {
        if (addjobs?.data && !addjobs?.error) {
            reset();
            dispatch(setIsOpenModalCreateJob(false))
            toastMsg.success(toast, 'Tạo công việc mới thành công')
        }
        if (addjobs?.error) {
            dispatch(setIsOpenModalCreateJob(true))
            toastMsg.error(toast, addjobs?.data?.message)
        }
    }, [
        addjobs, reset, dispatch
    ])

    const searchName = (event) => {
        setFilteredNameCustomers(customerName)
        setTimeout(() => {
            let suggestionsList;
            if (!event.query.trim().length) {
                suggestionsList = [...customerName];
            } else {
                suggestionsList = [...customerName].filter((list) => {
                    return (
                        list.name.toLowerCase().startsWith(event.query.toLowerCase())
                        || list.email.toLowerCase().startsWith(event.query.toLowerCase())
                        || list.phone.toLowerCase().startsWith(event.query.toLowerCase())
                        || list.create_by.toLowerCase().startsWith(event.query.toLowerCase())
                        || list.id_system.toLowerCase().startsWith(event.query.toLowerCase())
                    );
                });
            }
            setFilteredNameCustomers(suggestionsList)
        }, 50);
    }
    useEffect(() => {
        if (isOpenCreateJob && !filteredNameCustomers) {
            dispatch(saleCustomerRequest(filteredNameCustomers));
        }
    }, [dispatch, filteredNameCustomers, isOpenCreateJob])

    const onSubmit = (data) => {
        delete data["nameCustomer"];
        if (Object.keys(errors).length === 0) {
            data.id_customer = customerSelect?.id_system;
            data.photo_types = data.photo_types?.code;
            dispatch(addJobsRequest(data))
        }
    };
    const handleCloseModal = () => {
        dispatch(setIsOpenModalCreateJob(false));
        setCustomerSelect(null)
        reset();
    };
    const handleCreateNewCustomer = () => {
        dispatch(setIsOpenModalCreateJob(false))
        setTimeout(() => {
            dispatch(setIsOpenModalCreateCustomer(true))
        }, 100)
    }

    return (
        <>
            <Toast ref={toast} position="bottom-left" />
            <Sidebar visible={isOpenCreateJob} position="right" onHide={handleCloseModal} className="create__job">
                <div className="creat__job">
                    <div className="creat__job--title">
                        <h2>Tạo công việc mới</h2>
                    </div>
                    <form className=" grid modal__creat--job" onSubmit={handleSubmit(onSubmit)}>
                        <div className="field col-12 md:col-12 grid">
                            <div className="field col-12 md:col-6">
                                <span htmlFor="autocomplete">Tìm thông tin khách hàng: <span className="warning">*</span></span>
                                <span className="">
                                    <Controller name="nameCustomer"
                                        control={control}
                                        rules={{ required: true }} render={({ field, fieldState }) => (
                                            <AutoComplete
                                                suggestions={filteredNameCustomers}
                                                completeMethod={searchName} field="name"
                                                dropdown
                                                itemTemplate={itemCustomerTemplate}
                                                id={field.name}
                                                value={customerSelect} onChange={(e) => { field.onChange(e.value); setCustomerSelect(e.value); }}
                                                className={classNames({ 'p-invalid': fieldState.invalid }, "icon__search")}
                                                dropdownAriaLabel="Select name"
                                            />
                                        )} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span>Mã khách hàng: </span>
                                <span className="p-float-label pt-3 flex justify-content-between cursor__normal">
                                    <span className='font-bold'>{customerSelect?.id_system}</span>
                                </span>
                            </div>
                            <div className="field col-12 md:col-12 create_new_customer">
                                <p onClick={handleCreateNewCustomer} style={{ width: "max-content" }}>Tạo khách hàng mới</p>
                            </div>
                            <div className="field col-12 md:col-6 create__job--calendar">
                                <span htmlFor="calendar">Chọn ngày hạn chót:<span className="warning">*</span></span>
                                <span className="p-float-label ">
                                    <Controller name="end_day"
                                        control={control}
                                        rules={{ required: true }} render={({ field, fieldState }) => (
                                            <Calendar
                                                readOnlyInput
                                                minDate={minDate}
                                                id={field.name} className={classNames({ 'p-invalid': fieldState.invalid })}
                                                value={field.value} onChange={(e) => field.onChange(e.value)}
                                            />
                                        )} />
                                </span>
                                <img src="/images/calendar.svg" alt="" className="calendar__image" />
                            </div>
                            <div className="field col-12 md:col-3">
                                <span htmlFor="type_models">Loại ảnh: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <Controller name="type_models"
                                        control={control}
                                        rules={{ required: true }} render={({ field, fieldState }) => (
                                            <InputText id={field.name}
                                                {...field}
                                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                            />
                                        )} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-3 ">
                                <span htmlFor="withoutgrouping">Số lượng: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <Controller name="quality_img"
                                        control={control}
                                        rules={{ required: true }} render={({ field, fieldState }) => (
                                            <InputNumber value={field.value} onValueChange={(e) => field.onChange(e.value)} mode="decimal" />
                                        )} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="original__link">Link ảnh gốc: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <Controller name="org_link"
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
                            <div className="field col-12 md:col-6">
                                <span htmlFor="original__link">Định dạng file: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <Controller name="photo_types"
                                        control={control}
                                        rules={{ required: true }} render={({ field, fieldState }) => (
                                            <Dropdown
                                                options={type_files}
                                                optionLabel="name"
                                                value={field.value} onChange={(e) => field.onChange(e.value)}
                                                className={classNames({ 'p-invalid': fieldState.invalid }, "create__job_type")}
                                            />
                                        )} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span htmlFor="cost">Chi phí: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <Controller name="total_cost"
                                        control={control}
                                        rules={{ required: true }} render={({ field, fieldState }) => (
                                            <InputNumber id="total_cost"
                                                inputId="currency-us"
                                                value={field.value} onChange={(e) => field.onChange(e.value)}
                                                mode="currency"
                                                currency="USD"
                                                locale="en-US"
                                                minFractionDigits={0}
                                                useGrouping={true}
                                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                            />
                                        )} />
                                </span>
                            </div>
                            {
                                user?.data?.role === "ADMIN" &&
                                <div className="field col-12 md:col-6">
                                    <span htmlFor="cost">Chi phí Editor:</span>
                                    <span className="p-float-label">
                                        <Controller name="editor_cost"
                                            control={control}
                                            rules={{ required: true }} render={({ field, fieldState }) => (
                                                <InputNumber id="editor_cost"
                                                    inputId="currency-vn"
                                                    value={field.value} onChange={(e) => field.onChange(e.value)}
                                                    mode="currency"
                                                    currency="VND"
                                                    locale="vi-VN"
                                                    useGrouping={true}
                                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                                />
                                            )} />
                                    </span>
                                </div>
                            }
                            <div className="field col-12 md:col-12">
                                <span htmlFor="employees">Nội dung yêu cầu: <span className="warning">*</span></span>
                                <span className="p-float-label">
                                    <Controller name="request_content"
                                        control={control}
                                        rules={{ required: true }} render={({ field, fieldState }) => (
                                            <InputTextarea
                                                autoResize
                                                id={field.name}
                                                {...field}
                                                className={classNames({ 'p-invalid': fieldState.invalid }, "create__job_area")}
                                            />
                                    )} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-12">
                                <span className="p-float-label">
                                    <span >Lưu ý của khách hàng:<span className="warning">*</span></span>
                                    <Controller name="work_notes"
                                        control={control}
                                        rules={{ required: true }} render={({ field, fieldState }) => (
                                            <InputTextarea
                                                autoResize
                                                id={field.name}
                                                {...field}
                                                className={classNames({ 'p-invalid': fieldState.invalid }, "create__job_area")}
                                            />
                                        )} />
                                </span>
                            </div>
                            <div className="field col-12 md:col-12 ">

                            </div>
                        </div>
                        <div className="btn_modal field col-12 md:col-12 grid">
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label">
                                    <Button label="Hủy bỏ" className="p-button-outlined cancel--btn" onClick={handleCloseModal} />
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

export default CreateJobs