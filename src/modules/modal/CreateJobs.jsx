import React, { useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { saleCustomerRequest } from '../../redux/sale/action';
import { type_files } from './dropDown';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpenModalCreateJob, setIsOpenModalCreateCustomer } from '../../redux/modal/modalSlice';
import { addJobsRequest } from '../../redux/overviewJobs/actionJobs';
import { itemCustomerTemplate } from '../modal/TemplateDropDown';
import { overlay } from '../../commons/overlay';
import { getEmployeePerformance } from '../../redux/employeePerformance/action';
import { useLocation } from 'react-router';
import { resetJobCreated } from '../../redux/overviewJobs/jobsSlice';

const CreateJobs = () => {
	const defaultValues = {
		end_day: null,
		quality_img: '',
		org_link: '',
		photo_types: '',
		total_cost: '',
		editor_cost: '',
		request_content: '',
		work_notes: '',
		type_models: '',
	};
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({ defaultValues });
	const customers = useSelector((state) => state.sale.customers);
	const addjobs = useSelector((state) => state.jobs.addjobs);
	const user = useSelector((state) => state.auth?.user);
	const location = useLocation();
	const { pathname } = location;
	let minDate = new Date();
	const isOpenCreateJob = useSelector((state) => state.modal.isOpenModalCreateJob);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isOpenCreateJob) {
			overlay.disable();
		} else {
			overlay.enable();
		}
	}, [isOpenCreateJob]);

	useEffect(() => {
		if (addjobs?.data && !addjobs?.error) {
			reset();
			if (pathname === '/workflow-management') {
				dispatch(getEmployeePerformance());
			}
			dispatch(setIsOpenModalCreateJob(false));
		}
		if (addjobs?.error) {
			dispatch(setIsOpenModalCreateJob(true));
		}
	}, [addjobs, reset, dispatch, pathname]);

	useEffect(() => {
		if (isOpenCreateJob) {
			dispatch(saleCustomerRequest());
		} else {
			setTimeout(() => {
				dispatch(resetJobCreated());
			}, 500);
		}
	}, [dispatch, isOpenCreateJob]);

	const onSubmit = (data) => {
		if (Object.keys(errors).length === 0) {
			data.id_customer = data.nameCustomer.id_system;
			data.photo_types = data.photo_types?.code;
			dispatch(addJobsRequest(data));
		}
	};

	const handleCloseModal = () => {
		dispatch(setIsOpenModalCreateJob(false));
		reset();
	};
	const handleCreateNewCustomer = () => {
		dispatch(setIsOpenModalCreateJob(false));
		setTimeout(() => {
			dispatch(setIsOpenModalCreateCustomer(true));
		}, 100);
	};

	return (
		<>
			<Sidebar visible={isOpenCreateJob} position='right' onHide={handleCloseModal} className='create__job'>
				<div className='creat__job'>
					<div className='creat__job--title'>
						<h2>T???o c??ng vi???c m???i</h2>
						<p>Nh???p tr?????ng th??ng tin li??n quan b???t bu???c</p>
					</div>
					<form className=' grid modal__creat--job' onSubmit={handleSubmit(onSubmit)}>
						<div className='field col-12 md:col-12 grid pr-0'>
							<div className='field col-12 md:col-12'>
								<span htmlFor='autocomplete'>
									<span className='warning'>*</span>T??m th??ng tin kh??ch h??ng:
								</span>
								<span className=''>
									<Controller
										name='nameCustomer'
										control={control}
										rules={{ required: 'Ch??a ch???n kh??ch h??ng' }}
										render={({ field, fieldState }) => (
											<Dropdown
												options={customers.data}
												optionLabel='infor_reminder'
												itemTemplate={itemCustomerTemplate}
												value={field.value}
												onChange={(e) => field.onChange(e.value)}
												className={classNames(
													{ 'p-invalid': fieldState.invalid },
													'create__job_type'
												)}
												placeholder='Ch???n kh??ch h??ng '
											/>
										)}
									/>
								</span>
								{errors?.nameCustomer && (
									<span className='warning' style={{ fontSize: '12px' }}>
										{errors?.nameCustomer.message}
									</span>
								)}
							</div>
							<div className='field col-12 md:col-12 create_new_customer'>
								<p onClick={handleCreateNewCustomer} style={{ width: 'max-content' }}>
									+ T???o kh??ch h??ng m???i
								</p>
							</div>
							<div className='field col-12 md:col-6'>
								<span htmlFor='type_models'>
									<span className='warning'>*</span>Lo???i ???nh:
								</span>
								<span className=''>
									<Controller
										name='type_models'
										control={control}
										rules={{ required: 'Ch??a ??i???n lo???i ???nh' }}
										render={({ field, fieldState }) => (
											<InputText
												id={field.name}
												{...field}
												className={classNames({ 'p-invalid': fieldState.invalid })}
												placeholder='Ch???n ???nh'
											/>
										)}
									/>
								</span>
								{errors?.type_models && (
									<span className='warning' style={{ fontSize: '12px' }}>
										{errors?.type_models.message}
									</span>
								)}
							</div>
							<div className='field col-12 md:col-6 '>
								<div>
									<span htmlFor='withoutgrouping'>
										<span className='warning'>*</span>S??? l?????ng:
									</span>
								</div>
								<Controller
									name='quality_img'
									control={control}
									rules={{ required: 'Ch??a ??i???n s??? l?????ng' }}
									render={({ field, fieldState }) => (
										<InputNumber
											value={field.value}
											onValueChange={(e) => field.onChange(e.value)}
											mode='decimal'
											className={classNames({ 'p-invalid': fieldState.invalid })}
											placeholder='??i???n s??? l?????ng ???nh'
										/>
									)}
								/>
								{errors?.quality_img && (
									<span className='warning' style={{ fontSize: '12px' }}>
										{errors?.quality_img.message}
									</span>
								)}
							</div>
							<div className='field col-12 md:col-12 create__job--calendar'>
								<span htmlFor='calendar'>
									<span className='warning'>*</span>Deadline:
								</span>
								<span className=''>
									<Controller
										name='end_day'
										control={control}
										rules={{ required: 'Ch???n ng??y h???t h???n' }}
										render={({ field, fieldState }) => (
											<Calendar
												readOnlyInput
												minDate={minDate}
												id={field.name}
												className={classNames({ 'p-invalid': fieldState.invalid })}
												value={field.value}
												onChange={(e) => field.onChange(e.value)}
												placeholder='Ch???n ng??y h???t h???n'
											/>
										)}
									/>
								</span>
								<img src='/images/calendar.svg' alt='' className='calendar__image' />
								{errors?.end_day && (
									<span className='warning' style={{ fontSize: '12px' }}>
										{errors?.end_day.message}
									</span>
								)}
							</div>
							<div className='field col-12 md:col-6'>
								<span htmlFor='original__link'>
									<span className='warning'>*</span>Link ???nh g???c:
								</span>
								<span className=''>
									<Controller
										name='org_link'
										control={control}
										rules={{ required: 'Ch??a ??i???n link ???nh g???c' }}
										render={({ field, fieldState }) => (
											<InputText
												id={field.name}
												{...field}
												className={classNames({ 'p-invalid': fieldState.invalid })}
												placeholder='??i???n link ???nh'
											/>
										)}
									/>
								</span>
								{errors?.org_link && (
									<span className='warning' style={{ fontSize: '12px' }}>
										{errors?.org_link.message}
									</span>
								)}
							</div>
							<div className='field col-12 md:col-6'>
								<span htmlFor='original__link'>
									<span className='warning'>*</span> ?????nh d???ng file:
								</span>
								<span className=''>
									<Controller
										name='photo_types'
										control={control}
										rules={{ required: 'Ch???n ?????nh d???ng file ???nh' }}
										render={({ field, fieldState }) => (
											<Dropdown
												options={type_files}
												optionLabel='name'
												value={field.value}
												onChange={(e) => field.onChange(e.value)}
												className={classNames(
													{ 'p-invalid': fieldState.invalid },
													'create__job_type'
												)}
												placeholder='??i???n ?????nh d???ng file'
											/>
										)}
									/>
								</span>
								{errors?.photo_types && (
									<span className='warning' style={{ fontSize: '12px' }}>
										{errors?.photo_types.message}
									</span>
								)}
							</div>
							<div className='field col-12 md:col-6'>
								<span htmlFor='cost'>
									<span className='warning'>*</span> Chi ph??:
								</span>
								<span className=''>
									<Controller
										name='total_cost'
										control={control}
										rules={{ required: 'Ch??a ??i???n Chi ph??' }}
										render={({ field, fieldState }) => (
											<InputNumber
												id='total_cost'
												inputId='currency-us'
												value={field.value}
												onChange={(e) => field.onChange(e.value)}
												mode='currency'
												currency='USD'
												locale='en-US'
												minFractionDigits={0}
												useGrouping={true}
												className={classNames({ 'p-invalid': fieldState.invalid })}
												placeholder='??i???n chi ph??'
											/>
										)}
									/>
								</span>
								{errors?.total_cost && (
									<span className='warning' style={{ fontSize: '12px' }}>
										{errors?.total_cost.message}
									</span>
								)}
							</div>
							{user?.data?.role === 'ADMIN' && (
								<div className='field col-12 md:col-6'>
									<span>
										<span htmlFor='cost' style={{ height: '24px' }}>
											Chi ph?? Editor:
										</span>
									</span>
									<Controller
										name='editor_cost'
										control={control}
										render={({ field, fieldState }) => (
											<InputNumber
												id='editor_cost'
												inputId='currency-vn'
												value={field.value}
												onChange={(e) => field.onChange(e.value)}
												mode='currency'
												currency='VND'
												locale='vi-VN'
												useGrouping={true}
												className={classNames({ 'p-invalid': fieldState.invalid })}
												placeholder='Chi ph??'
											/>
										)}
									/>
								</div>
							)}
							<div className='field col-12 md:col-12'>
								<span htmlFor='employees'>
									<span className='warning'>*</span> N???i dung y??u c???u:
								</span>
								<span className=''>
									<Controller
										name='request_content'
										control={control}
										rules={{ required: 'Ch??a ??i???n n???i dung y??u c???u' }}
										render={({ field, fieldState }) => (
											<InputTextarea
												autoResize
												id={field.name}
												{...field}
												className={classNames(
													{ 'p-invalid': fieldState.invalid },
													'create__job_area'
												)}
												placeholder='N???i dung y??u c???u'
											/>
										)}
									/>
								</span>
								{errors?.request_content && (
									<span className='warning' style={{ fontSize: '12px' }}>
										{errors?.request_content.message}
									</span>
								)}
							</div>
							<div className='field col-12 md:col-12'>
								<span className=''>
									<span>
										<span className='warning'>*</span>L??u ?? c???a kh??ch h??ng:
									</span>
								</span>
								<Controller
									name='work_notes'
									control={control}
									rules={{ required: 'Ch??a ??i???n l??u ?? c???a kh??ch h??ng' }}
									render={({ field, fieldState }) => (
										<InputTextarea
											autoResize
											id={field.name}
											{...field}
											className={classNames(
												{ 'p-invalid': fieldState.invalid },
												'create__job_area'
											)}
											placeholder='L??u ?? kh??ch h??ng'
										/>
									)}
								/>
								{errors?.work_notes && (
									<span className='warning' style={{ fontSize: '12px' }}>
										{errors?.work_notes.message}
									</span>
								)}
							</div>
							<div className='field col-12 md:col-12 '></div>
						</div>
						<div className='btn_modal field col-12 md:col-12 grid'>
							<div className='field col-12 md:col-6'>
								<span className=''>
									<Button
										label='H???y b???'
										className='p-button-outlined cancel--btn'
										onClick={handleCloseModal}
									/>
								</span>
							</div>
							<div className='field col-12 md:col-6 pr-0'>
								<span className=''>
									<Button
										label='T???o m???i'
										className='p-button-outlined p-button-secondary confirm--btn'
										type='submit'
									/>
								</span>
							</div>
						</div>
					</form>
				</div>
			</Sidebar>
		</>
	);
};

export default CreateJobs;
