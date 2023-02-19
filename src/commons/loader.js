import React from 'react';
import { useSelector } from 'react-redux';

const Loader = () => {
	const deletejobs = useSelector((state) => state.jobs?.deletejobs);
	const updatejobs = useSelector((state) => state.jobs?.editjobs);
	const donejobs = useSelector((state) => state.jobs?.donejobs);
	const putUser = useSelector((state) => state.employee?.edituser);
	const deleteUser = useSelector((state) => state.employee?.deleteuser);
	const setting = useSelector((state) => state.setting?.system);
	const updatestting = useSelector((state) => state.setting?.editsystem);
	const putCustomer = useSelector((state) => state.sale.editcustomer);
	const deleteCustomer = useSelector((state) => state.sale.deletecustomer);
	const addjobs = useSelector((state) => state.jobs.addjobs);
	const customer = useSelector((state) => state.sale.customer);
	const editUser = useSelector((state) => state.auth.editUser);
	const user = useSelector((state) => state.auth?.user);
	const paymentUpdate = useSelector((state) => state.payment.updatepay);
	const resetpass = useSelector((state) => state.auth?.forgotpassword);

	return (
		<div className='container__loader'>
			<div
				id='preloader'
				className={`
        ${deletejobs?.loading && 'block'}
        ${updatejobs?.loading && 'block'}
        ${donejobs?.loading && 'block'}
        ${putUser?.loading && 'block'}
        ${deleteUser?.loading && 'block'}
        ${setting?.loading && 'block'}
        ${updatestting?.loading && 'block'}
        ${putCustomer?.loading && 'block'}
        ${deleteCustomer?.loading && 'block'}
        ${addjobs?.loading && 'block'}
        ${customer?.loading && 'block'}
        ${editUser?.loading && 'block'}
        ${user?.loading && 'block'}
        ${paymentUpdate?.loading && 'block'}
        ${resetpass?.loading && 'block'}
      `}
			>
				<div id='loader'></div>
			</div>
		</div>
	);
};

export default Loader;
