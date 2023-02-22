import { URL_ROUTER } from "../../../routes/routes";
import { UserRules } from '../../../constants';

const { SALER, ADMIN, EDITOR, LEADER_EDITOR } = UserRules.ROLE

export const navButtons = [
	{
		name_image: 'nav/home',
		role: [ ADMIN ],
		isRederect: false,
		route: '',
		name: 'Tổng quan',
		navChild: [
			{
				name: 'Tổng quan công việc',
				isRederect: true,
				route: URL_ROUTER.JOB_OVERVIEW,
			},
			{
				name: 'Tổng quan nhân viên',
				isRederect: true,
				route: URL_ROUTER.EMPLOYEE,
			},
			{
				name: 'Quản lý thanh toán',
				isRederect: true,
				route: URL_ROUTER.PAYMENT_MANAGEMENT,
			},
			{
				name: 'Hiệu suất công việc',
				isRederect: true,
				route: URL_ROUTER.JOB_PERFORMANCE,
			},
		],
	},
	{
		name_image: 'nav/project',
		role: [ EDITOR, LEADER_EDITOR ],
		isRederect: false,
		route: '',
		name: 'Công việc',
		navChild: [
			{
				name: 'Danh sách công việc',
				isRederect: true,
				route: URL_ROUTER.DASHBOARD,
			},
		],
	},
	{
		name_image: 'nav/idcard',
		role: [SALER, ADMIN],
		isRederect: false,
		route: '',
		name: 'Sales',
		navChild: [
			{
				name: 'Quản lý công việc',
				isRederect: true,
				route: URL_ROUTER.WORKFLOW_MANAGEMENT,
			},
			{
				name: 'Quản lý khách hàng',
				isRederect: true,
				route: URL_ROUTER.CUSTOMER,
			},
		],
	},
	{
		name_image: 'nav/wallet',
		role: [ SALER, EDITOR, LEADER_EDITOR ],
		isRederect: false,
		route: '',
		name: 'Thanh toán',
		navChild: [
			{
				name: 'Tiến trình thanh toán',
				isRederect: true,
				route: URL_ROUTER.PAYMENT,
			},
		],
	},
	{
		name_image: 'setting',
		role: [ ADMIN ],
		isRederect: false,
		route: '',
		name: 'Cài đặt',
		navChild: null,
		haveModal: true,
	},
];
