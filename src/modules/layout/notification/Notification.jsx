import React,{ useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { socket } from "../../../_services/socket";
import { NOTIFICATION_TITLE, NotificationRules, UserRules } from '../../../constants';
import { createNotification } from '../../../redux/notification/action';
import { getNotifications } from '../../../redux/notification/notificationSlice';

const Notification = ({isOpenNotification}) => {
    const user = useSelector(state=> state.auth.user)
    const addjobs = useSelector(state => state.jobs.addjobs)
    // const deletejobs = useSelector(state => state.jobs?.deletejobs)
    // const updatejobs = useSelector(state => state.jobs?.editjobs)
    const [ notifications, setNotifications ] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        if (addjobs?.data && !addjobs?.error) {
            let createNotify;
            switch(user?.data?.role){
                case(UserRules?.ROLE.SALER):
                    createNotify = {
                        title: NOTIFICATION_TITLE.CREATE_JOB + " " + user?.data?.id_system,
                        created_by: user?.data?.id_system,
                        status: NotificationRules.STATUS.CREATE_JOB,
                        id_job: addjobs?.data?.infor_id?.id_system,
                        id_saler: addjobs?.data?.infor_id?.id_saler,
                        id_editor: addjobs?.data?.infor_id?.id_editor,
                    }
                    break;
                default:
                    break;
            }

            if(createNotify){
                dispatch(createNotification(createNotify))
            }
        }
    }, [
        addjobs, dispatch, user
    ])

    useEffect(() => {
        if(user?.data){
            const { id_system } = user?.data
            socket.emit("notifications-of-id-system",id_system)
        }
    },[user])

    socket.off("notifications-of-id-system").on("notifications-of-id-system", (payload)=>{
        setNotifications(payload)
        dispatch(getNotifications(payload))
    })
    socket.off('is_created_notify').on('is_created_notify', (payload)=>{
        if(payload){
            const { id_system, role } = user?.data
            socket.emit("notifications-of-id-system",id_system, role)
        }
    } )

    const showNotifications = ()=>{
        if(notifications && notifications?.length > 0 ){
            return notifications?.map((notify,index)=>{
                return (
                    <div className="notification__block" key={index}>
                        <div className="notification_item">
                            <p className="notification__name">{notify?.created_by}</p>
                            <div className="notification__i">
                                <p className="notification__note">{notify?.title}</p>
                                {
                                    Object.keys(notify?.member_check_notify).includes(user?.data?.id_system) &&
                                    <label className="notification__alert"></label>
                                }
                            </div>
                        </div>
                    </div>
                )
            })
        }else{
            return <p className="empty_data">Trống</p>
        }
    }

    return (
        <div className={`notification__container ${!isOpenNotification && "hidden"}`}>
            <div className="notification__title">
                <h5>Thông báo</h5>
            </div>
            {
              showNotifications()
            }
        </div>
    )
}

export default Notification