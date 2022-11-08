import React from 'react'
import { 
    CustomerRules,
    CUSTOMER_REQUEST_DONE,
    CUSTOMER_REQUEST_PENDING,
    CUSTOMER_REQUEST_CANCEL,
 } from '../../constants'
import { formatTimeStamp, formatDate } from '../../commons/dateTime'

const TableBody = ({rowData, item}) => {
        console.log(item)
    //btn_success , btn_pending, btn_stop , normal, text-bold ,text-blue
   const HTML = ()=>{
        switch(item){
            case("status"):
                const status = rowData?.[item]
                if(status === CustomerRules.STATUS.PENDING){
                    return(
                        <span className="table__body-name btn_pending" >{CUSTOMER_REQUEST_PENDING}</span>
                    )
                }
                if(status === CustomerRules.STATUS.REQUEST){
                    return(
                        <span className="table__body-name btn_success" >{CUSTOMER_REQUEST_DONE}</span>
                    )
                }
                if(status === CustomerRules.STATUS.UNREQUEST){
                    return(
                        <span className="table__body-name btn_stop" >{CUSTOMER_REQUEST_CANCEL}</span>
                    )
                }
            break;
            case("_create_at"):
                return(
                    <span className="table__body-name " >{formatDate(formatTimeStamp(rowData?._create_at))}</span>
                )
            case("create_by"):
            case("fullname"):
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