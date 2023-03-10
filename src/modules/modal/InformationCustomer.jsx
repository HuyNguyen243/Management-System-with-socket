import React, { useState, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { useForm, Controller } from 'react-hook-form';
import { EMAIL_REGEX } from '../../constants';
import { editCustomerRequest, deleteCustomerRequest } from '../../redux/sale/action';
import { useDispatch, useSelector } from 'react-redux';
import { customer_status } from './dropDown';
import { getCountries } from '../../commons/getCountry';
import { searchDropdown } from '../../commons/searchDropDown';
import { UserRules } from '../../constants';
import copy from 'copy-to-clipboard';
import { setIsOpenModalInformationCustomer } from '../../redux/modal/modalSlice';
import { overlay } from '../../commons/overlay';
import { resetEditCustomer } from '../../redux/sale/saleSlice';
import { inforToast } from '../../commons/toast';

const InformationCustomer = () => {
	const [customerStatus, setCustomerStatus] = useState(null);
	const rowdata = useSelector((state) => state.modal.dataModalInformationCustomer);
	const putCustomer = useSelector((state) => state.sale.editcustomer);
	const isOpenInformationCustomer = useSelector((state) => state.modal.isOpenModalInformationCustomer);
	const user = useSelector((state) => state.auth.user);
	const [cities, setCities] = React.useState(null);
	const [filteredCity, setFilteredCity] = React.useState(null);
	const [countries, setCountries] = React.useState(null);
	const [filteredCountry, setFilteredCountry] = React.useState(null);
	const deleteCustomer = useSelector((state) => state.sale.deletecustomer);

	const dispatch = useDispatch();
	const {
		control,
		register,
		setValue,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const resetModal = React.useCallback(
		(isResetCustomer = false) => {
			dispatch(setIsOpenModalInformationCustomer(false));
			reset({ data: 'test' });
			if (isResetCustomer) {
				setTimeout(() => {
					dispatch(resetEditCustomer());
				}, 500);
			}
		},
		[dispatch, reset]
	);

	useEffect(() => {
		if (deleteCustomer?.data && !deleteCustomer?.error) {
			resetModal(true);
		}
	}, [deleteCustomer, dispatch, resetModal]);

	useEffect(() => {
		if (isOpenInformationCustomer) {
			overlay.disable();
		} else {
			overlay.enable();
		}
	}, [isOpenInformationCustomer]);

	useEffect(() => {
		if (putCustomer?.data && !putCustomer?.error) {
			resetModal();
		}
	}, [putCustomer, dispatch, resetModal]);

	useEffect(() => {
		if (deleteCustomer?.data && !deleteCustomer?.error) {
			resetModal();
		}
	}, [deleteCustomer, dispatch, resetModal]);

	useEffect(() => {
		const getcountries = new getCountries();
		getcountries.get().then((data) => setCountries(data));
	}, []);

	const getStatus = (status, getName = false) => {
		for (let item of customer_status) {
			if (item.code === status) {
				if (getName) {
					return item.name;
				} else {
					return item;
				}
			}
		}
	};

	useEffect(() => {
		if (rowdata?.data) {
			setValue('fullname', rowdata?.data?.fullname);
			setValue('country', rowdata?.data?.information?.address?.country);
			setValue('city', rowdata?.data?.information?.address?.city);
			setValue('email', rowdata?.data?.information?.email);
			setValue('infor_reminder', rowdata?.data?.infor_reminder);
			setValue('link', rowdata?.data?.link);
			if (rowdata?.data?.status) {
				setCustomerStatus(getStatus(rowdata?.data?.status));
			}
		}
	}, [rowdata, setValue]);

	const handleChangeCountry = (e, field) => {
		setValue('city', '');
		field.onChange(e.value);
		if (countries[e.value]) {
			setCities(countries[e.value]);
		}
	};
	const onSubmit = (data) => {
		const obj = {};
		const result = {
			fullname: data.fullname,
			information: {
				email: data.email,
				address: {
					country: data.country,
					city: data.city,
				},
			},
			status: customerStatus?.code,
			infor_reminder: data?.infor_reminder,
			link: data?.link,
			create_by: rowdata?.data?.create_by,
			id_system: rowdata?.data?.id_system,
			list_jobs: rowdata?.data?.list_jobs,
			_create_at: rowdata?.data?._create_at,
		};
		data.status = customerStatus?.code;
		for (let item in result) {
			if (result[item] !== rowdata?.data[item]) {
				obj[item] = result[item];
			}

			if (item === 'information') {
				for (let item2 in result.information) {
					const child2 = result[item][item2];
					if (child2 !== rowdata?.data[item][item2]) {
						obj[item2] = child2;
					}
				}
			}
		}

		if (Object.keys(obj).length > 0) {
			const formData = {
				data: obj,
				result: result,
				index: rowdata?.index,
			};
			dispatch(editCustomerRequest(formData));
		}
	};

	const handleDeleteCustomer = () => {
		const formdata = {};
		formdata.id = rowdata?.data?.id_system;
		formdata.index = rowdata?.index;
		dispatch(deleteCustomerRequest(formdata));
	};

	const handleRemoveRow = (event) => {
		const myConfirm = confirmPopup({
			target: event.currentTarget,
			message: 'B???n c?? ch???c mu???n x??a kh??ch h??ng n??y?',
			icon: 'pi pi-exclamation-triangle',
			accept: handleDeleteCustomer,
		});
		myConfirm.show();
	};

	const copyToClipboard = (type) => {
		inforToast('Sao ch??p th??nh c??ng');
		if (type === 'id_system') {
			copy(rowdata?.data?.id_system);
		}
		if (type === 'create_by') {
			copy(rowdata?.data?.create_by);
		}
		if (type === 'link') {
			copy(rowdata?.data?.link);
		}
	};

	return (
		<>
			<ConfirmPopup />
			<Sidebar visible={isOpenInformationCustomer} position='right' onHide={resetModal} className='create__job'>
				<div className='creat__job'>
					<div className='creat__job--title flex justify-content-between'>
						<h2>
							Th??ng tin kh??ch h??ng
							<p>Hi???n th??? c??c tr?????ng th??ng tin c???a kh??ch h??ng</p>
						</h2>
						{!rowdata?.error && (
							<Button onClick={handleRemoveRow}>
								<img src='images/trash.svg' alt='' className='image__trash' />
							</Button>
						)}
					</div>
					<form className=' grid modal__creat--job no_flex' onSubmit={handleSubmit(onSubmit)}>
						{rowdata?.error ? (
							<span className='notfound'>Th??ng tin kh??ch h??ng kh??ng t???n t???i</span>
						) : (
							<div className='field col-12 md:col-12 grid pr-0'>
								<div className='field col-12 md:col-6 '>
									<span htmlFor='autocomplete'>
										<span className='warning'>*</span>T??n kh??ch h??ng:
									</span>
									<span className='p-float-label '>
										<InputText
											defaultValue={rowdata?.data?.fullname}
											onChange={(e) => setValue('fullname', e.target.value)}
											{...register('fullname', { required: true, minLength: 3 })}
											className={errors?.fullname && 'p-invalid'}
										/>
									</span>
								</div>
								<div className='field col-12 md:col-6 '>
									<span htmlFor='autocomplete'>
										<span className='warning'>*</span>Bi???t danh:
									</span>
									<span className='p-float-label '>
										<InputText
											defaultValue={rowdata?.data?.infor_reminder}
											onChange={(e) => setValue('infor_reminder', e.target.value)}
											{...register('infor_reminder', { required: true })}
											className={errors?.infor_reminder && 'p-invalid'}
										/>
									</span>
								</div>
								<div className='field col-12 md:col-6'>
									<span htmlFor='original__link'>
										<span className='warning'>*</span>Email:
									</span>
									<span className='p-float-label '>
										<InputText
											defaultValue={rowdata?.data?.information?.email}
											onChange={(e) => setValue('email', e.target.value)}
											{...register('email', { required: true, pattern: EMAIL_REGEX })}
											className={errors?.email && 'p-invalid'}
										/>
									</span>
								</div>
								<div className='field col-12 md:col-6'>
									<span htmlFor='employees'>
										<span className='warning'>*</span>Link li??n k???t:
									</span>
									<span className='p-float-label  relative'>
										<InputText
											defaultValue={rowdata?.data?.link}
											onChange={(e) => setValue('link', e.target.value)}
											{...register('link', { required: true })}
											className={errors?.link && 'p-invalid'}
										/>
										<img
											src='images/copy.svg'
											alt='link'
											className='cursor-pointer absolute'
											label='Bottom Right'
											onClick={(e) => copyToClipboard(e.target.alt)}
											style={{ right: '5px', top: '9px' }}
										/>
									</span>
								</div>
								<div className='field col-12 md:col-6'>
									<span htmlFor='original__link'>
										<span className='warning'>*</span>Qu???c gia:
									</span>
									<Controller
										name='country'
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<AutoComplete
												suggestions={filteredCountry}
												completeMethod={(e) => searchDropdown(e, countries, setFilteredCountry)}
												field=''
												aria-label='Countries'
												id={field.name}
												value={field.value}
												onChange={(e) => handleChangeCountry(e, field)}
												className={errors?.country && 'p-invalid'}
												dropdownAriaLabel='Select name'
												placeholder='Qu???c gia'
											/>
										)}
									/>
								</div>
								<div className='field col-12 md:col-6'>
									<span htmlFor='cost'>
										<span className='warning'>*</span>Th??nh ph???:
									</span>
									<span className='p-float-label '>
										<Controller
											name='city'
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<AutoComplete
													suggestions={filteredCity}
													completeMethod={(e) => searchDropdown(e, cities, setFilteredCity)}
													field=''
													aria-label='Cities'
													id={field.name}
													value={field.value}
													onChange={(e) => {
														field.onChange(e.value);
													}}
													className={errors?.city && 'p-invalid'}
													dropdownAriaLabel='Select name'
													placeholder='Th??nh ph???'
												/>
											)}
										/>
									</span>
								</div>

								<div className='field col-12 md:col-6'>
									<span htmlFor='employees'>
										<span className='warning'>*</span>Tr???ng th??i kh??ch h??ng:
									</span>
									<span className='p-float-label '>
										<Dropdown
											options={customer_status}
											optionLabel='name'
											value={customerStatus}
											onChange={(e) => setCustomerStatus(e.value)}
											placeholder='Tr???ng th??i kh??ch h??ng'
											disabled={user?.data?.role !== UserRules.ROLE.ADMIN ? true : false}
										/>
									</span>
								</div>
							</div>
						)}
						<div className='btn_modal field col-12 md:col-12 grid position_bottom'>
							<div className='field col-12 md:col-6'>
								<span className='p-float-label'>
									<Button
										label='H???y b???'
										className='p-button-outlined cancel--btn'
										type='button'
										onClick={resetModal}
									/>
								</span>
							</div>
							{!rowdata?.error && (
								<div className='field col-12 md:col-6 pr-0'>
									<span className='p-float-label'>
										<Button
											label='C???p nh???t'
											className='p-button-outlined p-button-secondary confirm--btn'
											type='submit'
										/>
									</span>
								</div>
							)}
						</div>
					</form>
				</div>
			</Sidebar>
		</>
	);
};

export default InformationCustomer;
