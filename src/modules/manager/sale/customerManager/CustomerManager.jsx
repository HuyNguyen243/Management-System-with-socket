import React, { useState, useEffect } from 'react';
import Table from '../../../../components/table/Table';
import { table_customer_management } from '../../../../components/table/header_table';
import { saleCustomerRequest } from '../../../../redux/sale/action';
import { useDispatch, useSelector } from 'react-redux';
import { dataParse } from './dataParse';
import {
	setIsOpenModalCreateCustomer,
	setIsOpenModalInformationCustomer,
	setDataModalInformationCustomer,
} from '../../../../redux/modal/modalSlice';

const CustomerManager = () => {
	const dispatch = useDispatch();
	const customers = useSelector((state) => state.sale.customers);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		dispatch(saleCustomerRequest(filter));
	}, [dispatch, filter]);

	const DataFilter = (data) => {
		setFilter(data);
	};

	const handleRowClick = (rowData) => {
		dispatch(setIsOpenModalInformationCustomer(true));
		dispatch(setDataModalInformationCustomer(rowData));
	};
	const handleCreate = () => {
		dispatch(setIsOpenModalCreateCustomer(true));
	};

	return (
		<>
			<Table
				dataTable={dataParse(customers?.data)}
				loading={customers?.loading}
				DataFilter={DataFilter}
				haveTotalTable={false}
				header={table_customer_management}
				handleRowClick={handleRowClick}
				name_btn_add={'Tạo khách hàng mới'}
				handleCreate={handleCreate}
			/>
		</>
	);
};

export default CustomerManager;
