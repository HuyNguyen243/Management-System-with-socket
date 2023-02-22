import React, { useState, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpenModalInformationPayment } from '../../redux/modal/modalSlice';
import copy from 'copy-to-clipboard';
import { formatVND } from '../../commons/formatCost';
import { Dropdown } from 'primereact/dropdown';
import { PayRules } from '../../constants';
import { updatePayRequest } from '../../redux/payment/actionPay';
import { overlay } from '../../commons/overlay';
import { inforToast } from '../../commons/toast';
// import { resetPaymentUpdate } from '../../redux/payment/paySlice';

const InformationPayment = () => {
	const isOpenModalInformationPayment = useSelector((state) => state.modal.isOpenModalInformationPayment);
	const dataModalInformationPayment = useSelector((state) => state.modal.dataModalInformationPayment?.data);
	const index = useSelector((state) => state.modal.dataModalInformationPayment?.index);
	const user = useSelector((state) => state.auth.user?.data);
	const paymentUpdate = useSelector((state) => state.payment.updatepay);
	const dispatch = useDispatch();
	const [status, setStatus] = useState(null);
	const [listJobs, setListJobs] = useState([]);
	const [idSystems, setidSystems] = useState([]);
	useEffect(() => {
		if (isOpenModalInformationPayment) {
			overlay.disable();
		} else {
			overlay.enable();
		}
	}, [isOpenModalInformationPayment]);

	useEffect(() => {
		if (paymentUpdate?.data) {
			dispatch(setIsOpenModalInformationPayment(false));
			// setTimeout(() => {
			//     dispatch(resetPaymentUpdate())
			// }, 500);
		}
	}, [dispatch, paymentUpdate]);

	const resetModal = React.useCallback(() => {
		dispatch(setIsOpenModalInformationPayment(false));
	}, [dispatch]);

	useEffect(() => {
		if (dataModalInformationPayment && dataModalInformationPayment?.status) {
			setStatus(dataModalInformationPayment?.status);
			setListJobs(dataModalInformationPayment?.list_id);
			const init = [];
			if (dataModalInformationPayment?.list_id?.length > 0) {
				for (let index = 0; index < dataModalInformationPayment?.list_id?.length; index++) {
					const element = dataModalInformationPayment?.list_id[index];
					init.push(element?.id_system);
				}
			}
			setidSystems(init);
		}
	}, [dataModalInformationPayment]);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (status !== dataModalInformationPayment?.status) {
			const newPay = Object.assign({}, dataModalInformationPayment, {
				status: status,
			});
			const req = {
				data: {
					status: status,
					date: dataModalInformationPayment.date,
					id_staff: dataModalInformationPayment.staff_is_pay,
					id_system: idSystems,
				},
				id: user?.id_system,
				result: {
					index: index,
					data: newPay,
				},
			};
			dispatch(updatePayRequest(req));
		}
	};

	const copyToClipboard = (code) => {
		inforToast('Sao chép mã thành công');
		copy(code);
	};

	const payDropdown = [
		{ name: 'Thanh toán', code: PayRules.STATUS.PAID },
		{ name: 'Chưa thanh toán', code: PayRules.STATUS.UNPAID },
	];

	return (
		<>
			<ConfirmPopup />
			<Sidebar
				visible={isOpenModalInformationPayment}
				position='right'
				onHide={resetModal}
				className='create__job'
			>
				<div className='creat__job'>
					<div className='creat__job--title flex justify-content-between' style={{ marginRight: '10px' }}>
						<h2>
							Thông tin thanh toán 
							<p>Hiển thị các trường thông tin thanh toán</p>
						</h2>
					</div>
					<form className=' grid modal__creat--job no_flex' onSubmit={handleSubmit}>
						<div className='field col-12 md:col-12 grid'>
							<div className='field col-12 md:col-6'>
								<span htmlFor='autocomplete'>Biệt danh :</span>
								<span className='p-float-label mt-3 flex cursor__normal'>
									<span className='font-bold mt-1 pr-3 block'>
										{dataModalInformationPayment?.reminder_staff}
									</span>
								</span>
							</div>
							<div className='field col-12 md:col-6'>
								<span htmlFor='autocomplete'>Mã nhân viên :</span>
								<span className='p-float-label mt-3 flex cursor__normal'>
									<span className='font-bold mt-1 pr-3 block'>
										{dataModalInformationPayment?.staff_is_pay}
									</span>
									<img
										src='images/copy.svg'
										alt=''
										label='Bottom Right'
										onClick={() => copyToClipboard(dataModalInformationPayment?.staff_is_pay)}
										className='cursor-pointer'
									/>
								</span>
							</div>
							<div className='field col-12 md:col-6'>
								<span htmlFor='autocomplete'>Chức vụ :</span>
								<span className='p-float-label mt-3 flex cursor__normal'>
									<span className='font-bold mt-1 pr-3 block'>
										{dataModalInformationPayment?.role}
									</span>
								</span>
							</div>
							<div className='field col-12 md:col-6'>
								<span htmlFor='autocomplete'>Tháng :</span>
								<span className='p-float-label mt-3 flex cursor__normal'>
									<span className='font-bold mt-1 pr-3 block'>
										{dataModalInformationPayment?.date}
									</span>
								</span>
							</div>
							<div className='field col-12 md:col-6'>
								<span htmlFor='autocomplete'>Số tiền cần thanh toán :</span>
								<span className='p-float-label mt-3 flex cursor__normal'>
									<span className='font-bold mt-1 pr-3 block'>
										{formatVND(dataModalInformationPayment?.pay_employees)}
									</span>
								</span>
							</div>
							<div className='field col-12 md:col-6'>
								<span htmlFor='autocomplete'>Trạng thái:</span>
								<span className='p-float-label cursor__normal mt-2'>
									{dataModalInformationPayment?.status !== PayRules.STATUS.PAID ? (
										<Dropdown
											options={payDropdown}
											optionLabel='name'
											optionValue='code'
											value={status}
											onChange={(e) => {
												setStatus(e.value);
											}}
											placeholder=' Chọn thanh toán '
										/>
									) : (
										<span className='block mt-4 color__green'>{PayRules.STATUS_NAME.PAID}</span>
									)}
								</span>
							</div>
							{/* LIST ID_JOBS */}
							<div className='field col-12 md:col-12'>
								<span htmlFor='autocomplete'>Danh sách công việc:</span>
								<div className='p-float-label cursor__normal mt-2'>
									{listJobs?.length > 0 &&
										listJobs?.map((item, index) => {
											return (
												<div
													key={index}
													className='flex flex-row w-full justify-content-between flex-wrap mt-3 mb-3'
												>
													<span className='font-bold col-3 md:col-3'>{index + 1}.</span>
													<span className='font-bold text-left col-3 md:col-3'>
														{item?.id_job}
													</span>
													<span className='font-bold text-right col-3 md:col-3 color__green'>
														{formatVND(item?.pay_employees)}
													</span>
													<img
														src='images/copy.svg'
														alt=''
														label='Bottom Right'
														onClick={() => copyToClipboard(item?.id_job)}
														className='cursor-pointer col-3 md:col-3 copy__icon__payments'
													/>
												</div>
											);
										})}
								</div>
							</div>
						</div>
						<div className='btn_modal field col-12 md:col-12 grid position_bottom'>
							<div className='field col-12 md:col-6'>
								<span className='p-float-label'>
									<Button
										label='Hủy bỏ'
										className='p-button-outlined cancel--btn'
										type='button'
										onClick={resetModal}
									/>
								</span>
							</div>
							<div className='field col-12 md:col-6'>
								<span className='p-float-label'>
									<Button
										label='Cập nhật'
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

export default InformationPayment;
