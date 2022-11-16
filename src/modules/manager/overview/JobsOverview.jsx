import React, { useState, useEffect } from 'react'
import Table from "../../../components/table/Table";
import { table_jobs_overview } from '../../../components/table/header_table';
import CreateJobs from '../../modal/CreateJobs';
import CreateCustomer from '../../modal/CreateCustomer';
import InformationCustomer from '../../modal/InformationCustomer';
import InformationJobs from '../../modal/InformationJobs';
import ModalJobEditor from '../../modal/ModalJobEditor';
import UpdateInformationJob from '../../modal/UpdateInformationJob';
import { dashboardJobsRequest } from "../../../redux/overviewJobs/actionJobs";
import { useDispatch, useSelector } from "react-redux"
import { dataParse } from "../../manager/jobs/dataParse"
const JobsOverview = () => {
    const [isOpenCreateJob, setIsOpenCreateJob] = useState(false)
    const [isOpenCreateCustomer, setIsOpenCreateCustomer] = useState(false)
    const [isOpenInformationCustomer, setIsOpenInformationCustomer] = useState(false)
    const [isOpenInformationJob, setIsOpenInformationJob] = useState(false)
    const [isOpenJobEditor, setIsOpenJobEditor] = useState(false)
    const [isOpenUpdateInformationJob, setIsOpenUpdateInformationJob] = useState(false)
    const [filter, setFilter] = useState("")
    const jobs = useSelector(state => state.jobs.dashboard)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(dashboardJobsRequest(filter))
    },[dispatch,filter])
    const DataFilter = (data) => {
        setFilter(data)
    }

    const handleRowClick = (e) => {
        console.log(e)
    }

    const handleCreate = () => {
        setIsOpenCreateJob(true)
    }

    return (
        <>
            <Table
                dataTable={dataParse(jobs?.data)}
                loading={false}
                DataFilter={DataFilter}
                haveTotalTable={false}
                header={table_jobs_overview}
                // handleRowClick={handleRowClick}
                handleCreate={handleCreate}
                name_btn_add={"Tạo công việc"}
            />
            <CreateJobs isOpenCreateJob={isOpenCreateJob} setIsOpenCreateJob={setIsOpenCreateJob} setIsOpenCreateCustomer={setIsOpenCreateCustomer} />
            <CreateCustomer isOpenCreateCustomer={isOpenCreateCustomer} setIsOpenCreateCustomer={setIsOpenCreateCustomer} />
            <InformationCustomer isOpenInformationCustomer={isOpenInformationCustomer} setIsOpenInformationCustomer={setIsOpenInformationCustomer} />
            <InformationJobs isOpenInformationJob={isOpenInformationJob} setIsOpenInformationJob={setIsOpenInformationJob} />
            <ModalJobEditor isOpenJobEditor={isOpenJobEditor} setIsOpenJobEditor={setIsOpenJobEditor} />
            <UpdateInformationJob isOpenUpdateInformationJob={isOpenUpdateInformationJob} setIsOpenUpdateInformationJob={setIsOpenUpdateInformationJob} />
        </>
    )
}

export default JobsOverview