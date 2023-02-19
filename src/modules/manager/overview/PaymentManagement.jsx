import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../../components/table/Table';
import { table_payment_managerment } from '../../../components/table/header_table';
import { getPayStaffRequest } from '../../../redux/payment/actionPay';
import { dataParseManagement } from '../payment/dataParse';
import {
	setDataModalInformationJob,
	setDataModalInformationUser,
	setIsOpenModalInformationPayment,
	setDataModalInformationPayment,
} from '../../../redux/modal/modalSlice';

const PaymentManagement = () => {
	const dispatch = useDispatch();
	// const payment = useSelector(state => state.payment?.getpay);
	const paymentStaff = useSelector((state) => state.payment?.getstaff);
	const jobs = useSelector((state) => state.jobs?.getjobs);
	const [filter, setFilter] = useState('');
	const employees = useSelector((state) => state.employee?.inforuser);

	useEffect(() => {
		dispatch(getPayStaffRequest(filter));
	}, [dispatch, filter]);

	const DataFilter = (data) => {
		setFilter(data);
	};
	useEffect(() => {
		const data_push = {};
		if (jobs?.data) {
			data_push.data = {};
			Object.assign(data_push.data, jobs?.data?.infor, jobs?.data?.infor_id, jobs?.data?.cost);
			dispatch(setDataModalInformationJob(data_push));
		}
	}, [dispatch, jobs]);

	useEffect(() => {
		if (employees?.data) {
			dispatch(setDataModalInformationUser(employees));
		}
	}, [employees, dispatch]);

	const handleRowClick = (rowdata) => {
		dispatch(setIsOpenModalInformationPayment(true));
		dispatch(setDataModalInformationPayment(rowdata));
	};
	return (
		<Table
			dataTable={dataParseManagement(paymentStaff?.data)}
			loading={paymentStaff?.loading}
			DataFilter={DataFilter}
			haveTotalTable={false}
			header={table_payment_managerment}
			handleRowClick={(e) => handleRowClick(e)}
			name_btn_add={false}
			handleCreate={false}
		/>
	);
};

export default PaymentManagement;
