import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataParse } from '../../manager/jobs/dataParse';
import Table from '../../../components/table/Table';
import { table_jobs_overview } from '../../../components/table/header_table';
import {
	setIsOpenModalCreateJob,
	setIsOpenInformationJob,
	setIsOpenModalInformationCustomer,
	setDataModalInformationCustomer,
	setDataModalInformationJob,
	setIsOpenModalInformationUser,
	setDataModalInformationUser,
} from '../../../redux/modal/modalSlice';
import { dashboardJobsRequest } from '../../../redux/overviewJobs/actionJobs';
import { getEmployeeRequest } from '../../../redux/overviewEmployee/actionEmployee';
import { getCustomerRequest } from '../../../redux/sale/action';

const JobsOverview = () => {
	const dispatch = useDispatch();
	const [filter, setFilter] = useState('');
	const jobs = useSelector((state) => state.jobs?.dashboard);
	const employees = useSelector((state) => state.employee?.inforuser);
	const customer = useSelector((state) => state.sale?.getcustomer);

	useEffect(() => {
		dispatch(dashboardJobsRequest(filter));
	}, [dispatch, filter]);

	useEffect(() => {
		let interval = setInterval(() => {
			dispatch(dashboardJobsRequest(filter));
		}, 60000 * 5);

		return () => {
			clearInterval(interval);
		};
	}, [filter, dispatch]);

	useEffect(() => {
		if (employees?.data) {
			dispatch(setDataModalInformationUser(employees));
		}
	}, [employees, dispatch]);

	useEffect(() => {
		if (customer?.data) {
			dispatch(setDataModalInformationCustomer(customer));
		}
	}, [customer, dispatch]);

	const DataFilter = (data) => {
		setFilter(data);
	};

	const handleRowClick = (rowdata) => {
		const el = rowdata.originalEvent.target.closest('td').childNodes[1];
		if (el.classList.contains('altSaler')) {
			//OPEN SALE
			const data = {};
			data.id = el.getAttribute('id');
			dispatch(getEmployeeRequest(data));
			setTimeout(()=>{
			dispatch(setIsOpenModalInformationUser(true));
			},700)
		} else if (el.classList.contains('altCustomer')) {
			//OPEN CUSTOMER
			const data = {};
			data.id = el.getAttribute('id');
			dispatch(getCustomerRequest(data));
			setTimeout(()=>{
				dispatch(setIsOpenModalInformationCustomer(true));
			},700)
		} else if (el.classList.contains('altEditor')) {
			//OPEN EDITOR
			const data = {};
			data.id = el.getAttribute('id');
			if (data.id !== 'NOT_SET_BY_ADMIN') {
				dispatch(getEmployeeRequest(data));
				dispatch(setIsOpenModalInformationUser(true));
			}
		} else {
			dispatch(setIsOpenInformationJob(true));
			dispatch(setDataModalInformationJob(rowdata));
		}
	};

	const handleCreate = () => {
		dispatch(setIsOpenModalCreateJob(true));
	};

	return (
		<Table
			dataTable={dataParse(jobs?.data)}
			loading={jobs?.loading}
			DataFilter={DataFilter}
			haveTotalTable={false}
			header={table_jobs_overview}
			handleRowClick={(e) => handleRowClick(e)}
			handleCreate={handleCreate}
			name_btn_add={'T???o c??ng vi???c'}
		/>
	);
};

export default JobsOverview;
