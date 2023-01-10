import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { jobsStaffSaler, jobsStaffEditor } from "../../../../redux/employeePerformance/action";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { JobRules, UserRules } from '../../../../constants';
import { formatVND } from '../../../../commons/formatCost';
import { dashboardEmployeeRequest } from '../../../../redux/overviewEmployee/actionEmployee';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { convertDate } from '../../../../commons/dateTime';
import { dashboardJobsRequest } from '../../../../redux/overviewJobs/actionJobs';


// import { settingRequest } from '../../../../redux/admin/action';

const JobPerformance = () => {
    const dispatch = useDispatch()
    // const user = useSelector(state=> state.auth.user)
    const allJobsStaffSaler = useSelector(state => state.performanceReducer.jobsStaffSaler)
    const allJobsStaffEditor = useSelector(state => state.performanceReducer.jobsStaffEditor)
    const employees = useSelector(state => state.employee.dashboard)
 
    const userReminders = useSelector(state => state.auth.userReminders)
    const [staffSaler, setStaffSaler] = useState([]);

    const salers =employees?.data ? employees?.data.filter((staff)=>{
        return staff?.role === UserRules?.ROLE?.SALER
    }) : []

    const editors =employees?.data ? employees?.data.filter((staff)=>{
        return staff?.role === UserRules?.ROLE?.EDITOR
    }) : []
    // const setting = useSelector(state => state.setting?.system);
    const [user, setUser] = useState('');
    const [dates, setDates] = useState('');

    const [user2, setUser2] = useState('');
    const [dates2, setDates2] = useState('');

    useEffect(()=>{
        if(allJobsStaffSaler?.data ){
            const newStaffSalers = allJobsStaffSaler?.data?.filter((item)=>{
                return !item?._id.includes("A")
            })
            setStaffSaler(newStaffSalers)
        }
    },[allJobsStaffSaler])

    useEffect(()=>{
        if(user?.role === UserRules?.ROLE?.SALER){
            let data = {}
            if (dates?.length > 0 && dates[1]) {
                const arr = convertDate(dates)
                data.start_date = arr[0]
                data.end_date = arr[1]
            }
            if(user?.id_system){
                data.id =user?.id_system
            }
            let result = "";
            Object.keys(data).forEach((item) => {
                result += `&${item}=${data[item]}`
            })
            const newResult = result.replace("&", "?").trim()
            
            dispatch(jobsStaffSaler(newResult))
        }
    },[user, dates, dispatch])

    useEffect(()=>{
        if(user2?.role === UserRules?.ROLE?.EDITOR){
            let data = {}
            if (dates2?.length > 0 && dates2[1]) {
                const arr = convertDate(dates2)
                data.start_date = arr[0]
                data.end_date = arr[1]
            }
            if(user2?.id_system){
                data.id =user2?.id_system
            }
            let result = "";
            Object.keys(data).forEach((item) => {
                result += `&${item}=${data[item]}`
            })
            const newResult = result.replace("&", "?").trim()
            
            dispatch(jobsStaffSaler(newResult))
        }
    },[user2, dates2, dispatch])

    useEffect(() => {
        dispatch(jobsStaffSaler())
        dispatch(jobsStaffEditor())
        dispatch(dashboardEmployeeRequest())
        dispatch(dashboardJobsRequest())
    }, [dispatch])

    const headerTable = (name)=>{
        return(
          <div className="" >
            <span className="">{name}</span>
          </div>
    )}

    const getReminder =(name)=>{
        if (userReminders?.data?.data){
            for(const item of userReminders?.data?.data){
                if(item?._id?.id_system === name){
                    return item?._id?.infor_reminder
                }
            }
        }else{
            return name
        }
    }
    
    const bodyTable = (name)=>{
        const new_name = getReminder(name)
        return(
          <div>
            <span className="table__body-name">{new_name}</span>
          </div>
        )
    }

    const total_count = (rowdata, key, id,isEditor = false)=>{
        switch (key) {
            case JobRules.STATUS_JOBS.INCOMPLETE:
                const count_job_incomplete = rowdata.filter((item)=>{
                    return item.status_jobs === JobRules.STATUS_JOBS.INCOMPLETE
                })
                return(
                    <div>
                      <span className="table__body-name">{(count_job_incomplete?.length)}</span>
                    </div>
                  )
            case JobRules.STATUS_JOBS.COMPLETE:
                const count_job_complete = rowdata.filter((item)=>{
                    return item.status_jobs === JobRules.STATUS_JOBS.COMPLETE
                })
                return(
                    <div>
                      <span className="table__body-name">{count_job_complete?.length}</span>
                    </div>
                )
            case JobRules.STATUS_JOBS.PENDING:
                const count_job_pending = rowdata.filter((item)=>{
                    return item.status_jobs === JobRules.STATUS_JOBS.PENDING
                })
                return(
                    <div>
                      <span className="table__body-name">{count_job_pending?.length}</span>
                    </div>
                )
            case "total_cost":
                const total_cost = rowdata.reduce((acc,item)=>{
                    return acc += item?.total_cost
                },0)
                return(
                    <div>
                      <span className="table__body-name">{formatVND(total_cost)}</span>
                    </div>
                )
            case "bonus_incomplete":
                const bonus_incomplete = rowdata.reduce((acc,item)=>{
                    return item.status_jobs === JobRules.STATUS_JOBS.INCOMPLETE || item.status_jobs === JobRules.STATUS_JOBS.PENDING  ? acc += item?.saler_cost : 0
                },0)
                return(
                    <div>
                      <span className="table__body-name">{formatVND(bonus_incomplete)}</span>
                    </div>
                )
            case "bonus_complete":
                const bonus_complete = rowdata.reduce((acc,item)=>{
                    return item.status_jobs === JobRules.STATUS_JOBS.COMPLETE  ? acc += item?.saler_cost : 0
                },0)
                return(
                    <div>
                      <span className="table__body-name">{formatVND(bonus_complete)}</span>
                    </div>
                )
            case "kpi":
                const bonus = rowdata.reduce((acc,item)=>{
                    return item.status_jobs === JobRules.STATUS_JOBS.COMPLETE  ? acc += item?.saler_cost : 0
                },0)
                let kpi_saler = 0
                if(id && employees?.data && employees?.data?.length > 0){
                    for(const staff of employees?.data){
                        if(staff?.id_system === id && staff?.id_system){
                             kpi_saler = staff?.kpi_saler
                             break
                        }
                    }
                }
                const percent = (bonus * 100) / kpi_saler || 0
                
                return(
                    <div>
                      <span className="table__body-name">{percent}%</span>
                    </div>
                )
            default:
                break;
        }
        return (
            <>
            </>
        )
    }


    const total_count2 = (rowdata, key, id)=>{
        switch (key) {
            case JobRules.STATUS_JOBS.INCOMPLETE:
                const count_job_incomplete = rowdata.filter((item)=>{
                    return item.status_jobs === JobRules.STATUS_JOBS.INCOMPLETE
                })
                return(
                    <div>
                      <span className="table__body-name">{(count_job_incomplete?.length)}</span>
                    </div>
                  )
            case JobRules.STATUS_JOBS.COMPLETE:
                const count_job_complete = rowdata.filter((item)=>{
                    return item.status_jobs === JobRules.STATUS_JOBS.COMPLETE
                })
                return(
                    <div>
                      <span className="table__body-name">{count_job_complete?.length}</span>
                    </div>
                )
            case JobRules.STATUS_JOBS.PENDING:
                const count_job_pending = rowdata.filter((item)=>{
                    return item.status_jobs === JobRules.STATUS_JOBS.PENDING
                })
                return(
                    <div>
                      <span className="table__body-name">{count_job_pending?.length}</span>
                    </div>
                )
            case "total_cost":
                const total_cost = rowdata.reduce((acc,item)=>{
                    return acc += item?.total_cost
                },0)
                return(
                    <div>
                      <span className="table__body-name">{formatVND(total_cost)}</span>
                    </div>
                )
            case "bonus_incomplete":
                const bonus_incomplete = rowdata.reduce((acc,item)=>{
                        return item.status_jobs === JobRules.STATUS_JOBS.INCOMPLETE || item.status_jobs === JobRules.STATUS_JOBS.PENDING  ? acc += item?.editor_cost : 0
                    },0)
                return(
                    <div>
                      <span className="table__body-name">{formatVND(bonus_incomplete)}</span>
                    </div>
                )
            case "bonus_complete":
                const bonus_complete = rowdata.reduce((acc,item)=>{
                    return item.status_jobs === JobRules.STATUS_JOBS.COMPLETE  ? acc += item?.editor_cost : 0
                },0)
                return(
                    <div>
                      <span className="table__body-name">{formatVND(bonus_complete)}</span>
                    </div>
                )
            default:
                break;
        }
        return (
            <>
            </>
        )
    }

    return (
        <div className="page">
            <div className="filter flex">
                <Dropdown
                    options={salers}
                    optionLabel="fullname"
                    value={user}
                    onChange={(e)=>setUser(e.value)}
                    placeholder="Nhân viên"
                    className="filter__user mr-2"
                    style={{maxWidth:"250px"}}
                />
                <div className="calendar relative ">
                    <Calendar value={dates} onChange={e=>setDates(e.value)} selectionMode="range" placeholder="Select date" className="filter__calendar"/>
                    <img src='images/calendar.svg' alt='' className="image__calendar"/>
                </div>
            </div>
            <DataTable value={staffSaler || []} responsiveLayout="stack" breakpoint="1400px" className="table__total--workflow--management field col-12 md:col-12 m-0">
                <Column body={(rowdata)=>bodyTable(rowdata?._id)} header={()=>headerTable("Saler")} className="p-0"/>
                <Column body={(rowdata)=>total_count(rowdata?.jobs, JobRules.STATUS_JOBS.INCOMPLETE)} header={()=>headerTable("Đang yêu cầu")} />
                <Column body={(rowdata)=>total_count(rowdata?.jobs, JobRules.STATUS_JOBS.PENDING)} header={()=>headerTable("Đang xử lý")} />
                <Column body={(rowdata)=>total_count(rowdata?.jobs, JobRules.STATUS_JOBS.COMPLETE)} header={()=>headerTable("Đã hoàn thành")} />
                <Column body={(rowdata)=>total_count(rowdata?.jobs, "total_cost")} header={()=>headerTable("Doanh thu")} />
                <Column body={(rowdata)=>total_count(rowdata?.jobs, "bonus_incomplete")} header={()=>headerTable("Bonus incomplete")} />
                <Column body={(rowdata)=>total_count(rowdata?.jobs, "bonus_complete")} header={()=>headerTable("Bonus complete")} />
                <Column body={(rowdata)=>total_count(rowdata?.jobs, "kpi", rowdata?._id)} header={()=>headerTable("Kpi")} />
            </DataTable>
            <br/>
            <br/>
            <div className="filter flex">
                <Dropdown
                    options={editors}
                    optionLabel="fullname"
                    value={user2}
                    onChange={(e)=>setUser2(e.value)}
                    placeholder="Nhân viên"
                    className="filter__user mr-2"
                    style={{maxWidth:"250px"}}
                />
                <div className="calendar relative ">
                    <Calendar value={dates2} onChange={e=>setDates2(e.value)} selectionMode="range" placeholder="Select date" className="filter__calendar"/>
                    <img src='images/calendar.svg' alt='' className="image__calendar"/>
                </div>
            </div>
            <DataTable value={allJobsStaffEditor?.data || []} responsiveLayout="stack" breakpoint="1400px" className="table__total--workflow--management field col-12 md:col-12 m-0">
                <Column body={(rowdata)=>bodyTable(rowdata?._id)} header={()=>headerTable("Editor")} className="p-0"/>
                <Column body={(rowdata)=>total_count2(rowdata?.jobs, JobRules.STATUS_JOBS.INCOMPLETE)} header={()=>headerTable("Đang yêu cầu")} />
                <Column body={(rowdata)=>total_count2(rowdata?.jobs, JobRules.STATUS_JOBS.PENDING)} header={()=>headerTable("Đang xử lý")} />
                <Column body={(rowdata)=>total_count2(rowdata?.jobs, JobRules.STATUS_JOBS.COMPLETE)} header={()=>headerTable("Đã hoàn thành")} />
                <Column body={(rowdata)=>total_count2(rowdata?.jobs, "total_cost")} header={()=>headerTable("Doanh thu")} />
                <Column body={(rowdata)=>total_count2(rowdata?.jobs, "bonus_incomplete", true)} header={()=>headerTable("Bonus incomplete")} />
                <Column body={(rowdata)=>total_count2(rowdata?.jobs, "bonus_complete")} header={()=>headerTable("Bonus complete")} />
            </DataTable>
        </div>
    )
}

export default JobPerformance