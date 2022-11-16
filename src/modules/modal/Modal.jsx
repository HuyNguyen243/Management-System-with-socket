import React from 'react';
import Setting from "./Setting"
import CreateCustomer from './CreateCustomer';
import InformationCustomer from './InformationCustomer';
import CreateUser from './CreateUser';
import InformationUser from "./InformationUser"
import CreateJobs from './CreateJobs';
import UpdateInformationJob from './UpdateInformationJob';
import ModalJobEditor from './ModalJobEditor';
import InformationJobs from './InformationJobs';

const Modal = () => {
  return (
    <>
        <Setting />
        <CreateCustomer />
        <InformationCustomer />
        <CreateUser />
        <InformationUser />
        <CreateJobs />
        <UpdateInformationJob />
        <ModalJobEditor />
        <InformationJobs />
    </>
  )
}

export default Modal