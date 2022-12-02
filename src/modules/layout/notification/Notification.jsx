
import React,{ useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { socket } from "../../../_services/socket";
import { NOTIFICATION_TITLE, NotificationRules, UserRules } from '../../../constants';
import { createNotification } from '../../../redux/notification/action';
import { getNotifications } from '../../../redux/notification/notificationSlice';
import { useNavigate } from 'react-router';

const Notification = ({isOpenNotification, setisOpenNotification}) => {
    const user = useSelector(state=> state.auth.user)
    const addjobs = useSelector(state => state.jobs.addjobs)
    const [ notifications, setNotifications ] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    socket.off('is_created_notify').on('is_created_notify', (payload)=>{
        if(payload){
            const { id_system } = user?.data
            socket.emit("notifications-of-id-system",id_system)
        }
    } )

    socket.off("notifications-of-id-system").on("notifications-of-id-system", (payload)=>{
        setNotifications(payload)
        dispatch(getNotifications(payload))
    })

    socket.off("is_reset_notify").on("is_reset_notify", (payload)=>{
        if(payload){
            const { id_system } = user?.data
            socket.emit("notifications-of-id-system",id_system)
        }
    })

    const handleSeenNotify = (id, id_job)=>{
        const id_system = user?.data?.id_system
        socket.emit("reset-notify",id, id_system)
        setisOpenNotification(false)
        let pathname;
        switch (user?.data?.role) {
            case UserRules.ROLE.ADMIN:
                pathname = "/jobs-overview"
                break;
            case UserRules.ROLE.SALER:
                pathname = "/workflow-management"
                break;
            case UserRules.ROLE.EDITOR:
            case UserRules.ROLE.LEADER_EDITOR:
                pathname = "/"
                break;
            default:
                break;
        }
        navigate({
            pathname: pathname,
            search: `?keyword=${id_job}`,
        });
    }

    const showNotifications = ()=>{
        if(notifications && notifications?.length > 0 ){
            return notifications?.map((notify,index)=>{
                return (
                    <div 
                    className={`notification_item ${notify?.member_check_notify?.[user?.data?.id_system] && "active"}`} 
                    key={index}
                    onClick={()=>handleSeenNotify(notify?._id,notify?.id_job)}
                    >
                        <p className="notification__name">{notify?.id_job}</p>
                        <div className="notification__i">
                            <p className="notification__note">{notify?.title}</p>
                            {
                                notify?.member_check_notify?.[user?.data?.id_system]
                                &&
                                <label className="notification__alert"></label>
                            }
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
            <div className="notification__block" >
            {
              showNotifications()
            }
            </div>
        </div>
    )
}

export default Notification