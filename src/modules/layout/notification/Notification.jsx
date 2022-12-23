
import React,{ useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { socket } from "../../../_services/socket";
import { NOTIFICATION_TITLE, NotificationRules, UserRules } from '../../../constants';
import { createNotification, getNotification } from '../../../redux/notification/action';
import { getNotify } from '../../../redux/notification/notificationSlice';
import { useNavigate } from 'react-router';
import { get } from "../../../_services/apiRequest"
import { timeAgo } from '../../../commons/message.common';

const Notification = ({isOpenNotification, setisOpenNotification}) => {
    const user = useSelector(state=> state.auth.user)
    const addjobs = useSelector(state => state.jobs.addjobs)
    const notifys = useSelector(state => state.notification.fetchAllNotification)
    const notifyupdate= useSelector(state => state.notification.updatenotification)

    const [ notifications, setNotifications ] = useState([])

    const [page, setpage] = useState(10);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const soundUrl = './sound/notify.mp3';
    const audio = new Audio(soundUrl);

    const handleInfiniteScroll = async() => {
          const element = document.querySelector('.notification__block');
          if (element.scrollHeight - element.scrollTop === element.clientHeight)
              {
                    const res = await get(`notification?page=${page}`,)
                    const allnotify = notifications.concat(res?.data)
                    setNotifications(allnotify)
                    if (res.data.length > 0){
                        setpage(page + 10)
                    }else{
                        return false
                    }

              }
    };

    useEffect(()=>{
        const el = document.querySelector(".notification__block")
        el.addEventListener("scroll", handleInfiniteScroll);
        return ()=>{
			el.removeEventListener('scroll',handleInfiniteScroll)
		}
    })

    useEffect(() => {
        dispatch(getNotification())
        
    },[dispatch])

    useEffect(() =>{
        if(notifys?.data){
            setNotifications(notifys?.data)
        }
    },[notifys])

    useEffect(() =>{
        if(notifyupdate?.data){
         
        }
    },[notifyupdate])
    
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
        if(payload?.members.includes(user?.data?.id_system)){
            audio.play()
        }
        if(payload){
            const { id_system } = user?.data
            socket.emit('get-members')
            socket.emit("notifications-of-id-system",id_system)
        }
    } )
   
    socket.off("notifications-of-id-system").on("notifications-of-id-system", (payload)=>{
        let allnotification = notifications
        if(notifications[0]?._id !== payload[0]?._id){
            allnotification = [payload[0],...notifications]
        }

        dispatch(getNotify(allnotification))
        setNotifications(allnotification)
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
                        <span className="notify__time">{timeAgo(notify?._create_at)}</span>
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
            {showNotifications()}
            {
                notifyupdate?.loading &&
                <span className="loadmore">loading...</span>
            }
            </div>
        </div>
    )
}

export default Notification