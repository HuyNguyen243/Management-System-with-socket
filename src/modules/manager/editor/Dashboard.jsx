import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../../components/table/Table';
import { dataParse } from './dataParse';
import { dashboardJobsRequest } from '../../../redux/overviewJobs/actionJobs';
import { table_dashboard } from '../../../components/table/header_table';
import { setIsOpenInformationJob, setDataModalInformationJob } from '../../../redux/modal/modalSlice';
import { RESET_REQUEST } from '../../../commons/support';

const Dashboard = () => {
	const dispatch = useDispatch();
	const [filter, setFilter] = useState('');
	const jobs = useSelector((state) => state.jobs?.dashboard);

	useEffect(() => {
		RESET_REQUEST(dispatch, filter, dashboardJobsRequest);
	}, [dispatch, filter]);

	useEffect(() => {
		let interval = setInterval(() => {
			RESET_REQUEST(dispatch, filter, dashboardJobsRequest);
		}, 60000 * 5);

		return () => {
			clearInterval(interval);
		};
	}, [filter, dispatch]);

	const DataFilter = (data) => {
		setFilter(data);
	};

	const handleRowClick = (rowdata) => {
		if (rowdata) {
			dispatch(setIsOpenInformationJob(true));
			dispatch(setDataModalInformationJob(rowdata));
		}
	};

	return (
		<>
			<Table
				dataTable={dataParse(jobs?.data)}
				loading={false}
				DataFilter={DataFilter}
				haveTotalTable={false}
				header={table_dashboard}
				handleRowClick={(e) => handleRowClick(e)}
				name_btn_add={false}
				handleCreate={false}
			/>
		</>
	);
};

export default Dashboard;
