import React, { useEffect, useState } from 'react';
import { PayRules } from '../../constants';
import { formatVND } from '../../commons/formatCost';

const TotalTable = ({ data }) => {
	const dataIsPay = data?.filter((item) => {
		return item?.status_pay === PayRules.STATUS.PAID;
	});
	const dataIsUnPay = data?.filter((item) => {
		return item?.status_pay === PayRules.STATUS.UNPAID || item?.status_pay === PayRules.STATUS.CANCEL;
	});
	const [pay, setPay] = useState(0);
	const [unPaid, setUnPaid] = useState(0);

	useEffect(() => {
		let countPaid = 0;
		for (let i = 0; i < dataIsPay?.length; i++) {
			countPaid += parseInt(dataIsPay[i]?.pay_employees);
		}
		setPay(countPaid);

		let countUnPaid = 0;
		for (let i = 0; i < dataIsUnPay?.length; i++) {
			countUnPaid += parseInt(dataIsUnPay[i]?.pay_employees);
		}
		setUnPaid(countUnPaid);
	}, [dataIsPay, dataIsUnPay]);

	return (
		<div className='total__table grid'>
			<div className='total__block'>
				<div>
					<p className='total__title'>Tổng công việc</p>
					<p className='total__count'>{data?.length}</p>
				</div>
			</div>
			<div className='total__block'>
				<div>
					<p className='total__title'>Việc hoàn thành</p>
					<p className='total__count'>{dataIsPay?.length}</p>
				</div>
			</div>
			<div className='total__block'>
				<div>
					<p className='total__title'>Việc chưa thanh toán </p>
					<p className='total__count'>{dataIsUnPay?.length}</p>
				</div>
			</div>
			<div className='total__block'>
				<div>
					<p className='total__title'>Số tiền chưa thanh toán</p>
					<p className='total__count'>{formatVND(unPaid)}</p>
				</div>
			</div>
			<div className='total__block'>
				<div>
					<p className='total__title'>Số tiền đã thanh toán</p>
					<p className='total__count'>{formatVND(pay)}</p>
				</div>
			</div>
		</div>
	);
};

export default TotalTable;
