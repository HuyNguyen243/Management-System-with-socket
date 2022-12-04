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
import { timezoneToDate } from '../../commons/dateTime'
import { formatUSD, formatVND } from '../../commons/formatCost'
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
            case ("status_pay"):
                const status_pay = rowData?.[item]
                if (status_pay === CustomerRules.STATUS_PAY.PAID) {
                    return (
                        <span className="table__body-name btn_success flex justify-content-center" >{JOB_DONE}</span>
                    )
                }
                if (status_pay === CustomerRules.STATUS_PAY.CANCEL) {
                    return (
                        <span className="table__body-name btn_stop flex justify-content-center" >{JOB_INCOMPLETE}</span>
                    )
                }
                if (status_pay === CustomerRules.STATUS_PAY.UNPAID) {
                    return (
                        <span className="table__body-name btn_pending flex justify-content-center" >{JOB_PENDING}</span>
                    )
                }
                break;
            case ("status_jobs"):
                const status_jobs = rowData?.[item]
                if (status_jobs === JobRules.STATUS_JOBS.COMPLETE) {
                    return (
                        <span className="table__body-name btn_success flex justify-content-center" >{JOB_DONE}</span>
                    )
                }
                if (status_jobs === JobRules.STATUS_JOBS.INCOMPLETE) {
                    return (
                        <span className="table__body-name btn_stop flex justify-content-center" >{JOB_INCOMPLETE}</span>
                    )
                }
                if (status_jobs === JobRules.STATUS_JOBS.PENDING) {
                    return (
                        <span className="table__body-name btn_pending flex justify-content-center" >{JOB_PENDING}</span>
                    )
                }
                break;
            case ("status_editor"):
                const status_editor = rowData?.[item]
                if (status_editor === JobRules.STATUS_EDITOR.COMPLETE) {
                    return (
                        <span className="table__body-name btn_success flex justify-content-center" >{JOB_DONE}</span>
                    )
                }
                if (status_editor === JobRules.STATUS_EDITOR.INCOMPLETE) {
                    return (
                        <span className="table__body-name btn_stop flex justify-content-center" >{JOB_INCOMPLETE}</span>
                    )
                }
                if (status_editor === JobRules.STATUS_EDITOR.PENDING) {
                    return (
                        <span className="table__body-name btn_pending flex justify-content-center" >{JOB_PENDING}</span>
                    )
                }
                break;
            case ("status_customer"):
                const status_customer = rowData?.[item]
                if (status_customer === JobRules.STATUS_CUSTOMER.COMPLETE) {
                    return (
                        <span className="table__body-name btn_success flex justify-content-center" >{CUSTOMER_REQUEST_DONE}</span>
                    )
                }
                if (status_customer === JobRules.STATUS_CUSTOMER.INCOMPLETE) {
                    return (
                        <span className="table__body-name btn_stop flex justify-content-center" >{CUSTOMER_REQUEST_CANCEL}</span>
                    )
                }
                if (status_customer === JobRules.STATUS_CUSTOMER.PENDING) {
                    return (
                        <span className="table__body-name btn_pending flex justify-content-center" >{CUSTOMER_REQUEST_PENDING}</span>
                    )
                }
                break;
            case ("_create_at"):
                return (
                    <span className="table__body-name " >{timezoneToDate(rowData?._create_at)}</span>
                )
            case ("start_day"):
                return (
                    <span className="table__body-name text-bold" >{timezoneToDate(rowData?.start_day)}</span>
                )
            case ("end_day"):
                return (
                    <span className="table__body-name text-bold" >{timezoneToDate(rowData?.end_day)}</span>
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
            case ("staff_is_pay"):
            case ("id_job"):
            case ("id_customer"):
            case ("id_editor"):
            case ("id_saler"):
                return (
                    <span className={`table__body-name text-bold ${item}`} >{rowData?.[item] !== "NOT_SET_BY_ADMIN" && rowData?.[item] }</span>
                )
            case ("total_cost"):
            case ("saler_cost"):
                return (
                    <span className="table__body-name text-bold btn_success" >{formatUSD(rowData?.[item])}</span>
                )
            case ("pay_employees"):
            case ("editor_cost"):
                return (
                    <span className="table__body-name text-bold btn_success" >{formatVND(rowData?.[item])}</span>
                )
            case ("quality"):
                return (
                    <span className="table__body-name text-bold text-blue" >{rowData?.[item] + " - " + rowData["type_models"]}</span>
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