import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { PHONE_REGEX } from '../../../constants';
import { useDispatch } from 'react-redux';
import { userEditProfile } from '../../../redux/auth/action';
import { Password } from 'primereact/password';
import { Calendar } from 'primereact/calendar';
import { storage } from '../../../_services/sesionStorage';
import { formatDate } from '../../../commons/dateTime';
import { resetEditStaff } from '../../../redux/auth/authSlice';

const PersonalInfor = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const editUser = useSelector((state) => state.auth.editUser);
	const [username, setUserName] = useState('');
	const [fullname, setFullname] = useState('');
	const [role, setRole] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [avatar, setAvatar] = useState('images/default_avatar.jpeg');
	const [nameBank, setNameBank] = useState(null);
	const [numberAccountPayment, setNumberAccountPayment] = useState(null);
	const [paymentMethod, setPaymentMethod] = useState('');
	const [branch, setBranch] = useState(null);
	const [error, setError] = useState('');
	const [birth, setBirth] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const birthStorage = storage.get('birth');

	useEffect(() => {
		if (editUser?.data) {
			setConfirmPassword('');
			setPassword('');
			setTimeout(() => {
				dispatch(resetEditStaff());
			}, 500);
		}
	}, [setConfirmPassword, setPassword, editUser, dispatch]);

	const setDefaultValue = React.useCallback(()=>{
		if (user?.data) {
			const { data } = user;
			if (data?.username) {
				setUserName(data?.fullname);
			}
			if (data?.fullname) {
				setFullname(data?.username);
			}
			if (data?.role) {
				setRole(data?.role);
			}
			if (data?.phone) {
				setPhone(data?.phone);
			}
			if (data?.address) {
				setAddress(data?.address);
			}
			if (data?.email) {
				setEmail(data?.email);
			}
			if (data?.avatar) {
				setAvatar(data?.avatar);
			}
			if (data?.nameBank) {
				setNameBank(data?.nameBank);
			}
			if (data?.number_account_payment) {
				setNumberAccountPayment(data?.number_account_payment);
			}
			if (data?.payment_method) {
				setPaymentMethod(data?.payment_method);
			}
			if (data?.branch) {
				setBranch(data?.branch);
			}
			if (data?.births) {
				const date = new Date(data?.births) || new Date(birthStorage);
				setBirth(date);
			}
		}
	},[user, birthStorage])

	useEffect(() => {
		setDefaultValue()
	}, [setDefaultValue]);

	const handleSubmit = (e) => {
		e.preventDefault();
		let flag = true;
		if (password.length < 8 && password.length !== 0) {
			setError('Mật khẩu ít nhất 8 ký tự và không được để trống');
			flag = false;
		}

		if (confirmPassword !== password) {
			setError('Xác nhận mật khẩu phải khớp mật khẩu');
			flag = false;
		}
		if (avatar?.size > 10448576) {
			setError(' Kích thước ảnh quá lớn');
			flag = false;
		}

		if (!phone.match(PHONE_REGEX)) {
			setError(' số điện thoại không phù hợp ');
			flag = false;
		}

		if (flag) {
			let oldData = user?.data;
			const result = {};

			const newData = {
				address: address,
				avatar: avatar,
				births: birth,
				branch: branch,
				email: email,
				fullname: fullname,
				id_system: user?.data?.id_system,
				nameBank: nameBank,
				number_account_payment: numberAccountPayment,
				payment_method: paymentMethod,
				phone: phone,
				role: role,
				start_day: user?.data?.start_day,
				status: user?.data?.status,
				username: username,
			};

			if (password !== '') {
				newData.password = password;
			}

			if (typeof avatar === 'string' && avatar.includes('default_avatar')) {
				newData.avatar = null;
			}

			for (let item in newData) {
				if (newData?.[item] !== oldData?.[item] && item !== 'births') {
					result[item] = newData[item];
				}
				if (item === 'births') {
					if (formatDate(new Date(oldData?.[item])) !== formatDate(birth)) {
						return (result['births'] = newData['births']);
					}
				}
			}
			if (result.fullname) {
				delete result.fullname;
			}
			if (result.username) {
				delete result.username;
			}
			if (Object.keys(result).length > 0) {
				const formData = new FormData();
				Object.keys(result).forEach((item) => {
					formData.append([item], result[item]);
				});
				const fn = {
					id: user?.data?.id_system,
					data: formData,
				};
				dispatch(userEditProfile(fn));
			}
		}
	};

	const handleChangeAvatar = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);

		setImagePreview(URL.createObjectURL(file));
		setAvatar(file);
	};

	const handleCancel = ()=>{
		setDefaultValue()
	}

	return (
		<div className='page h-full' >
			<div className='grid '>
			<div className='field col-12 md:col-12 flex personal__container'>
				<div className='field col-12 md:col-6 personal__block' >
						<form className='infor__block grid' onSubmit={handleSubmit}>
							<div className='field avatar__block absolute '>
								<div className='mask__image'>
									<img src={imagePreview || avatar} alt="" className="mr-5 infor_avatar"/>
								</div>
									<input type='file' id='avatar' onChange={handleChangeAvatar} />
									<label htmlFor='avatar' className='label_avatar absolute'></label>
							</div>
							<div className='field col-12 md:col-12 mb-0 pb-0'>
								<p className='infor__title'>Information</p>
							</div>
							<div className='field col-6 md:col-6'>
								<span>First and last name: </span>
								<InputText placeholder='Nhập họ và tên' value={username} disabled />
							</div>
							{/* <div className='field col-6 md:col-6'>
								<span>Chức vụ: </span>
								<InputText placeholder='Chức vụ' value={role} disabled />
							</div> */}
							<div className='field col-6 md:col-6'>
								<span>Tên đăng nhập: </span>
								<InputText placeholder='Tên đăng nhập' value={fullname} disabled />
							</div>
							<div className='field col-6 md:col-6'>
								<span>Email: </span>
								<InputText placeholder='nhập email' value={email} disabled />
							</div>
							<div className='field col-6 md:col-6'>
								<span>Ngày sinh: </span>
								<Calendar
									value={birth || new Date(birthStorage)}
									onChange={(e) => setBirth(e.value)}
									placeholder='Ngày sinh'
								/>
							</div>

							<div className='field col-12 md:col-6'>
								<span>Số điện thoại: </span>
								<InputText
									placeholder='Số điện thoại'
									value={phone}
									onChange={(e) => {
										setError('');
										setPhone(e.target.value);
									}}
								/>
							</div>
							<div className='field col-12 md:col-6'>
								<span>Địa chỉ: </span>
								<InputText
									placeholder='nhập địa chỉ'
									value={address}
									onChange={(e) => {
										setError('');
										setAddress(e.target.value);
									}}
								/>
							</div>
							<div className='field col-12 md:col-6'>
								<span>Tên ngân hàng: </span>
								<InputText
									type='text'
									value={nameBank || ''}
									placeholder='Enter'
									className='w-full'
									onChange={(e) => {
										setNameBank(e.target.value);
									}}
								/>
							</div>
							<div className='field col-12 md:col-6'>
								<span>Số tài khoản: </span>
								<InputText
									type='text'
									value={numberAccountPayment || ''}
									placeholder='Số tài khoản'
									className='w-full'
									onChange={(e) => {
										setNumberAccountPayment(e.target.value);
									}}
								/>
							</div>
							<div className='field col-12 md:col-6'>
								<span>Tên chủ tài khoản: </span>
								<InputText
									type='text'
									value={branch || ''}
									placeholder='Enter'
									className='w-full'
									onChange={(e) => {
										setBranch(e.target.value);
									}}
								/>
							</div>
							<div className='field col-12 md:col-12 mb-0 pb-0'>
								<p className='infor__title'>Change password</p>
								<span className='infor__content'>Enter input to change your password.</span>
							</div>
							<div className='field col-12 md:col-6'>
								<span>Mật khẩu mới: </span>
								<Password
									placeholder='nhập mật khẩu mới'
									value={password}
									toggleMask
									onChange={(e) => {
										setError('');
										setPassword(e.target.value);
									}}
								/>
							</div>
							<div className='field col-12 md:col-6'>
								<span>Nhập lại mật khẩu: </span>
								<Password
									value={confirmPassword}
									onChange={(e) => {
										setError('');
										setConfirmPassword(e.target.value);
									}}
									toggleMask
									placeholder='Nhập lại mật khẩu'
								/>
							</div>
							{error.length > 0 && (
								<span
									className='warning '
									style={{ fontSize: '13px', marginLeft: '10px', bottom: '100px' }}
								>
									{error}
								</span>
							)}
							<div className='field col-12 md:col-10 flex justify-content-end'>
								<Button
									label='Cancel'
									className='p-button-outlined button__personal--cancel'
									type='button'
									severity="info" 
									onClick={handleCancel}
								/>
							</div>
							<div className='field col-12 md:col-2 flex justify-content-end'>
								<Button
									label='Save'
									className='p-button-outlined p-button-secondary infor__submit w-full'
									type='submit'
								/>
							</div>
						</form>
				</div>
				<div className='field col-12 md:col-6 flex justify-content-center align-items-center personal__block' >
					<div className='relative card__bank'>
						<p className='card__name--bank'>{nameBank || ""}</p>
						<p className='card__nameUser--bank'>{branch ? `Chủ tài khoản: ${branch}` : ""}</p>
						<p className='card__number--bank'>{numberAccountPayment ? `stk: ` : ""}<span>{numberAccountPayment || ""}</span></p>
					</div>
				</div>
			</div>
			</div>
		</div>
	);
};

export default PersonalInfor;
