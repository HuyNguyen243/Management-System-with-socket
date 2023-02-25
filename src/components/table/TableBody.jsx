import React from 'react';
import {
	CustomerRules,
	CUSTOMER_REQUEST_REQUEST,
	CUSTOMER_REQUEST_PENDING,
	CUSTOMER_REQUEST_CANCEL,
	UserRules,
	USER_IS_ONLINE,
	USER_IS_STOPPING,
	USER_IS_OFFLINE,
	JobRules,
	JOB_DONE,
	JOB_PENDING,
	JOB_INCOMPLETE,
	CUSTOMER_REQUEST_DONE,
	PAY_PAID,
	PAY_UNPAY,
	PAY_CANCEL,
} from '../../constants';
import { timezoneToDate } from '../../commons/dateTime';
import { formatUSD, formatVND } from '../../commons/formatCost';
const TableBody = ({ rowData, item }) => {
	//btn_success , btn_pending, btn_stop , normal, text-bold ,text-blue

	const HTML = () => {
		const value = rowData?.[item]
		switch (item) {
			case 'status':
				if (value === CustomerRules.STATUS.PENDING) {
					return <span className='table__body-name btn_pending'>{CUSTOMER_REQUEST_PENDING}</span>;
				}
				if (value === CustomerRules.STATUS.REQUEST) {
					return <span className='table__body-name btn_success'>{CUSTOMER_REQUEST_REQUEST}</span>;
				}
				if (value === CustomerRules.STATUS.UNREQUEST) {
					return <span className='table__body-name btn_stop'>{CUSTOMER_REQUEST_CANCEL}</span>;
				}
				if (value === UserRules.STATUS.ONLINE) {
					return (
						<span className='table__body-name btn_success flex align-items-center '>{USER_IS_ONLINE}</span>
					);
				}
				if (value === UserRules.STATUS.OFFLINE) {
					return <span className='table__body-name btn_stop flex align-items-center'>{USER_IS_OFFLINE}</span>;
				}
				if (value === UserRules.STATUS.LEAVE) {
					return (
						<span className='table__body-name btn_pending flex align-items-center'>{USER_IS_STOPPING}</span>
					);
				}

				if (status === CustomerRules.STATUS_PAY.PAID) {
					return <span className='table__body-name btn_success flex justify-content-center'>{PAY_PAID}</span>;
				}
				if (status === CustomerRules.STATUS_PAY.CANCEL) {
					return <span className='table__body-name btn_stop flex justify-content-center'>{PAY_CANCEL}</span>;
				}
				if (status === CustomerRules.STATUS_PAY.UNPAID) {
					return (
						<span className='table__body-name btn_pending flex justify-content-center'>{PAY_UNPAY}</span>
					);
				}
				break;
			case 'status_jobs':
				if (value === JobRules.STATUS_JOBS.COMPLETE) {
					return <span className='table__body-name btn_success flex justify-content-center'>{JOB_DONE}</span>;
				}
				if (value === JobRules.STATUS_JOBS.INCOMPLETE) {
					return (
						<span className='table__body-name btn_stop flex justify-content-center'>{JOB_INCOMPLETE}</span>
					);
				}
				if (value === JobRules.STATUS_JOBS.PENDING) {
					return (
						<span className='table__body-name btn_pending flex justify-content-center'>{JOB_PENDING}</span>
					);
				}
				break;
			case 'status_editor':
				if (value === JobRules.STATUS_EDITOR.COMPLETE) {
					return <span className='table__body-name btn_success flex justify-content-center'>{JOB_DONE}</span>;
				}
				if (value === JobRules.STATUS_EDITOR.INCOMPLETE) {
					return (
						<span className='table__body-name btn_stop flex justify-content-center'>{JOB_INCOMPLETE}</span>
					);
				}
				if (value === JobRules.STATUS_EDITOR.PENDING) {
					return (
						<span className='table__body-name btn_pending flex justify-content-center'>{JOB_PENDING}</span>
					);
				}
				break;
			case 'status_customer':
				if (value === JobRules.STATUS_CUSTOMER.DONE) {
					return (
						<span className='table__body-name btn_success flex justify-content-center'>
							{CUSTOMER_REQUEST_DONE}
						</span>
					);
				}
				if (value === JobRules.STATUS_CUSTOMER.REQUEST) {
					return (
						<span className='table__body-name btn_stop flex justify-content-center'>
							{CUSTOMER_REQUEST_REQUEST}
						</span>
					);
				}
				if (value === JobRules.STATUS_CUSTOMER.PENDING) {
					return (
						<span className='table__body-name btn_pending flex justify-content-center'>
							{CUSTOMER_REQUEST_PENDING}
						</span>
					);
				}
				break;
			case '_create_at':
				return <span className='table__body-name '>{timezoneToDate(rowData?._create_at)}</span>;
			case 'start_day':
				return <span className='table__body-name text-bold'>{timezoneToDate(rowData?.start_day)}</span>;
			case 'end_day':
				return <span className='table__body-name text-bold'>{timezoneToDate(rowData?.end_day)}</span>;
			case 'role':
				if (value === UserRules.ROLE.SALER) {
					return <span className='table__body-name text-bold color__green'>{UserRules.ROLE_NAME.SALER}</span>;
				}
				if (value === UserRules.ROLE.EDITOR) {
					return (
						<span className='table__body-name text-bold color__price'>{UserRules.ROLE_NAME.EDITOR}</span>
					);
				}
				if (value === UserRules.ROLE.LEADER_EDITOR) {
					return (
						<span className='table__body-name text-bold color__warning'>
							{' '}
							{UserRules.ROLE_NAME.LEADER_EDITOR}
						</span>
					);
				}
				break;
			case 'id_system':
				return <span className='table__body-name '>{rowData?.[item]}</span>;
			case 'reminder_saler':
			case 'reminder_staff':
			case 'reminder_editor':
			case 'reminder_customer':
				if (item === 'reminder_saler') {
					return (
						<span id={rowData?.id_saler} className={`altSaler table__body-name text-bold ${item}`}>
							{rowData?.[item] !== 'NOT_SET_BY_ADMIN' && rowData?.[item]}
						</span>
					);
				}
				if (item === 'reminder_customer') {
					return (
						<span id={rowData?.id_customer} className={`altCustomer table__body-name text-bold ${item}`}>
							{rowData?.[item] !== 'NOT_SET_BY_ADMIN' && rowData?.[item]}
						</span>
					);
				}
				if (item === 'reminder_editor') {
					return (
						<span id={rowData?.id_editor} className={`altEditor table__body-name text-bold ${item}`}>
							{rowData?.[item] !== 'NOT_SET_BY_ADMIN' && rowData?.[item]}
						</span>
					);
				}
				if (item === 'reminder_staff') {
					return (
						<span id={rowData?.staff_is_pay} className={`altStaff table__body-name text-bold ${item}`}>
							{rowData?.[item] !== 'NOT_SET_BY_ADMIN' && rowData?.[item]}
						</span>
					);
				}
				break;
			case 'date':
				return <span className='table__body-name text-bold'>{rowData?.[item]}</span>;
			case 'infor_reminder':
			case 'staff_is_pay':
			case 'id_job':
			case 'id_customer':
			case 'id_editor':
			case 'id_saler':
				return (
					<span className={` table__body-name text-bold ${item}`}>
						{rowData?.[item] !== 'NOT_SET_BY_ADMIN' && rowData?.[item]}
					</span>
				);
			case 'total_cost':
			case 'saler_cost':
				return <span className='table__body-name text-bold'>{formatUSD(rowData?.[item])}</span>;
			case 'pay_employees':
			case 'editor_cost':
				return (
					<span className='table__body-name text-bold color__price'>
						{formatVND(rowData?.[item])}
					</span>
				);
			case 'quality':
				return (
					<span className='table__body-name text-bold text-blue'>
						{rowData?.[item] + ' - ' + rowData['type_models']}
					</span>
				);
			case 'fullname':
				return <span className='table__body-name text-bold color__name'>{rowData?.[item]}</span>;
			default:
				return <span className='table__body-name'>{rowData?.[item]}</span>;
		}
	};
	return <>{HTML()}</>;
};

export default TableBody;
