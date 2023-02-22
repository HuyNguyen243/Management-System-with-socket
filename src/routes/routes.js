import React from 'react';
import Dashboard from '../modules/manager/editor/Dashboard';
import WorkflowManagement from '../modules/manager/sale/workFlowManager/WorkflowManagement';
import CustomerManager from '../modules/manager/sale/customerManager/CustomerManager';
import Payment from '../modules/manager/payment/Payment';
import EmployeeOverview from '../modules/manager/overview/EmployeeOverview';
import PaymentManagement from '../modules/manager/overview/PaymentManagement';
import JobPerformance from '../modules/manager/overview/employeePerformance/JobPerformance';
import JobsOverview from '../modules/manager/overview/JobsOverview';
import PersonalInfor from '../modules/manager/personal/PersonalInfor';
import { UserRules } from '../constants';

export const URL_ROUTER = {
	DASHBOARD: '/',
	WORKFLOW_MANAGEMENT: '/workflow-management',
	CUSTOMER: '/customer-management',
	PAYMENT: '/payment',
	EMPLOYEE: '/employee-overview',
	PAYMENT_MANAGEMENT: '/payment-management',
	JOB_PERFORMANCE: '/job-performance',
	JOB_OVERVIEW: '/jobs-overview',
	PERSONAL_INFORMATION: '/personal-information',
	LOGIN: '/login',
	NOT_FOUND: '/404-notfound',
	FORGOT_PASSWORD: '/forgot-password',
	RESET_PASSWORD: '/reset-password',
};

const { SALER, ADMIN, EDITOR, LEADER_EDITOR } = UserRules.ROLE;

export const routes = [
	{
		path: URL_ROUTER.DASHBOARD,
		exact: true,
		role: [EDITOR, LEADER_EDITOR],
		main: () => <Dashboard />,
	},
	{
		path: URL_ROUTER.WORKFLOW_MANAGEMENT,
		exact: true,
		role: [SALER, ADMIN],
		main: () => <WorkflowManagement />,
	},
	{
		path: URL_ROUTER.CUSTOMER,
		exact: true,
		role: [SALER, ADMIN],
		main: () => <CustomerManager />,
	},
	{
		path: URL_ROUTER.PAYMENT,
		exact: true,
		role: [SALER, EDITOR, LEADER_EDITOR],
		main: () => <Payment />,
	},
	{
		path: URL_ROUTER.EMPLOYEE,
		exact: true,
		role: [ADMIN],
		main: () => <EmployeeOverview />,
	},
	{
		path: URL_ROUTER.PAYMENT_MANAGEMENT,
		exact: true,
		role: [ADMIN],
		main: () => <PaymentManagement />,
	},
	{
		path: URL_ROUTER.JOB_PERFORMANCE,
		exact: true,
		role: [ADMIN],
		main: () => <JobPerformance />,
	},
	{
		path: URL_ROUTER.JOB_OVERVIEW,
		exact: true,
		role: [ADMIN],
		main: () => <JobsOverview />,
	},
	{
		path: URL_ROUTER.PERSONAL_INFORMATION,
		exact: true,
		role: [SALER, ADMIN, LEADER_EDITOR, EDITOR],
		main: () => <PersonalInfor />,
	},
];
