import React,{ useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from "react-redux"
import { socket } from "../../../_services/socket";
import { NAME_ROOM } from '../../../constants';
import { getCurrentRoom, setIsOpenChat } from '../../../redux/messages/messageSlice';
import { timeAgo } from '../../../commons/message.common';
import { CharacterRoom } from '../../../commons/message.common';
import { UserRules } from '../../../constants';
import { requestPermission } from '../../../_services/firebase';
import { useLocation } from 'react-router';
import { NAME_NOTIFICATION } from '../../../constants';
import { postFireBaseNotification } from '../../../_services/apiRequest';

const Messages = ({isOpenMessages, setisOpenMessages}) => {
    const [keyword,setKeyWord] = useState("")
    const [messages,setMessages] = useState([])
    const [token,setToken] = useState(null)
    const [originalMessages,setOriginalMessages] = useState([])
    const user = useSelector(state=> state.auth.user)
    const currentUser = useSelector(state=> state.message.currentUser)
    const dispatch = useDispatch()
    const groups = useSelector(state=> state.message.allGroups)
    const members = useSelector(state=> state.message.allMembers)
    const location = useLocation()
    const { search } = location
    const pathNameURL = window.location.href.replace(search,"")

    requestPermission(setToken)

    useEffect(() => {
        if(user?.data){
            socket.emit('messages-by-id-system',user?.data?.id_system)
        }
    },[user])

    socket.off("messages-by-id-system").on("messages-by-id-system", (payload)=>{
        setMessages(payload)
        setOriginalMessages(payload)
        if(payload.length > 0){
            if(token && currentUser && currentUser?.newMessages){
                for(let room in currentUser?.newMessages){
                    if(room && room === payload?.[0]?._id){
                        const notification ={
                            title: NAME_NOTIFICATION.MESSAGE,
                            message: payload?.[0]?.content
                        }
                        postFireBaseNotification(pathNameURL, notification, token)
                    }
                }
            }
        }
    })

    socket.off("user-send-message").on("user-send-message", (payload)=>{
        socket.emit('messages-by-id-system',user?.data?.id_system)
    })

    const replaceName = (id, only_id = false)=>{
        if(id.includes(NAME_ROOM.USER)){
            const newID = id.replace(user?.data?.id_system,"").replace(/-/g,"").replace(NAME_ROOM.USER,"")
            if(currentUser?.role === UserRules.ROLE.ADMIN){
                for(const member of members){
                    if(member?.id_system === newID){
                        if(only_id){
                            return member?.id_system
                        }
                        return member?.fullname
                    }
                }
            }else{
                return newID
            }
        }
        if(id.includes(NAME_ROOM.GROUP)){
            const newId = id.replace(/-/g,"").replace(NAME_ROOM.GROUP,"")
            if(groups?.length > 0){
                for(const group of groups){
                    if(newId === group?._id){
                            return group?.name
                    }
                }
            }
        }
    }

    const handleOpenMessages =(room,nameRoom)=>{
        const result = {
            name : nameRoom,
            room : room
        }

        if(room.includes(NAME_ROOM.GROUP)){
            result.type = NAME_ROOM.GROUP
        }else{
            for( let member of members){
                if(member.id_system === nameRoom){
                    result.type = member?.role
                    break
                }
            }
        }
        socket.emit("reset-notifications",result?.room, currentUser?.id_system)
        dispatch(getCurrentRoom(result))
        dispatch(setIsOpenChat(true))
        setisOpenMessages(false)
    }

    const setCharacterForImage = (name,type)=>{
        if(name && type){
            if(type === NAME_ROOM.USER){
                if(members?.length > 0){
                    for( let member of members){
                        if(member.id_system === name){
                            return CharacterRoom(member.role)
                        }
                    }
                }
            }else if(type === NAME_ROOM.GROUP){
                return name.charAt(0) + name.charAt(1)
            }
        }
    }

    const searchMessages = (e)=>{
        const { value } = e.target
        setKeyWord(value)
        const newMessages = messages.filter(message=>{
            return replaceName(message?._id).toLowerCase().includes(value.toLowerCase())
        })
        
        if(value !== ""){
            setMessages(newMessages)
        }else{
            setMessages(originalMessages)
        }
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
                    onChange={searchMessages}
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
                                onClick={()=>handleOpenMessages(item._id,replaceName(item?._id,true))}
                            >
                                <div 
                                className={`notification-message__it align-items-center 
                                ${currentUser?.newMessages && Object.keys(currentUser?.newMessages)?.includes(item?._id) && "active"}`} 
                                style={{paddingLeft: "10px"}}>
                                    <div className="chat_img" data="ADMIN" role={setCharacterForImage(replaceName(item?._id),item.type)}></div>
                                    <div className="notification-message_item">
                                        <p className="notification-message__name flex justify-content-between">
                                            <span >{replaceName(item?._id) }</span>
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