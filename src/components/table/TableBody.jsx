import React from 'react'
import {
    CustomerRules,
    CUSTOMER_REQUEST_DONE,
    CUSTOMER_REQUEST_PENDING,
    CUSTOMER_REQUEST_CANCEL,
    UserRules,
    USER_IS_ONLINE,
    USER_IS_STOPPING,
    USER_IS_OFFLINE,
    JobRules,
    JOB_DONE,
    JOB_PENDING,
    JOB_INCOMPLETE
} from '../../constants'
import { formatTimeStamp, formatDate } from '../../commons/dateTime'

const TableBody = ({ rowData, item }) => {
    //btn_success , btn_pending, btn_stop , normal, text-bold ,text-blue
    const HTML = () => {
        switch (item) {
            case ("status"):
                const status = rowData?.[item]
                if (status === CustomerRules.STATUS.PENDING) {
                    return (
                        <span className="table__body-name btn_pending" >{CUSTOMER_REQUEST_PENDING}</span>
                    )
                }
                if (status === CustomerRules.STATUS.REQUEST) {
                    return (
                        <span className="table__body-name btn_success" >{CUSTOMER_REQUEST_DONE}</span>
                    )
                }
                if (status === CustomerRules.STATUS.UNREQUEST) {
                    return (
                        <span className="table__body-name btn_stop" >{CUSTOMER_REQUEST_CANCEL}</span>
                    )
                }
                if (status === UserRules.STATUS.ONLINE) {
                    return (
                        <span className="table__body-name btn_success flex justify-content-between align-items-center " ><span className="dots_online"></span>{USER_IS_ONLINE}</span>
                    )
                }
                if (status === UserRules.STATUS.OFFLINE) {
                    return (
                        <span className="table__body-name btn_stop flex justify-content-between align-items-center" ><span className="dots_offline"></span>{USER_IS_OFFLINE}</span>
                    )
                }
                if (status === UserRules.STATUS.LEAVE) {
                    return (
                        <span className="table__body-name btn_pending flex justify-content-between align-items-center" ><span className="dots_busy"></span> {USER_IS_STOPPING}</span>
                    )
                }
                break;
            case ("status_jobs"):
                const status_jobs = rowData?.[item]
                if (status_jobs === JobRules.STATUS_JOBS.COMPLETE) {
                    return (
                        <span className="table__body-name btn_success flex justify-content-center" ><img src={`../../images/icon_success.svg`} alt="" className="status__image" /> {JOB_DONE}</span>
                    )
                }
                if (status_jobs === JobRules.STATUS_JOBS.INCOMPLETE) {
                    return (
                        <span className="table__body-name btn_stop flex justify-content-center" ><img src={`../../images/icon_close.svg`} alt="" className="status__image" />{JOB_INCOMPLETE}</span>
                    )
                }
                if (status_jobs === JobRules.STATUS_JOBS.PENDING) {
                    return (
                        <span className="table__body-name btn_pending flex justify-content-center" ><img src={`../../images/icon_pending.svg`} alt="" className="status__image" />{JOB_PENDING}</span>
                    )
                }
                break;
            case ("start_day"):
                return (
                    <span className="table__body-name text-bold" >{formatDate(formatTimeStamp(rowData?.start_day))}</span>
                )
            case ("end_day"):
                return (
                    <span className="table__body-name text-bold" >{formatDate(formatTimeStamp(rowData?.end_day))}</span>
                )
            case ("role"):
                const role = rowData?.[item]
                if (role === UserRules.ROLE.SALER) {
                    return (
                        <span className="table__body-name text-bold" >{UserRules.ROLE_NAME.SALER}</span>
                    )
                }
                if (role === UserRules.ROLE.EDITOR) {
                    return (
                        <span className="table__body-name text-bold" >{UserRules.ROLE_NAME.EDITOR}</span>
                    )
                }
                if (role === UserRules.ROLE.LEADER_EDITOR) {
                    return (
                        <span className="table__body-name text-bold"> {UserRules.ROLE_NAME.LEADER_EDITOR}</span>
                    )
                }
                break;
            case ("id_system"):
                return (
                    <span className="table__body-name" >{rowData?.[item]}</span>
                )
            case ("id_customer"):
                return (
                    <span className="table__body-name text-bold" >{rowData?.[item]}</span>
                )
            case ("id_editor"):
                return (
                    <span className="table__body-name text-bold" >{rowData?.[item]}</span>
                )
            case ("id_saler"):
                return (
                    <span className="table__body-name text-bold" >{rowData?.[item]}</span>
                )
            case ("total_cost"):
                return (
                    <span className="table__body-name text-bold btn_success" >{rowData?.[item]} $</span>
                )
            case ("quality"):
                return (
                    <span className="table__body-name text-bold text-blue" >{rowData?.[item]}</span>
                )
            case ("fullname"):
                return (
                    <span className="table__body-name text-bold" >{rowData?.[item]}</span>
                )
            default:
                return (
                    <span className="table__body-name" >{rowData?.[item]}</span>
                )
        }
    }
    return (
        <>
            {HTML()}
        </>
    )
}

export default TableBody