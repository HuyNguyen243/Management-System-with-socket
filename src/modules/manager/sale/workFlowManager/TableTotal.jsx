import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Analysis from './Analysis';
import { useSelector } from 'react-redux';
import { dataParse } from '../../overview/employeePerformance/dataparse';
import { Calendar } from 'primereact/calendar';
import { UserRules } from '../../../../constants';

const TableTotal = ({ setDateWorkFlow, dateWorkFlow }) => {
	const performance = useSelector((state) => state.performanceReducer.employeePerformance);
	const dataTable = dataParse(performance?.data);
	const user = useSelector((state) => state.auth.user);


	const headerTable = (name) => {
		return (
			<div className=''>
				<span className=''>{name}</span>
			</div>
		);
	};

	const bodyTable = (name) => {
		return (
			<div>
				<span className='table__body-name'>{name}</span>
			</div>
		);
	};

	return (
		<div className='grid'>
			<div className='table__analysis field col-12 md:col-8 mt-0'>
				<DataTable
					value={[dataTable]}
					responsiveLayout='stack'
					breakpoint='1400px'
					className='table__total--workflow--management field col-12 md:col-12 m-0'
				>
					<Column
						body={() => bodyTable(dataTable?.job_pending)}
						header={() => headerTable('Tạm hoãn')}
						className='p-0'
					/>
					<Column
						body={() => bodyTable(dataTable?.job_incomplete)}
						header={() => headerTable('Đang xử lý')}
					/>
					<Column
						body={() => bodyTable(dataTable?.job_complete)}
						header={() => headerTable('Đã hoàn thành')}
					/>
					<Column body={() => bodyTable(dataTable?.cost_jobs)} header={() => headerTable('Doanh thu')} />
					<Column body={() => bodyTable(dataTable?.bonus)} header={() => headerTable('Bonus')} />
					{user?.data?.role !== UserRules?.ROLE?.ADMIN && (
						<Column body={() => bodyTable(dataTable?.kpi)} header={() => headerTable('KPI')} />
					)}
				</DataTable>
			</div>


			<div className='table__analysis field col-12 md:col-4 mt-0'>
				<Calendar
					id=''
					className='w-5 mb-2'
					value={dateWorkFlow}
					onChange={(e) => setDateWorkFlow(e.value)}
					selectionMode='range'
					placeholder='Select date'
				/>
				<Analysis />
			</div>
		</div>
	);
};

export default TableTotal;
