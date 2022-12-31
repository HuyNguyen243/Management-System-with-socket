import React from 'react';
import Setting from "./Setting"
import CreateCustomer from './CreateCustomer';
import InformationCustomer from './InformationCustomer';
import CreateUser from './CreateUser';
import InformationUser from "./InformationUser"
import CreateJobs from './CreateJobs';
import ModalJobEditor from './ModalJobEditor';
import InformationJobs from './InformationJobs';
import InformationPayment from './InformationPayment';

const Modal = () => {
  return (
    <>
        <Setting />
        <CreateCustomer />
        <InformationCustomer />
        <CreateUser />
        <InformationUser />
        <CreateJobs />
        <ModalJobEditor />
        <InformationJobs />
        <InformationPayment />
    </>
  )
}

export default Modal