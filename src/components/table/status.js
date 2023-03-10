import { CustomerRules, UserRules, JobRules, PayRules } from '../../constants';

export const customer_status = [
	{
		status: 'None',
		image: '',
		id: '',
	},
	{
		status: 'Đang yêu cầu',
		image: 'icon_success',
		id: CustomerRules.STATUS.REQUEST,
	},
	{
		status: 'Tạm hoãn yêu cầu',
		image: 'icon_pending',
		id: CustomerRules.STATUS.PENDING,
	},
	{
		status: 'Ngừng yêu cầu',
		image: 'icon_close',
		id: CustomerRules.STATUS.UNREQUEST,
	},
];

export const user_status = [
	{
		status: 'None',
		dots: '',
		id: '',
	},
	{
		status: 'Đang hoạt động',
		css_status: {
			status: 'btn_success',
			dots: 'dots_online',
		},
		id: UserRules.STATUS.ONLINE,
	},
	{
		status: 'Tạm ngưng hoạt động',
		css_status: {
			status: 'btn_pending',
			dots: 'dots_busy',
		},
		id: UserRules.STATUS.LEAVE,
	},
	{
		status: 'Không hoạt động',
		css_status: {
			status: 'btn_stop',
			dots: 'dots_offline',
		},
		id: UserRules.STATUS.OFFLINE,
	},
];

export const jobs_status = [
	{
		status: 'None',
		image: '',
		id: '',
	},
	{
		status: 'Đã hoàn thành',
		image: 'icon_success',
		id: JobRules.STATUS_JOBS.COMPLETE,
	},
	{
		status: 'Đang xử lý',
		image: 'icon_pending',
		id: JobRules.STATUS_JOBS.PENDING,
	},
	{
		status: 'Chưa hoàn thành',
		image: 'icon_close',
		id: JobRules.STATUS_JOBS.INCOMPLETE,
	},
];

export const payment_status = [
	{
		status: 'None',
		image: '',
		id: '',
	},
	{
		status: 'Đã thanh toán',
		image: 'icon_success',
		id: PayRules?.STATUS?.PAID,
	},
	{
		status: 'Chưa thanh toán',
		image: 'icon_pending',
		id: PayRules?.STATUS?.UNPAID,
	},
	{
		status: 'Đã hủy',
		image: 'icon_close',
		id: PayRules?.STATUS?.CANCEL,
	},
];
