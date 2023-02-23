import React, { 
	useEffect, 
	// useState 
} from 'react';

import { 
	useDispatch, 
	// useSelector 
} from 'react-redux';
import { jobsStaffSaler, jobsStaffEditor } from '../../../../redux/employeePerformance/action';
// import {  UserRules } from '../../../../constants';
import { dashboardEmployeeRequest } from '../../../../redux/overviewEmployee/actionEmployee';
// import { convertDate } from '../../../../commons/dateTime';
import { dashboardJobsRequest } from '../../../../redux/overviewJobs/actionJobs';
import { settingRequest } from '../../../../redux/admin/action';
import { table_job_performance } from '../../../../components/table/header_table';

import Table from '../../../../components/table/Table';

const JobPerformance = () => {
	const dispatch = useDispatch();
	// const allJobsStaffSaler = useSelector((state) => state.performanceReducer.jobsStaffSaler);
	// const allJobsStaffEditor = useSelector((state) => state.performanceReducer.jobsStaffEditor);
	// const employees = useSelector((state) => state.employee.dashboard);
	// const setting = useSelector((state) => state.setting?.system);

	// const userReminders = useSelector((state) => state.auth.userReminders);
	// const [staffSaler, setStaffSaler] = useState([]);

	// const salers = employees?.data
	// 	? employees?.data.filter((staff) => {
	// 			return staff?.role === UserRules?.ROLE?.SALER;
	// 	  })
	// 	: [];

	// const editors = employees?.data
	// 	? employees?.data.filter((staff) => {
	// 			return staff?.role === UserRules?.ROLE?.EDITOR;
	// 	  })
	// 	: [];
	


	useEffect(() => {
		dispatch(settingRequest());
	}, [dispatch]);


	// useEffect(() => {
	// 	if (allJobsStaffSaler?.data) {
	// 		const newStaffSalers = allJobsStaffSaler?.data?.filter((item) => {
	// 			return !item?._id.includes('A');
	// 		});
	// 		setStaffSaler(newStaffSalers);
	// 	}
	// }, [allJobsStaffSaler]);


	useEffect(() => {
		dispatch(jobsStaffSaler());
		dispatch(jobsStaffEditor());
		dispatch(dashboardEmployeeRequest());
		dispatch(dashboardJobsRequest());
	}, [dispatch]);

	const handleRowClick = (rowdata) => {
		console.log(rowdata);
	};

	const DataFilter = (data) => {
		console.log(data)
	};

	return (
		<Table
			dataTable={[]}
			loading={false}
			DataFilter={DataFilter}
			haveTotalTable={false}
			header={table_job_performance}
			handleRowClick={(e) => handleRowClick(e)}
		/>
	);
};

export default JobPerformance;
