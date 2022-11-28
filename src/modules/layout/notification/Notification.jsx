import React,{ useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { socket } from "../../../_services/socket";
import { NOTIFICATION_TITLE, NotificationRules, UserRules } from '../../../constants';
import { createNotification } from '../../../redux/notification/action';

const Notification = ({isOpenNotification}) => {
    const user = useSelector(state=> state.auth.user)
    const addjobs = useSelector(state => state.jobs.addjobs)
    const [ notifications, setNotifications ] = useState([])
    const dispatch = useDispatch()
    console.log(notifications)
    useEffect(() => {
        if (addjobs?.data && !addjobs?.error) {
            if(user?.data?.role === UserRules?.ROLE.SALER){
                const createNotify = {
                    title: NOTIFICATION_TITLE.CREATE_JOB + user?.data?.id_system,
                    created_by: user?.data?.id_system,
                    status: NotificationRules.STATUS.CREATE_JOB,
                    id_job: addjobs?.data?.infor_id?.id_system,
                }
                if(addjobs?.data?.infor_id?.id_editor){
                    createNotify.id_editor = addjobs?.data?.infor_id?.id_editor
                }
                dispatch(createNotification(createNotify))
            }
        }
       
    }, [
        addjobs, dispatch, user
    ])

    useEffect(() => {
        if(user?.data){
            const { id_system, role } = user?.data
            socket.emit("notifications-of-id-system",id_system, role)
        }
    },[user])

    socket.off("notifications-of-id-system").on("notifications-of-id-system", (payload)=>{
        setNotifications(payload)
    })

    return (
        <div className={`notification__container ${!isOpenNotification && "hidden"}`}>
            <div className="notification__title">
                <h5>Thông báo</h5>
            </div>
            <div className="notification__block">
                <div className="notification_item">
                    <p className="notification__name">12345.S.12345</p>
                    <div className="notification__i">
                        <p className="notification__note">Sale 123 đã đánh dấu hoàn thành công việc </p>
                        <label className="notification__alert"></label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification