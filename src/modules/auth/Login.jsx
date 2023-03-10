import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { userloginRequest } from '../../redux/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import { errorToast } from '../../commons/toast';

const Login = () => {
	const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		watch,
	} = useForm();

	const [haveSeenPwd, setHaveSeenPwd] = useState(false);
	const user = useSelector((state) => state.auth.token);
	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();
		const data = watch();
		const { username, password } = data;

		if (username && password && username !== '' && password !== '') {
			const result = {
				data: data,
			};
			dispatch(userloginRequest(result));
		}
	};

	useEffect(() => {
		if (user?.error && !user?.data) {
			errorToast('Tài khoản hoặc mật khẩu không chính xác');
		}
	}, [user]);

	return (
		<div className='login__container'>
			<div className='login__bg'>
				<div className='login__bg--img'></div>
			</div>
			<div className='login__form'>
				<div className='login__title'>
					<p>Hệ thống quản lý</p>
					<p>One Touch</p>
					<span className='login__note'>Chào mừng bạn đến với hệ thống quản lý của One Touch</span>
				</div>
				<div className='login__route'>Đăng nhập</div>
				<form onSubmit={onSubmit}>
					<div className='form__email'>
						<p>Tên đăng nhập:</p>
						<div className='form__input'>
							<input
								type='text'
								placeholder='Nhập tên '
								name='username'
								id='username'
								{...register('username', {
									required: { value: true, message: 'Email không được để trống' },
									maxLength: 55,
								})}
							/>
						</div>
						{errors?.username?.message && <span className='form__error'>{errors?.username?.message}</span>}
					</div>
					<div className='form__password'>
						<p>Mật khẩu:</p>
						<div className='form__input'>
							<input
								type={haveSeenPwd ? 'text' : 'password'}
								placeholder='Nhập tên đăng nhập'
								name='password'
								id='password'
								{...register('password', {
									required: { value: true, message: 'Password không được để trống' },
								})}
							/>
							<img
								className='show__password'
								src={haveSeenPwd ? '../../images/closed_eye.png' : '../../images/eye.png'}
								alt=''
								onClick={() => setHaveSeenPwd(!haveSeenPwd)}
							/>
						</div>
						{errors?.password?.message && <span className='form__error'>{errors?.password?.message}</span>}
					</div>
					<div className='form__save--information'>
						<p className='form__btn-forgotpwd' onClick={() => navigate('/forgot-password')}>
							Quên mật khẩu
						</p>
					</div>
					<div className='form__btn-submit'>
						<button type='submit'>Đăng nhập</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
