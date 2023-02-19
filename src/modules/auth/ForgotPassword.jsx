import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from '../../constants';
import { forgotPassword } from '../../redux/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../../commons/loader';

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const forgotpass = useSelector((state) => state.auth?.forgotpassword);
	const [errorMessage, setErrorMessage] = useState(['', '']);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({});

	useEffect(() => {
		if (forgotpass?.error) {
			setErrorMessage([false, forgotpass?.data]);
		}
		if (forgotpass?.data?.status) {
			setErrorMessage([true, forgotpass?.data?.data?.messager]);
		}
	}, [forgotpass]);
	const onSubmit = (data) => {
		if (data && !forgotpass?.data) {
			const dataPost = {
				email: data?.email,
			};
			dispatch(forgotPassword(dataPost));
		}
	};

	return (
		<div className='login__container'>
			<div className='login__form form__forgot-pwd'>
				<div className='login__title'>
					<p>Hệ thống quản lý</p>
					<p>One Touch</p>
				</div>
				<div className='login__route forgot__title'>Khôi phục mật khẩu</div>
				<form onSubmit={handleSubmit(onSubmit)} className='forgot__form'>
					<div className='form__email'>
						<p>Email:</p>
						<div className={' form__input ' + (forgotpass?.data ? 'form__input__disabled' : '')}>
							<input
								type='text'
								placeholder='Nhập mail của bạn'
								name='email'
								{...register('email', {
									required: { value: true, message: 'Email không được để trống' },
									maxLength: 55,
									pattern: {
										value: EMAIL_REGEX,
										message: 'Email không hợp lệ',
									},
								})}
								disabled={forgotpass?.data && true}
							/>
						</div>
						{errors?.email?.message && <span className='form__error'>{errors?.email?.message}</span>}
					</div>
					<div className='form__forgotpwd'>
						<p className='form__btn-forgotpwd' onClick={() => navigate('/login')}>
							Quay lại trang đăng nhập
						</p>
					</div>
					<div className='form__btn-submit btn_forgot'>
						<button type='submit'>Khôi phục mật khẩu</button>
					</div>
				</form>
				{errorMessage[0] && <p className='form__message'>{errorMessage[1]}</p>}
				{errorMessage[0] === false && <p className='form__message form__message_error'>{errorMessage[1]}</p>}
			</div>
			<div className='forgotpassword__bg'></div>
			<Loader />
		</div>
	);
};

export default ForgotPassword;
