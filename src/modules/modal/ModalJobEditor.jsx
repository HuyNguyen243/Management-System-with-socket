import React, { useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { setIsOpenModalJobEditor } from '../../redux/modal/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { overlay } from '../../commons/overlay';
import copy from 'copy-to-clipboard';
import { inforToast } from '../../commons/toast';

const ModalJobEditor = () => {
	const dispatch = useDispatch();
	const copyToClipboard = () => {
		inforToast('Đã lưu');
		copy('any text');
	};
	const isOpenJobEditor = useSelector((state) => state.modal.isOpenModalJobEditor);

	useEffect(() => {
		if (isOpenJobEditor) {
			overlay.disable();
		} else {
			overlay.enable();
		}
	}, [isOpenJobEditor]);

	return (
		<Sidebar
			visible={isOpenJobEditor}
			position='right'
			onHide={() => dispatch(setIsOpenModalJobEditor(false))}
			className='create__job'
		>
			<div className='information__job'>
				<div className='grid'>
					<div className='field col-12 md:col-6 '>
						<h2>Thông tin công việc </h2>
					</div>
					<div className='field col-12 md:col-6 flex justify-content-end'>
						<img src='images/messager.svg' alt='' className='image_messager' />
					</div>
				</div>
				<form className=' grid modal__creat--job no_flex'>
					<div className='field col-12 md:col-12 grid'>
						<div className='field col-12 md:col-6'>
							<span className='information_job_title'>Mã khách hàng :</span>
							<span className='p-float-label flex-space-between'>
								<span>12345.C.6789</span>
								<img src='images/copy.svg' alt='' label='Bottom Right' onClick={copyToClipboard} />
							</span>
						</div>
						<div className='field col-12 md:col-6'>
							<span className='information_job_title'>Mã công việc :</span>
							<span className='p-float-label flex-space-between'>
								<span>12345.J.6789</span>
								<img src='images/copy.svg' alt='' label='Bottom Right' onClick={copyToClipboard} />
							</span>
						</div>
						<div className='field col-12 md:col-6'>
							<span className='information_job_title '>Trạng thái công việc :</span>
							<span className='p-float-label align-items-center flex'>
								<img src='images/icon_success.svg' alt='' />
								<span>Đang yêu cầu</span>
							</span>
						</div>
						<div className='field col-12 md:col-6'>
							<span className='information_job_title'>Yêu cầu công việc :</span>
							<span className='p-float-label'>
								<span>Chỉnh sửa tính phí</span>
							</span>
						</div>
						<div className='field col-12 md:col-6'>
							<span className='p-float-label flex justify-content-between'>
								<strong className='information_job_title'>Loại ảnh :</strong>
								<span>Model</span>
							</span>
						</div>
						<div className='field col-12 md:col-6'>
							<span className='p-float-label flex justify-content-between'>
								<strong className='information_job_title'>Số lượng ảnh :</strong>
								<span>99</span>
							</span>
						</div>
						<div className='field col-12 md:col-6'>
							<span className='p-float-label flex justify-content-between'>
								<strong className='information_job_title '>Link ảnh gốc :</strong>
								<a href='https://www.freecodecamp.org/' target='_blank' rel='noreferrer'>
									link liên kết
								</a>
							</span>
						</div>
						<div className='field col-12 md:col-6'>
							<span className='p-float-label flex justify-content-between'>
								<strong className='information_job_title'>Định dạng file :</strong>
								<span>PSD</span>
							</span>
						</div>
						<div className='field col-12 md:col-6 '>
							<span className='p-float-label flex justify-content-between'>
								<strong className='information_job_title'>Số tiền nhận được :</strong>
								<span>100.000đ</span>
							</span>
						</div>
						<div className='field col-12 md:col-12'>
							<span className='p-float-label'>
								<span className='information_job_title'>Nội dung yêu cầu :</span>
								<InputTextarea autoResize className='aria_content' disabled />
							</span>
						</div>
						<div className='field col-12 md:col-12'>
							<span className='p-float-label'>
								<span className='information_job_title'>Yêu cầu của khách hàng :</span>
								<InputTextarea autoResize className='aria_note' disabled />
							</span>
						</div>
						<div className='field col-12 md:col-12'>
							<span className='p-float-label'>
								<span className='information_job_title'>
									Link ảnh hoàn thành :<span className='warning'> *</span>
								</span>
								<InputTextarea autoResize className='aria_link' />
							</span>
						</div>
					</div>
					<div className='btn_modal field col-12 md:col-12 grid '>
						<div className='field col-12 md:col-12'>
							<span className='p-float-label'>
								<Button
									label='Hủy bỏ'
									className='p-button-outlined cancel--btn'
									onClick={() => {
										dispatch(setIsOpenModalJobEditor(false));
									}}
								/>
							</span>
						</div>
					</div>
				</form>
			</div>
		</Sidebar>
	);
};

export default ModalJobEditor;
