import React,{ useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from "react-redux"
import { socket } from "../../../_services/socket";
import { NAME_ROOM } from '../../../constants';
import { getCurrentRoom, setIsOpenChat } from '../../../redux/messages/messageSlice';
import { timeAgo } from '../../../commons/message.common';
import { CharacterRoom } from '../../../commons/message.common';

const Messages = ({isOpenMessages, setisOpenMessages}) => {
    const [keyword,setKeyWord] = useState("")
    const [messages,setMessages] = useState([])
    const user = useSelector(state=> state.auth.user)
    const currentUser = useSelector(state=> state.message.currentUser)
    const dispatch = useDispatch()
    const groups = useSelector(state=> state.message.allGroups)
    const members = useSelector(state=> state.message.allMembers)

    useEffect(() => {
        if(user?.data){
            socket.emit('messages-by-id-system',user?.data?.id_system)
        }
    },[user])

    socket.off("messages-by-id-system").on("messages-by-id-system", (payload)=>{
        setMessages(payload)
    })

    socket.off("user-send-message").on("user-send-message", (payload)=>{
        socket.emit('messages-by-id-system',user?.data?.id_system)
    })

    const replaceId = (id)=>{
        if(id.includes(NAME_ROOM.USER)){
            const newID = id.replace(user?.data?.id_system,"").replace(/-/g,"").replace(NAME_ROOM.USER,"")
            return newID
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
                                    <div className="chat_img" data="ADMIN" role={setCharacterForImage(replaceId(item?._id),item.type)}></div>
                                    <div className="notification-message_item">
                                        <p className="notification-message__name flex justify-content-between">
                                            {replaceId(item?._id)}
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