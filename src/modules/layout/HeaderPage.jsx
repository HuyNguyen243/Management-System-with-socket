import React, { useState, useEffect } from 'react';
import { URL_ROUTER } from '../../routes/routes';
import { useLocation } from 'react-router';

const HeaderPage = () => {
	const [title, setTitle] = useState('');
	const location = useLocation();
	const { pathname } = location;

	useEffect(() => {
		switch (pathname) {
			case URL_ROUTER.PERSONAL_INFORMATION:
				setTitle('Thông tin cá nhân');
				break;
			case URL_ROUTER.JOB_OVERVIEW:
			case URL_ROUTER.WORKFLOW_MANAGEMENT:
				setTitle('Tổng quan công việc');
				break;
			case URL_ROUTER.EMPLOYEE:
				setTitle('Tổng quan nhân viên');
				break;
			case URL_ROUTER.PAYMENT_MANAGEMENT:
				setTitle('Quản lý thanh toán');
				break;
			case URL_ROUTER.JOB_PERFORMANCE:
				setTitle('Hiệu suất công việc');
				break;
			case URL_ROUTER.CUSTOMER:
				setTitle('Quản lý khách hàng');
				break;
			default:
				break;
		}
	}, [pathname]);

	return (
		<div className='header__title'>
			<h3 className=' page__title'>
				{title}
				{/* <p className="page__content">{content}</p> */}
			</h3>
		</div>
	);
};

export default HeaderPage;
