import React, { useEffect, useState } from 'react';

import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { addEmployeeRequest } from '../../redux/overviewEmployee/actionEmployee';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import copy from 'copy-to-clipboard';
import { role } from './dropDown';
import { EMAIL_REGEX, PHONE_REGEX } from '../../constants';
import { setIsOpenModalCreateUser } from '../../redux/modal/modalSlice';
import { overlay } from '../../commons/overlay';
import { UserRules } from '../../constants';
import { InputNumber } from 'primereact/inputnumber';
import { inforToast } from '../../commons/toast';
const CreateUser = () => {
	let maxDate = new Date();
	const dispatch = useDispatch();
	const [createSuccess, setCreateSuccess] = useState(true);
	const isOpenCreateUser = useSelector((state) => state.modal.isOpenModalCreateUser);
	const [defaultValues, setDefaultValues] = useState({
		fullname: '',
		username: '',
		password: '',
		births: null,
		start_day: null,
		phone: '',
		email: '',
		role: '',
		address: '',
		infor_reminder: '',
	});
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
		setValue,
		watch,
	} = useForm({ defaultValues });
	const user = useSelector((state) => state.auth?.user);
	const employee = useSelector((state) => state.employee?.user);
	const randomPass = Math.random().toString(36).slice(-8);
	const [password, setPassword] = useState(randomPass);
	const roleSelected = watch()?.role?.code;

	useEffect(() => {
		if (isOpenCreateUser) {
			overlay.disable();
		} else {
			overlay.enable();
		}
	}, [isOpenCreateUser]);

	useEffect(() => {
		if (password) {
			setValue('password', password);
		}
	}, [password, setValue]);

	const onSubmit = (data) => {
		if (Object.keys(errors).length === 0) {
			if (data?.role?.code !== UserRules.ROLE.SALER) {
				delete data.kpi_saler;
			}
			data.create_by = user?.data.id_system;
			data.role = data.role?.code;
			data.password = password;
			dispatch(addEmployeeRequest(data));
		}
	};

	useEffect(() => {
		if (employee?.data && !employee?.error) {
			setCreateSuccess(false);
		}
		if (employee?.error) {
			setCreateSuccess(true);
		}
	}, [employee, reset, dispatch]);

	const copyToClipboard = (type) => {
		if (type === 'password') {
			inforToast('Sao ch??p m???t kh???u th??nh c??ng');
			copy(password);
		} else {
			inforToast('Sao ch??p t??n ????ng nh???p th??nh c??ng');
			copy(watch().username);
		}
	};

	return (
		<>
			<Sidebar
				visible={isOpenCreateUser}
				position='right'
				onHide={() => {
					dispatch(setIsOpenModalCreateUser(false));
					reset();
					setCreateSuccess(true);
					setPassword(randomPass);
				}}
				className='create__job'
			>
				<div className='creat__job'>
					<div className='creat__job--title'>
						<h2>
							T???o nh??n vi??n m???i
							<p>Nh???p tr?????ng th??ng tin li??n quan b???t bu???c</p>
						</h2>
					</div>
					<form
						className=' grid modal__creat--job no_flex'
						autoComplete='off'
						onSubmit={handleSubmit(onSubmit)}
						onKeyDown={(e) => {
							return e.key !== 'Enter';
						}}
					>
						<div className='field col-12 md:col-12 grid pr-0'>
							<div className='field col-12 md:col-12'>
								<span>
									<span className='warning'>*</span>Nh???p t??n nh??n vi??n:
								</span>
								<span className=''>
									<Controller
										name='fullname'
										control={control}
										rules={{ required: 'Ch??a ??i???n t??n nh??n vi??n', minLength: 6 }}
										render={({ field, fieldState }) => (
											<InputText
												autoComplete='off'
												id={field.name}
												{...field}
												className={classNames({ 'p-invalid': fieldState.invalid })}
												placeholder='Enter'
											/>
										)}
									/>
								</span>
								{errors?.fullname && (
									<span className='warning' style={{ fontSize: '12px' }}>
										{errors?.fullname.message}
									</span>
								)}
								{errors?.fullname?.type === 'minLength' && (
									<span className='warning' style={{ fontSize: '12px' }}>
										T??n nh??n vi??n ??t nh???t 6 k?? t???
									</span>
								)}
							</div>
							<div className='field col-12 md:col-12'>
								<span>
									<span className='warning'>*</span>Bi???t danh:
								</span>
								<span className=''>
									<Controller
										name='infor_reminder'
										control={control}
										rules={{ required: 'Ch??a ??i???n bi???t danh' }}
										render={({ field, fieldState }) => (
											<InputText
												autoComplete='disabled'
												id={field.name}
												{...field}
												className={classNames({ 'p-invalid': fieldState.invalid })}
												placeholder='Enter'
											/>
										)}
									/>
								</span>
							</div>
							{errors?.infor_reminder && (
								<span className='warning' style={{ fontSize: '12px' }}>
									{errors?.infor_reminder.message}
								</span>
							)}
							<div className='field col-12 md:col-12'>
								<span>
									<span className='warning'>*</span>Nh???p t??n ????ng nh???p:
								</span>
								<span className='relative'>
									<Controller
										name='username'
										control={control}
										rules={{ required: 'Ch??a ??i???n t??n ????ng nh???p', minLength: 6 }}
										render={({ field, fieldState }) => (
											<InputText
												onKeyPress={(event) => {
													if (event.key === ' ') {
														event.preventDefault();
													}
												}}
												autoComplete='off'
												id={field.name}
												{...field}
												className={classNames({ 'p-invalid': fieldState.invalid })}
												placeholder='Enter'
											/>
										)}
									/>
									<img
										src='images/copy.svg'
										alt=''
										label='Bottom Left'
										className='copy__icon absolute copy__name'
										onClick={() => copyToClipboard('name')}
									/>
								</span>
								{errors?.username && (
									<span className='warning' style={{ fontSize: '12px' }}>
										{errors?.username.message}
									</span>
								)}
								{errors?.username?.type === 'minLength' && (
									<span className='warning' style={{ fontSize: '12px' }}>
										T??n ????ng nh???p ??t nh???t 6 k?? t???
									</span>
								)}
							</div>
							<div className='field col-12 md:col-12'>
								<span htmlFor='autocomplete'>M???t kh???u m???c ?????nh:</span>
								<span className='flex justify-content-between'>
									<InputText
										readOnly={true}
										id='password'
										name='password'
										defaultValue={password}
										className={'readonly-class disabled'}
									/>
									<img
										src='images/copy.svg'
										alt=''
										label='Bottom Left'
										className='copy__icon absolute copy__pwd'
										onClick={() => copyToClipboard('password')}
									/>
								</span>
							</div>
							<div className='field col-12 md:col-6 create__user--calendar'>
								<span htmlFor='calendar'>
									<span className='warning'>*</span>Ng??y th??ng n??m sinh:
								</span>
								<span className=''>
									<Controller
										name='births'
										control={control}
										rules={{ required: false }}
										render={({ field, fieldState }) => (
											<Calendar
												readOnlyInput
												maxDate={maxDate}
												id={field.name}
												className={classNames({ 'p-invalid': fieldState.invalid })}
												value={field.value}
												onChange={(e) => field.onChange(e.value)}
												placeholder='Enter'
											/>
										)}
									/>
								</span>
								<img src='/images/calendar.svg' alt='' className='calendar__image' />
							</div>
							<div className='field col-12 md:col-6 create__user--calendar'>
								<span htmlFor='calendar'>
									<span className='warning'>*</span>Ng??y b???t ?????u l??m:
								</span>
								<span className=' '>
									<Controller
										name='start_day'
										control={control}
										rules={{ required: false }}
										render={({ field, fieldState }) => (
											<Calendar
												readOnlyInput
												maxDate={maxDate}
												id={field.name}
												className={classNames({ 'p-invalid': fieldState.invalid })}
												value={field.value}
												onChange={(e) => field.onChange(e.value)}
												placeholder='Enter'
											/>
										)}
									/>
								</span>
								<img src='/images/calendar.svg' alt='' className='calendar__image' />
							</div>
							<div className='field col-12 md:col-6 '>
								<span htmlFor='withoutgrouping'>
									<span className='warning'>*</span>S??? ??i???n tho???i:
								</span>
								<span className=''>
									<Controller
										name='phone'
										control={control}
										rules={{ required: 'ch??a ??i???n s??? ??i???n tho???i', pattern: { value: PHONE_REGEX } }}
										render={({ field, fieldState }) => (
											<InputText
												onKeyPress={(event) => {
													if (!/[0-9]/.test(event.key)) {
														event.preventDefault();
													}
												}}
												autoComplete='disabled'
												id={field.name}
												{...field}
												className={classNames({ 'p-invalid': fieldState.invalid })}
												placeholder='Enter'
											/>
										)}
									/>
								</span>
								{errors?.phone && (
									<span className='warning' style={{ fontSize: '12px' }}>
										{errors?.phone.message}
									</span>
								)}
								{errors?.phone?.type === 'pattern' && (
									<span className='warning' style={{ fontSize: '12px' }}>
										S??? ??i???n tho???i kh??ng h???p l???
									</span>
								)}
							</div>
							<div className='field col-12 md:col-6'>
								<span htmlFor='employees'>
									<span className='warning'>*</span>Ch???c v???:
								</span>
								<span className=''>
									<Controller
										name='role'
										control={control}
										rules={{ required: 'Ch???n ch???c v???' }}
										render={({ field, fieldState }) => (
											<Dropdown
												options={role}
												optionLabel='name'
												value={field.value}
												onChange={(e) => {
													field.onChange(e.value);

													if (e?.value?.code === UserRules.ROLE.SALER) {
														const newDefaultValue = defaultValues;
														newDefaultValue.kpi_saler = 0;
														setDefaultValues(newDefaultValue);
													} else {
														const newDefaultValue = defaultValues;
														delete newDefaultValue.kpi_saler;
														setDefaultValues(newDefaultValue);
													}
												}}
												className={classNames(
													{ 'p-invalid': fieldState.invalid },
													'create__role_type'
												)}
												placeholder='Select'
											/>
										)}
									/>
								</span>
								{errors?.role && (
									<span className='warning' style={{ fontSize: '12px' }}>
										{errors?.role.message}
									</span>
								)}
							</div>
							<div className='field col-12 md:col-6'>
								<span htmlFor='original__link'>
									<span className='warning'>*</span>Email:
								</span>
								<span className=''>
									<Controller
										name='email'
										control={control}
										rules={{ required: 'Ch??a ??i???n email', pattern: { value: EMAIL_REGEX } }}
										render={({ field, fieldState }) => (
											<InputText
												autoComplete='disabled'
												id={field.name}
												{...field}
												className={classNames({ 'p-invalid': fieldState.invalid })}
												placeholder='Enter'
											/>
										)}
									/>
								</span>
								{errors?.email && (
									<span className='warning' style={{ fontSize: '12px' }}>
										{errors?.email.message}
									</span>
								)}
								{errors?.email?.type === 'pattern' && (
									<span className='warning' style={{ fontSize: '12px' }}>
										Email kh??ng h???p l???
									</span>
								)}
							</div>

							<div className='field col-12 md:col-6'>
								<span htmlFor='employees'>?????a ch??? nh??n vi??n:</span>
								<span className=''>
									<Controller
										name='address'
										control={control}
										rules={{ required: false }}
										render={({ field, fieldState }) => (
											<InputText
												autoComplete='disabled'
												id={field.name}
												value={field.value}
												{...field}
												className={classNames({ 'p-invalid': fieldState.invalid })}
												placeholder='Enter'
											/>
										)}
									/>
								</span>
							</div>
							{roleSelected === UserRules?.ROLE?.SALER && (
								<div className='field col-12 md:col-6'>
									<span htmlFor='original__link'>Kpi saler:($) </span>
									<span className='p-float-label cursor__normal mt-4'></span>
									<span className=''>
										<Controller
											name='kpi_saler'
											control={control}
											rules={{ required: true }}
											render={({ field, fieldState }) => (
												<InputNumber
													value={field.value}
													onValueChange={(e) => field.onChange(e.value)}
													mode='currency'
													className={`${classNames({
														'p-invalid': fieldState.invalid,
													})} w-full`}
													placeholder='Enter'
													currency='USD'
													locale='en-US'
													minFractionDigits={0}
												/>
											)}
										/>
									</span>
									{errors?.kpi_saler && (
										<span className='warning' style={{ fontSize: '12px' }}>
											Nh???p th??m kpi cho saler
										</span>
									)}
								</div>
							)}
						</div>
						{createSuccess && (
							<div className='btn_modal field col-12 md:col-12 grid position_bottom'>
								<div className='field col-12 md:col-6'>
									<span className=''>
										<Button
											label='H???y b???'
											className='p-button-outlined cancel--btn'
											type='button'
											onClick={() => {
												dispatch(setIsOpenModalCreateUser(false));
												reset();
												setCreateSuccess(true);
											}}
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
						)}
					</form>
				</div>
			</Sidebar>
		</>
	);
};

export default CreateUser;
