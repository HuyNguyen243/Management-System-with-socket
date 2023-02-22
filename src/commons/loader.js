import React, { useState, useEffect } from 'react';
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
	const [ isloaded, setIsloaded ] = useState(false)

	useEffect(()=>{
		if(
			deletejobs?.loading ||
			updatejobs?.loading ||
			donejobs?.loading ||
			putUser?.loading ||
			deleteUser?.loading ||
			setting?.loading ||
			updatestting?.loading ||
			putCustomer?.loading ||
			deleteCustomer?.loading ||
			addjobs?.loading ||
			customer?.loading ||
			editUser?.loading ||
			user?.loading ||
			paymentUpdate?.loading ||
			resetpass?.loading
		){
			setIsloaded(true)
		}else{
			setIsloaded(false)
		}
	},[
		deletejobs, updatejobs, donejobs, putUser, 
		deleteUser, setting, updatestting, putCustomer, 
		deleteCustomer, addjobs, customer, editUser, 
		user, paymentUpdate, resetpass
	])

	return (
		<div className='container__loader'>
			<div id='preloader' className={`${isloaded && 'block'}`} >
				<div className='loader'></div>
			</div>
		</div>
	);
};

export default Loader;
