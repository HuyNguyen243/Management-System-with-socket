import React, { useEffect } from 'react'
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
import { type_files, type_jobs } from "./dropDown"
import { useDispatch, useSelector } from 'react-redux';
import { dataParseCustomer } from '../manager/jobs/dataParse';
// import { dataParse } from '../manager/jobs/dataParse';
import {
    setIsOpenModalCreateJob,
    setIsOpenModalCreateCustomer,
} from '../../redux/modal/modalSlice';

const CreateJobs = () => {
    const defaultValues = {
        type_job: null,
        nameCustomer: '',
        date: null,
        type_image: "",
        quality: "",
        original_link: '',
        type_file: '',
        cost: '',
        status: null,
        content: '',
        note: '',
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const [filteredNameCustomers, setFilteredNameCustomers] = React.useState(null);
    const [customerSelect, setCustomerSelect] = React.useState(null);
    const customers = useSelector(state => state.sale.customers)
    let minDate = new Date();
    const isOpenCreateJob = useSelector(state => state.modal.isOpenModalCreateJob)

    const dispatch = useDispatch()
    let customerName = dataParseCustomer(customers?.data)
    const searchName = (event) => {
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
        if (isOpenCreateJob) {
            dispatch(saleCustomerRequest(filteredNameCustomers));
        }
    }, [dispatch, filteredNameCustomers, isOpenCreateJob])

    const onSubmit = (data) => {
        if (Object.keys(errors).length === 0) {
            console.log(data)
            reset();
        }
    };

    const handleCreateNewCustomer = () => {
        dispatch(setIsOpenModalCreateJob(false))
        setTimeout(() => {
            dispatch(setIsOpenModalCreateCustomer(true))
        }, 100)
    }

    return (
        <Sidebar visible={isOpenCreateJob} position="right" onHide={() => dispatch(setIsOpenModalCreateJob(false))} className="create__job">
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
                                            id={field.name}
                                            value={customerSelect} onChange={(e) => { setCustomerSelect(e.value); }}
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
                        <div className="field col-12 md:col-6">
                            <span htmlFor="type_job">Loại công việc: <span className="warning">*</span></span>
                            <span className="">
                                <Controller name="type_job"
                                    control={control}
                                    rules={{ required: true }} render={({ field, fieldState }) => (
                                        <Dropdown
                                            options={type_jobs}
                                            optionLabel="name"
                                            value={field.value} onChange={(e) => field.onChange(e.value)}
                                            className={classNames({ 'p-invalid': fieldState.invalid }, "create__job_type")}
                                        />
                                    )} />
                            </span>
                        </div>

                        <div className="field col-12 md:col-6 create__job--calendar">
                            <span htmlFor="calendar">Chọn ngày:<span className="warning">*</span></span>
                            <span className="p-float-label ">
                                <Controller name="date"
                                    control={control}
                                    rules={{ required: false }} render={({ field, fieldState }) => (
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
                            <span htmlFor="type_image">Loại ảnh: <span className="warning">*</span></span>
                            <span className="p-float-label">
                                <Controller name="type_image"
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
                                <Controller name="quality"
                                    control={control}
                                    rules={{ required: true }} render={({ field, fieldState }) => (
                                        <InputNumber
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
                            <span htmlFor="original__link">Link ảnh gốc: <span className="warning">*</span></span>
                            <span className="p-float-label">
                                <Controller name="original_link"
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
                                <Controller name="type_file"
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
                                <Controller name="cost"
                                    control={control}
                                    rules={{ required: true }} render={({ field, fieldState }) => (
                                        <InputNumber id="count "
                                            inputId="currency-vn"
                                            value={field.value} onChange={(e) => field.onChange(e.value)}
                                            mode="currency"
                                            currency="VND"
                                            locale="vi-VN"
                                            useGrouping={false}
                                            className={classNames({ 'p-invalid': fieldState.invalid })}
                                            placeholder="Nhập tên"
                                        />
                                    )} />
                            </span>
                        </div>
                        <div className="field col-12 md:col-12">
                            <span htmlFor="employees">Nội dung yêu cầu: <span className="warning">*</span></span>
                            <span className="p-float-label">
                                <Controller name="content"
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
                                <Controller name="note"
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
                                <Button label="Hủy bỏ" className="p-button-outlined cancel--btn" onClick={() => { dispatch(setIsOpenModalCreateJob(false)); reset() }} />
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
    )
}

export default CreateJobs