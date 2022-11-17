import React,{ useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from "react-redux"
import { socket } from "../../../_services/socket";
import { NAME_ROOM } from '../../../constants';
import { UserRules } from '../../../constants';
import { getCurrentRoom, setIsOpenChat } from '../../../redux/messages/messageSlice';
import { timeAgo } from '../../../commons/message.common';

const Messages = ({isOpenMessages, setisOpenMessages}) => {
    const [keyword,setKeyWord] = useState("")
    const [messages,setMessages] = useState([])
    const user = useSelector(state=> state.auth.user)
    const currentUser = useSelector(state=> state.message.currentUser)
    const dispatch = useDispatch()
    useEffect(() => {
        if(user?.data){
            socket.emit('rooms-by-user',user?.data?.id_system)
        }
    },[user])

    socket.off("rooms-by-user").on("rooms-by-user", (payload)=>{
        setMessages(payload)
    })

    const replaceId = (id)=>{
        if(id){
            const newID = id.replace(user?.data?.id_system,"")
            const rs = newID.replace("-","")
            return rs
        }
    }

    const handleOpenMessages =(room,privateMember)=>{
        let role;
        if(privateMember.includes("." + UserRules._ROLE.ADMIN + ".")){
            role = UserRules.ROLE.ADMIN
        }
        if(privateMember.includes("." + UserRules._ROLE.EDITOR + ".")){
            role = UserRules.ROLE.EDITOR
        }
        if(privateMember.includes("." + UserRules._ROLE.SALER + ".")){
            role = UserRules.ROLE.SALER
        }
        if(privateMember.includes("." + UserRules._ROLE.LEADER_EDITOR + ".")){
            role = UserRules.ROLE.LEADER_EDITOR
        }
     
        const data = {
            room : room,
            private_member: privateMember,
            role: role,
        }
        dispatch(getCurrentRoom(data))
        dispatch(setIsOpenChat(true))
        setisOpenMessages(false)
    }

    return (
        <div className={`notification-message__container ${!isOpenMessages && "hidden"}`}>
            <div className="notification-message__title">
                <h5>Tin nhắn</h5>
                <div className="notification-message__search">
                <TextField
                    label="Tìm kiếm"
                    id="outlined-size-small"
                    value={keyword}
                    size="small"
                    onChange={(e)=>setKeyWord(e.target.value)}
                />
                    <img src="../../images/search_blue.svg" alt="" className="filter__btn--search"/>
                </div>
            </div>
            <div className="mess_notification">
                {
                    messages?.length > 0 ?
                    messages.map((item,index)=>{
                        return(
                            <div className="notification-message__block " 
                                key={index} 
                                onClick={()=>handleOpenMessages(item._id,replaceId(item?._id) )}
                            >
                                <div 
                                className={`notification-message__it align-items-center 
                                ${currentUser?.newMessages && Object.keys(currentUser?.newMessages)?.includes(item?._id) && "active"}`} 
                                style={{paddingLeft: "10px"}}>
                                    <div className="chat_img" data="ADMIN" role={replaceId(item?._id)?.split(".")?.[1]}></div>
                                    <div className="notification-message_item">
                                        <p className="notification-message__name flex justify-content-between">
                                            {item?.type === NAME_ROOM.USER ? replaceId(item?._id) : item?._id }
                                            <span className="notification__time">{timeAgo(item?.time)}</span>
                                        </p>
                                        <div className="notification-message__i">
                                            <p className={`
                                            notification-message__note
                                            ${currentUser?.newMessages && Object.keys(currentUser?.newMessages)?.includes(item?._id) && "active"}
                                            `}>
                                                {item?.from === user?.data?.id_system ? "Bạn: " : ""}{item?.content}
                                            </p>
                                            {
                                                currentUser?.newMessages && Object.keys(currentUser?.newMessages)?.includes(item?._id) 
                                                && <label className="notification-message__alert" data-count={currentUser?.newMessages?.[item?._id]}></label>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        )})
                    :
                    <p className="empty_data">Trống</p>
                }
            </div>
        </div>
    )
}

export default Messages