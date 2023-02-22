import React, { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import copy from 'copy-to-clipboard';
import { setIsOpenInformationJob } from '../../redux/modal/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { type_files } from './dropDown';
import { UserRules, JobRules, NOT_SET_ADMIN, NAME_ROOM } from '../../constants';
import { InputText } from 'primereact/inputtext';
import { timezoneToDate } from '../../commons/dateTime';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { dashboardEmployeeRequest } from '../../redux/overviewEmployee/actionEmployee';
import { deleteJobsRequest, editJobsRequest, doneJobsRequest } from '../../redux/overviewJobs/actionJobs';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { formatUSD, convertUSD } from '../../commons/formatCost';
import { itemUserTemplate } from '../modal/TemplateDropDown';
import { overlay } from '../../commons/overlay';
import { getEmployeePerformance } from '../../redux/employeePerformance/action';
import { useLocation } from 'react-router';
import { resetJobRequest } from '../../redux/overviewJobs/jobsSlice';
import { orderIds } from '../../commons/message.common';
import { socket } from '../../_services/socket';
import { getCurrentRoom, setIsOpenChat } from '../../redux/messages/messageSlice';
import { resetJobCreated } from '../../redux/overviewJobs/jobsSlice';
import { inforToast, errorToast } from '../../commons/toast';
import { URL_ROUTER } from '../../routes/routes';

const InformationJobs = () => {
	const dispatch = useDispatch();
	let minDate = new Date();
	const [typeFile, setTypeFile] = useState(false);
	const location = useLocation();
	const { pathname } = location;
	const [workNotes, setWorkNotes] = useState(false);
	const [requestContent, setRequestContent] = useState(false);
	const [selectEditor, setSelectEditor] = useState(false);
	const [isOpenInput, setIsOpenInput] = useState({});
	const [idUserCreateJob, setIdUserCreateJob] = useState('');
	const [idEditorAdded, setIdEditorAdded] = useState('');

	const user = useSelector((state) => state.auth.user);
	const isOpenInformationJob = useSelector((state) => state.modal.isOpenInformationJob);
	const rowdata = useSelector((state) => state.modal?.dataModalInformationJob);
	const deletejobs = useSelector((state) => state.jobs?.deletejobs);
	const updatejobs = useSelector((state) => state.jobs?.editjobs);
	const donejobs = useSelector((state) => state.jobs?.donejobs);
	const members = useSelector((state) => state.message.allMembers);
	const currentUser = useSelector((state) => state.message.currentUser);

	const {
		control,
		register,
		setValue,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const employees = useSelector((state) => state.employee?.dashboard);

	useEffect(() => {
		if (isOpenInformationJob) {
			overlay.disable();
		} else {
			overlay.enable();
		}
	}, [isOpenInformationJob]);

	useEffect(() => {
		if (rowdata?.data?.photo_types) {
			for (let item of type_files) {
				if (item.code === rowdata?.data?.photo_types) {
					setTypeFile(item);
					break;
				}
			}
		}
		if (rowdata?.data?.work_notes) {
			setWorkNotes(rowdata?.data?.work_notes);
		}
		if (rowdata?.data?.request_content) {
			setRequestContent(rowdata?.data?.request_content);
		}
		if (rowdata?.data) {
			setIdUserCreateJob(rowdata?.data?.id_saler);
			setIdEditorAdded(rowdata?.data?.id_editor);
		}
	}, [rowdata, setValue]);

	useEffect(() => {
		if (deletejobs?.data) {
			if (pathname === URL_ROUTER.WORKFLOW_MANAGEMENT) {
				dispatch(getEmployeePerformance());
			}
			dispatch(setIsOpenInformationJob(false));
		}
	}, [deletejobs, dispatch, pathname]);

	useEffect(() => {
		if (
			isOpenInformationJob &&
			user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
			user?.data?.role !== UserRules.ROLE.EDITOR &&
			user?.data?.role !== UserRules.ROLE.SALER
		) {
			let keyword = '?keyword=Editor';
			dispatch(dashboardEmployeeRequest(keyword));
		}
	}, [dispatch, isOpenInformationJob, user?.data]);

	const handleOpenInput = (key) => {
		if (!Object.keys(isOpenInput).includes(key)) {
			setIsOpenInput({ ...isOpenInput, [key]: true });
		}
	};
	const handleCloseModal = React.useCallback(() => {
		dispatch(setIsOpenInformationJob(false));
		setSelectEditor(false);
		setIsOpenInput({});
		reset();
	}, [dispatch, setSelectEditor, reset]);

	useEffect(() => {
		if (updatejobs?.data && !updatejobs?.error) {
			handleCloseModal();
			if (pathname === URL_ROUTER.WORKFLOW_MANAGEMENT) {
				dispatch(getEmployeePerformance());
			}
			setTimeout(() => {
				dispatch(resetJobRequest());
			}, 500);
		}

		setTimeout(() => {
			dispatch(resetJobCreated());
		}, 500);
	}, [updatejobs, dispatch, handleCloseModal, pathname]);

	useEffect(() => {
		if (donejobs?.data && !donejobs?.error) {
			if (pathname === URL_ROUTER.WORKFLOW_MANAGEMENT) {
				dispatch(getEmployeePerformance());
			}
			handleCloseModal();
			setTimeout(() => {
				dispatch(resetJobRequest());
			}, 500);
		}
	}, [donejobs, dispatch, handleCloseModal, pathname]);

	const handleDeleteJobs = () => {
		const formdata = {};
		formdata.id = rowdata?.data?.id_system;
		formdata.index = rowdata?.index;
		dispatch(deleteJobsRequest(formdata));
	};

	const handleRemoveRow = (event) => {
		const myConfirm = confirmPopup({
			target: event.currentTarget,
			message: 'Bạn có chắc muốn xóa công việc này?',
			icon: 'pi pi-exclamation-triangle',
			accept: handleDeleteJobs,
			acceptLabel: 'Đồng ý',
			rejectLabel: 'Hủy bỏ',
		});

		myConfirm.show();
	};

	const copyToClipboard = (type) => {
		inforToast('Sao chép thành công');
		if (type === 'id_system') {
			copy(rowdata?.data?.id_system);
		}
		if (type === 'org_link') {
			copy(rowdata?.data?.org_link);
		}
		if (type === 'finished_link') {
			copy(rowdata?.data?.finished_link);
		}
	};

	const onSubmit = (data) => {
		const formDataPut = {};
		Object.keys(data).forEach((item) => {
			if (data[item] !== rowdata?.data[item]) {
				Object.assign(formDataPut, { [item]: data[item] });
			}
		});
		if (Object.keys(formDataPut).length > 0) {
			Object.assign(formDataPut, { id_system: rowdata?.data?.id_system });
			const formData = {
				data: data,
				result: formDataPut,
				index: rowdata?.index,
			};

			if (user?.data?.role !== UserRules.ROLE.LEADER_EDITOR && user?.data?.role !== UserRules.ROLE.EDITOR) {
				dispatch(editJobsRequest(formData));
			} else {
				if (formData?.result?.finished_link) {
					dispatch(doneJobsRequest(formData));
				} else {
					errorToast('Chưa cập nhật Link hoàn thành');
				}
			}
		}
	};

	useEffect(() => {
		if (rowdata?.data?.org_link) {
			setValue('org_link', rowdata?.data?.org_link);
		}
	}, [rowdata, setValue]);

	const handleRedirectMessage = () => {
		if (idUserCreateJob !== '' && idEditorAdded !== '' && idEditorAdded !== UserRules.ROLE.NOT_SET_BY_ADMIN) {
			const idRoom = orderIds(idUserCreateJob, idEditorAdded, NAME_ROOM.USER);
			let room = '';
			if (user?.data?.role === UserRules?.ROLE?.SALER || user?.data?.role === UserRules?.ROLE?.ADMIN) {
				room = idEditorAdded;
			} else if (user?.data?.role === UserRules?.ROLE?.EDITOR) {
				room = idUserCreateJob;
			}
			const result = {
				name: room,
				room: idRoom,
			};
			for (let member of members) {
				if (member.id_system === room) {
					result.type = member?.role;
					break;
				}
			}

			socket.emit('reset-notifications', result?.room, currentUser?.id_system);
			dispatch(getCurrentRoom(result));
			dispatch(setIsOpenChat(true));
			dispatch(setIsOpenInformationJob(false));
		}
	};

	return (
		<>
			<ConfirmPopup />
			<Sidebar visible={isOpenInformationJob} position='right' onHide={handleCloseModal} className='create__job'>
				<div className='creat__job'>
					<div className='creat__job--title flex justify-content-between align-items-center'>
						<div className='flex align-items-center'>
							<h2 className='mr-2'>
								Thông tin công việc
								<p>Hiển thị các trường thông tin của công việc </p>
							</h2>
							{idUserCreateJob !== '' &&
								idEditorAdded !== '' &&
								idEditorAdded !== UserRules.ROLE.NOT_SET_BY_ADMIN && (
									<img
										src='images/btn_chat.svg'
										alt=''
										className='cursor-pointer'
										onClick={handleRedirectMessage}
									/>
								)}
						</div>
						{user?.data?.role === UserRules.ROLE.ADMIN &&
							rowdata?.data &&
							Object?.keys(rowdata?.data).length > 0 && (
								<Button onClick={handleRemoveRow}>
									<img src='images/trash.svg' alt='' className='image__trash' />
								</Button>
							)}
					</div>
					<form className=' grid modal__creat--job no_flex' onSubmit={handleSubmit(onSubmit)}>
						{rowdata?.data && Object?.keys(rowdata?.data).length === 0 ? (
							<span className='notfound'>Thông tin công việc không tồn tại</span>
						) : (
							<div className='field col-12 md:col-12 grid pr-0'>
								<div className='field col-12 md:col-12 create__job--calendar'>
									<span htmlFor='start_day'>Ngày tạo công việc :</span>
									<span className='p-float-label pt-3 cursor__normal font-bold'>
										{timezoneToDate(rowdata?.data?.start_day)}
									</span>
								</div>
								<div className='field col-12 md:col-12 create__job--calendar'>
									<span htmlFor='end_day'>
										{user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
											user?.data?.role !== UserRules.ROLE.EDITOR && (
												<span className='warning'>*</span>
											)}
										Deadline :
									</span>
									<span
										onClick={handleOpenInput('end_day')}
										className={
											'p-float-label font-bold ' +
											(user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
											user?.data?.role !== UserRules.ROLE.EDITOR
												? 'cursor__edit'
												: isOpenInput?.end_day
												? ''
												: ' mt-3')
										}
									>
										{user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
										user?.data?.role !== UserRules.ROLE.EDITOR &&
										isOpenInput?.end_day ? (
											<Calendar
												readOnlyInput
												value={new Date(rowdata?.data?.end_day)}
												minDate={minDate}
												onChange={(e) => setValue('end_day', e.value)}
											/>
										) : (
											<span className='p-float-label mt-3'>
												{timezoneToDate(rowdata?.data?.end_day)}
											</span>
										)}
									</span>
								</div>
								<div className='field col-12 md:col-6 '>
									<span htmlFor='quality'>
										{user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
											user?.data?.role !== UserRules.ROLE.EDITOR && (
												<span className='warning'>*</span>
											)}
										Số lượng :
									</span>
									<span
										onClick={handleOpenInput('quality')}
										className={
											'p-float-label ' +
											(user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
											user?.data?.role !== UserRules.ROLE.EDITOR
												? 'cursor__edit'
												: isOpenInput?.quality
												? ''
												: ' mt-3 ')
										}
									>
										{user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
											user?.data?.role !== UserRules.ROLE.EDITOR && (
												<InputNumber
													value={rowdata?.data?.quality}
													onValueChange={(e) => setValue('quality_img', e.value)}
													mode='decimal'
													max={9999}
													min={1}
													className='w-full'
												/>
											)}
									</span>
								</div>
								<div className='field col-12 md:col-6 '>
									<span htmlFor='type_models'>
										{user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
											user?.data?.role !== UserRules.ROLE.EDITOR && (
												<span className='warning'>*</span>
											)}
										Loại ảnh :
									</span>
									<span
										onClick={handleOpenInput('type_models')}
										className={
											'p-float-label ' +
											(user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
											user?.data?.role !== UserRules.ROLE.EDITOR
												? 'cursor__edit'
												: isOpenInput?.type_models
												? ''
												: ' mt-3 ')
										}
									>
										{user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
											user?.data?.role !== UserRules.ROLE.EDITOR && (
												<InputText
													defaultValue={rowdata?.data?.type_models}
													onChange={(e) => setValue('type_models', e.target.value)}
													{...register('type_models', { required: true })}
													className={errors?.type_models && 'p-invalid'}
												/>
											)}
									</span>
								</div>

								<div className='field col-12 md:col-6'>
									<span htmlFor='photo_types'>
										{user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
											user?.data?.role !== UserRules.ROLE.EDITOR && (
												<span className='warning'>*</span>
											)}
										Định dạng file :
									</span>
									<span onClick={handleOpenInput('photo_types')} className={' p-float-label '}>
										{user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
											user?.data?.role !== UserRules.ROLE.EDITOR && (
												<Dropdown
													options={type_files}
													optionLabel='name'
													defaultValue={JobRules.PHOTO_TYPES[rowdata?.data?.photo_types]}
													value={typeFile}
													onChange={(e) => {
														setTypeFile(e.value);
														setValue('photo_types', e.value.code);
													}}
													disabled={
														user?.data?.role === UserRules.ROLE.EDITOR &&
														user?.data?.role === UserRules.ROLE.LEADER_EDITOR
															? true
															: false
													}
												/>
											)}
									</span>
								</div>
								{user?.data?.role === UserRules.ROLE.ADMIN && (
									<div className='field col-12 md:col-6'>
										<span htmlFor='id_editor'>
											<span className='warning'>*</span>Editor :
										</span>
										<span
											onClick={handleOpenInput('id_editor')}
											className={' p-float-label cursor__edit '}
										>
											<Dropdown
												options={employees.data}
												optionLabel='fullname'
												value={selectEditor}
												itemTemplate={itemUserTemplate}
												onChange={(e) => {
													setValue('id_editor', e.value?.id_system);
													setSelectEditor(e.value);
												}}
												disabled={
													user?.data?.role === UserRules.ROLE.EDITOR &&
													user?.data?.role === UserRules.ROLE.LEADER_EDITOR
														? true
														: false
												}
											/>
										</span>
									</div>
								)}
								<div className='field col-12 md:col-12 create__job--calendar'>
									<span htmlFor='org_link'>
										{user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
											user?.data?.role !== UserRules.ROLE.EDITOR && (
												<span className='warning'>*</span>
											)}
										Link ảnh gốc :
									</span>
									<span
										onClick={handleOpenInput('org_link')}
										className={
											'p-float-label  ' +
											(user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
											user?.data?.role !== UserRules.ROLE.EDITOR
												? 'cursor__edit'
												: isOpenInput?.org_link
												? ''
												: ' ')
										}
									>
										{user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
										user?.data?.role !== UserRules.ROLE.EDITOR &&
										isOpenInput?.org_link ? (
											<Controller
												control={control}
												rules={{
													required: true,
												}}
												render={({ field: { onChange, onBlur, value } }) => (
													<InputText onBlur={onBlur} onChange={onChange} value={value} />
												)}
												name='org_link'
											/>
										) : (
											<span className='p-float-label mt-3 flex justify-content-between'>
												<a href={rowdata?.data?.org_link} target='_blank' rel='noreferrer'>
													Link liên kết
												</a>
												<img
													src='images/copy.svg'
													alt='org_link'
													label='Bottom Right'
													onClick={(e) => copyToClipboard(e.target.alt)}
													className='cursor-pointer'
												/>
											</span>
										)}
									</span>
								</div>
								{user?.data?.role === UserRules.ROLE.EDITOR ||
								user?.data?.role === UserRules.ROLE.LEADER_EDITOR ? (
									<div className='field col-12 md:col-12 create__job--calendar'>
										<span htmlFor='finished_link'>
											Link ảnh hoàn thành :<span className='warning'>*</span>
										</span>
										<span
											onClick={handleOpenInput('finished_link')}
											className={'p-float-label cursor__edit '}
										>
											{isOpenInput?.finished_link ? (
												<InputText
													defaultValue={
														rowdata?.data?.finished_link === NOT_SET_ADMIN
															? ''
															: rowdata?.data?.finished_link
													}
													onChange={(e) => setValue('finished_link', e.target.value)}
													{...register('finished_link', { required: true })}
													className={errors?.finished_link && 'p-invalid'}
												/>
											) : (
												<span className='flex justify-content-between'>
													{rowdata?.data?.finished_link === NOT_SET_ADMIN ? (
														'Trống'
													) : (
														<>
															<a
																href={rowdata?.data?.finished_link}
																target='_blank'
																rel='noreferrer'
															>
																Link liên kết
															</a>
															<img
																src='images/copy.svg'
																alt='finished_link'
																label='Bottom Right'
																onClick={(e) => copyToClipboard(e.target.alt)}
																className='cursor-pointer'
															/>
														</>
													)}
												</span>
											)}
										</span>
									</div>
								) : (
									<div className='field col-12 md:col-12 create__job--calendar'>
										<span htmlFor='finished_link'>Link ảnh hoàn thành :</span>
										<span className={'p-float-label  mt-2'}>
											<span className='flex justify-content-between'>
												{rowdata?.data?.finished_link === NOT_SET_ADMIN ? (
													'Trống'
												) : (
													<>
														<a
															href={rowdata?.data?.finished_link}
															target='_blank'
															rel='noreferrer'
														>
															Link liên kết
														</a>
														<img
															src='images/copy.svg'
															alt='finished_link'
															label='Bottom Right'
															onClick={(e) => copyToClipboard(e.target.alt)}
															className='cursor-pointer'
														/>
													</>
												)}
											</span>
										</span>
									</div>
								)}
								{user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
									user?.data?.role !== UserRules.ROLE.EDITOR && (
										<div className='field col-12 md:col-6'>
											<span htmlFor='total_cost'>
												<span className='warning'>*</span>Chi phí tổng :
											</span>
											<span
												onClick={handleOpenInput('total_cost')}
												className={'p-float-label cursor__edit '}
											>
												<InputNumber
													inputId='currency-us'
													value={convertUSD(rowdata?.data?.total_cost)}
													onValueChange={(e) => setValue('total_cost', e.target.value)}
													mode='currency'
													currency='USD'
													locale='en-US'
													useGrouping={true}
													minFractionDigits={0}
													className={` w-full ${errors?.total_cost && 'p-invalid'}`}
												/>
											</span>
										</div>
									)}
								{user?.data?.role !== UserRules.ROLE.SALER && (
									<div className='field col-12 md:col-6'>
										<span htmlFor='editor_cost'>
											{user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
												user?.data?.role !== UserRules.ROLE.EDITOR && (
													<span className='warning'>*</span>
												)}
											Chi phí Editor :
										</span>
										<span onClick={handleOpenInput('editor_cost')} className={'p-float-label '}>
											<InputNumber
												id='editor_cost'
												inputId='currency-vn'
												value={rowdata?.data?.editor_cost}
												onValueChange={(e) => setValue('editor_cost', e.target.value)}
												mode='currency'
												currency='VND'
												locale='vi-VN'
												useGrouping={true}
												className={'m-0'}
											/>
										</span>
									</div>
								)}
								{user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
									user?.data?.role !== UserRules.ROLE.EDITOR && (
										<div className='field col-12 md:col-6'>
											<span htmlFor='saler_cost'>Chi phí Saler :</span>
											<span className='p-float-label mt-2 cursor__normal'>
												<span className='font-bold'>
													{formatUSD(rowdata?.data?.saler_cost)}
												</span>
											</span>
										</div>
									)}
								{user?.data?.role === UserRules.ROLE.ADMIN && (
									<div className='field col-12 md:col-6'>
										<span htmlFor='saler_cost'>Lợi nhuận :</span>
										<span className='p-float-label mt-2 cursor__normal'>
											<span className='font-bold'>{formatUSD(rowdata?.data?.admin_cost)}</span>
										</span>
									</div>
								)}
								{(user?.data?.role === UserRules.ROLE.ADMIN ||
									user?.data?.role === UserRules.ROLE.SALER) && (
									<div className='field col-12 md:col-12'>
										<span htmlFor='request_content'>
											Nội dung yêu cầu :
											{user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
												user?.data?.role !== UserRules.ROLE.EDITOR && (
													<span className='warning'>*</span>
												)}
										</span>
										<InputTextarea
											autoResize
											className='aria_content '
											value={requestContent}
											onChange={(e) => {
												setRequestContent(e.target.value);
												setValue('request_content', e.target.value);
											}}
											style={{ height: '150px' }}
										/>
									</div>
								)}
								<div className='field col-12 md:col-12'>
									<span htmlFor='work_notes'>
										Yêu cầu của khách hàng :
										{user?.data?.role !== UserRules.ROLE.LEADER_EDITOR &&
											user?.data?.role !== UserRules.ROLE.EDITOR && (
												<span className='warning'>*</span>
											)}
									</span>
									<InputTextarea
										autoResize
										className='aria_note'
										value={workNotes}
										onChange={(e) => {
											setWorkNotes(e.target.value);
											setValue('work_notes', e.target.value);
										}}
										style={{ height: '150px' }}
									/>
								</div>
							</div>
						)}
						<div className='btn_modal field col-12 md:col-12 grid position_bottom'>
							<div
								className={`field col-12 md:col-${
									rowdata?.data && Object?.keys(rowdata?.data).length === 0 ? '12' : '6'
								}`}
							>
								<span className='p-float-label'>
									<Button
										label='Hủy bỏ'
										className='p-button-outlined cancel--btn'
										type='button'
										onClick={handleCloseModal}
									/>
								</span>
							</div>
							{rowdata?.data && Object?.keys(rowdata?.data).length === 0 ? (
								''
							) : (
								<div className='field col-12 md:col-6 pr-0'>
									<span className='p-float-label'>
										<Button
											label='Cập nhật'
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

export default InformationJobs;
