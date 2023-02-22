import React, { useState, useEffect } from 'react';
// import { useDispatch } from "react-redux"
import { customer_status, user_status, jobs_status, payment_status } from './status';
import Filter from './Filter';
import TotalTable from './TotalTable';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TableTotal from '../../modules/manager/sale/workFlowManager/TableTotal';
import TableBody from './TableBody';
import { Button } from 'primereact/button';
import { paginate } from './paginate';
import Stack from '@mui/material/Stack';
import { useNavigate, useLocation } from 'react-router-dom';
import { convertDate } from '../../commons/dateTime';
import { getEmployeePerformance } from '../../redux/employeePerformance/action';
import { useDispatch, useSelector } from 'react-redux';
import { JobRules } from '../../constants';
import { URL_ROUTER } from '../../routes/routes';

const Table = ({
	dataTable = [],
	loading,
	DataFilter,
	haveTotalTable,
	header,
	handleRowClick,
	name_btn_add,
	handleCreate,
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const { pathname } = location;

	const [perpage, setPerpage] = React.useState(10);
	const [sortBy, setSortBy] = useState('');
	const [sortValue, setSortValue] = useState('');
	const [dropdown, setDropDown] = useState([]);
	const [dateWorkFlow, setDateWorkFlow] = useState([]);
	const [currentLocation, setCurrentLocation] = useState(0);
	const [search, setsearch] = useState('');

	const old_Data = Array.isArray(dataTable) ? dataTable : [];

	const user = useSelector((state) => state.auth.user);

	const urlParams = new URLSearchParams(window.location.search);
	const pageURL = Number(urlParams?.get('page'));
	const perpageURL = Number(urlParams?.get('perpage'));

	useEffect(() => {
		if (perpageURL) {
			setPerpage(perpageURL);
		}
		if (pageURL) {
			setCurrentLocation(pageURL * perpageURL - perpageURL);
		}
	}, [perpageURL, pageURL]);

	const handleSetPage = (event) => {
		setCurrentLocation(event.first);
		setPerpage(event.rows);
		let result = '';
		if (search === '') {
			result = `page=${event.page + 1}&perpage=${event.rows}`;
		} else {
			result = `${search}&page=${event.page + 1}&perpage=${event.rows}`;
		}
		navigate({
			pathname: pathname,
			search: result,
		});
	};

	useEffect(() => {
		if (user?.data?.role !== JobRules?.ROLE?.EDITOR) {
			let data = {};
			let search = '';
			if (dateWorkFlow?.length > 0 && dateWorkFlow[1]) {
				const arr = convertDate(dateWorkFlow);
				data.start_date = arr[0];
				data.end_date = arr[1];

				if (Object.keys(data).length > 0) {
					search = '?start_date=' + data?.start_date + '&end_date=' + data?.end_date;
				} else {
					search = '';
				}
			}
			dispatch(getEmployeePerformance(search));
		}
	}, [dateWorkFlow, dispatch, user]);

	const handleSort = (e) => {
		setSortBy(e.currentTarget.getAttribute('data-by'));
		setSortValue(e.currentTarget.getAttribute('data-value'));
	};

	const headerTable = (header, sort_by) => {
		const value = typeof sort_by === 'string' ? sort_by : '';
		if (header)
			return (
				<div className='table__header-col flex flex-column'>
					<span className='table__header-name'>
						{header?.name}
						{header?.haveSort && (
							<div className='table__sort'>
								<img
									src={`../../images/${
										sortBy === value && sortValue === 'ASC' && value !== ''
											? 'sort_up_disable'
											: 'sort_up'
									}.svg`}
									alt=''
									className='sort__up'
									data-by={value}
									data-value='ASC'
									onClick={handleSort}
								/>
								<img
									src={`../../images/${
										sortBy === value && sortValue === 'DESC' && value !== ''
											? 'sort_down_disable'
											: 'sort_down'
									}.svg`}
									alt=''
									className='sort__down'
									data-by={value}
									data-value='DESC'
									onClick={handleSort}
								/>
							</div>
						)}
					</span>
					<span className='table__unit w-full'>{header?.unit}</span>
				</div>
			);
	};
	useEffect(() => {
		switch (pathname) {
			case URL_ROUTER.EMPLOYEE:
				setDropDown(user_status);
				break;
			case URL_ROUTER.PAYMENT_MANAGEMENT:
			case URL_ROUTER.PAYMENT:
				setDropDown(payment_status);
				break;
			case URL_ROUTER.WORKFLOW_MANAGEMENT:
			case URL_ROUTER.JOB_OVERVIEW:
			case URL_ROUTER.DASHBOARD:
				setDropDown(jobs_status);
				break;
			case URL_ROUTER.CUSTOMER:
				setDropDown(customer_status);
				break;
			default:
		}
	}, [pathname]);

	const bodyTable = (rowData, item, table) => {
		if (table) return <TableBody rowData={rowData} item={item} />;
	};

	return (
		<>
			<Stack spacing={2} direction='row' className='page__header'>
				<h3 className=' page__title'></h3>
				{name_btn_add && (
					<Button variant='contained' className='table__add' onClick={handleCreate}>
						<span className='table__icon--add'>&#43;</span> {name_btn_add}
					</Button>
				)}
			</Stack>
			<div className='page'>
				<br />
				{haveTotalTable && <TotalTable data={old_Data} />}
				<div className='table__container'>
					<div className='table__perpage'>
						<Filter
							DataFilter={DataFilter}
							sortBy={sortBy}
							sortValue={sortValue}
							setSortBy={setSortBy}
							setSortValue={setSortValue}
							dropdown={dropdown}
							search={search}
							setsearch={setsearch}
						/>
						{Object.keys(old_Data).length > 0 && pathname !== URL_ROUTER.JOB_PERFORMANCE && (
							<span>Display:</span>
						)}
					</div>
					<DataTable
						loading={loading}
						value={old_Data}
						responsiveLayout='stack'
						breakpoint='1113px'
						onRowClick={handleRowClick}
						paginator
						paginatorTemplate={
							pathname !== URL_ROUTER.JOB_PERFORMANCE && old_Data?.length > 0 ? paginate : false
						}
						first={currentLocation}
						rows={perpage}
						onPage={handleSetPage}
						emptyMessage={'Không có dữ liệu'}
					>
						{old_Data?.length > 0
							? Object?.keys(old_Data?.[0]).map((item, index) => {
									return (
										header?.[index] && (
											<Column
												key={index}
												field={item || ''}
												body={(rowData) => bodyTable(rowData, item, header?.[index])}
												header={() => headerTable(header?.[index], item)}
											/>
										)
									);
							  })
							: header?.map((item, index) => {
									return (
										<Column
											key={index}
											field={item || ''}
											body=''
											header={() => headerTable(header?.[index], item)}
										/>
									);
							  })}
					</DataTable>
				</div>

				{pathname === URL_ROUTER.WORKFLOW_MANAGEMENT && (
					<TableTotal data={old_Data} setDateWorkFlow={setDateWorkFlow} dateWorkFlow={dateWorkFlow} />
				)}
			</div>
		</>
	);
};

export default Table;
