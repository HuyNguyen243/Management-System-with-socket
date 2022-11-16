import React,{ useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { useSelector,useDispatch } from "react-redux"
import { orderIds } from '../../../commons/message.common';
import { socket } from "../../../_services/socket";
import { storage } from '../../../_services/sesionStorage';
import { ROOM_SESSION_MESSAGES } from '../../../constants';
import {
    getCurrentUser
} from "../../../redux/messages/messageSlice"
import { getCurrentRoom } from '../../../redux/messages/messageSlice';

  //Avatar have attribute data= [ ONLINE ,LEAVING ,OFFLINE ]
  // <li></li> has className active if handle click them 

const Members = (
  {
      members,
      currentUser,
      currentRoom , 
      setCurrentRoom, 
      privateMemberMsg, 
      setPrivateMemberMsg, 
      setRole,
      setCurrentUser,
      setMembers,
      joinRoom,
  }
  ) => {
    const [keyword,setKeyWord] = useState("")
    const [OldMembers,setOldMembers] = useState([])
    const user = useSelector(state=> state.auth.user)
    const currentRoomByNotifications = useSelector(state=>state.message.curentRoom)
    const dispatch = useDispatch()

    useEffect(() => {
        if(currentRoomByNotifications){
            setCurrentRoom(currentRoomByNotifications.room)
            setRole(currentRoomByNotifications?.role)
            setPrivateMemberMsg(currentRoomByNotifications?.private_member)
            joinRoom(currentRoomByNotifications.room)
            storage.save(ROOM_SESSION_MESSAGES,currentRoomByNotifications)
            if(currentUser?.newMessages && Object?.keys(currentUser?.newMessages).includes(currentRoomByNotifications?.room)){
                socket.emit("reset-notifications",currentRoomByNotifications.room, currentUser?.id_system)
            }
        }
    },[currentRoomByNotifications, setCurrentRoom, setRole, setPrivateMemberMsg, joinRoom, currentUser])

    useEffect(() => {
        if(!currentRoomByNotifications){
            setTimeout(() => {
                dispatch(getCurrentRoom(null))
            }, 500);
        }

    },[currentRoomByNotifications, dispatch, currentUser])

  ///set first room 
    useEffect(() => {
        if(user?.data){
        socket.emit('new-user')
        }
    },[user])
    //-----------------------------------//
  //GET ALL USER
    socket.off('new-user').on('new-user', (payload)=>{
        payload.forEach((member)=>{
            if(member?.id_system === user?.data?.id_system){
                setCurrentUser(member)
                dispatch(getCurrentUser(member))
            }
        })
        setMembers(payload)
        setOldMembers(payload)

        if(storage.get(ROOM_SESSION_MESSAGES)){
            const data =storage.get(ROOM_SESSION_MESSAGES)
            setCurrentRoom(data?.room)
            setRole(data?.role)
            setPrivateMemberMsg(data?.private_member)
            joinRoom(data?.room)
        }
    })
    //-----------------------------------//
    const handlePrivateUser = (member)=>{
        setPrivateMemberMsg(member?.id_system)
        setRole(member?.role)
        const roomId = orderIds(currentUser.id_system, member.id_system)
        joinRoom(roomId)
        socket.emit("reset-notifications",roomId, currentUser?.id_system)
        const data ={
            role: member?.role,
            private_member: member?.id_system,
            room: roomId
        }
        storage.save(ROOM_SESSION_MESSAGES,data)
    }

    const handleSearch = (e) =>{
        const { value } = e.target
        setKeyWord(value)
        const rs = members.filter(member=>{
            return member?.id_system.includes(value)
        })
        if(value !==""){
            if(rs.length > 0){
                setMembers(rs)
            }else{
                setMembers(OldMembers)
            }
        }else{
            setMembers(OldMembers)
        }
    }
    return (
        <div className="people-list" id="people-list">
        <div className="message__title">
            <div className="notification-message__search">
                <TextField
                    label="Tìm kiếm"
                    id="outlined-size-small"
                    value={keyword}
                    size="small"
                    onChange={handleSearch}
                />
                <img src="../../images/search_blue.svg" alt="" className="filter__btn--search"/>
            </div>
            <div className="flex flex-column justify-content-center">
                <div className="chat_img avatar_me" data="ONLINE" role={currentUser?.id_system?.split(".")?.[1]}></div>
            </div>
        </div>
        <span className="title_members">Thành viên</span>
        <ul className="list">
            { 
                members.map((member,index)=>(
                    <div key={index}>
                    {
                        member?.id_system !== currentUser?.id_system &&
                        <li className={privateMemberMsg === member.id_system ? "active" : ""} onClick={()=>handlePrivateUser(member) }>
                        <div className="chat_img" data={member?.status} role={member.id_system?.split(".")?.[1]} ></div>
                        <div className="about">
                        <div className="name">{member?.id_system}</div>
                            {
                            currentUser?.newMessages && Object?.keys(currentUser?.newMessages)?.map((room,index2)=>{
                                return(
                                <div key={index2}>
                                    {
                                    currentRoom !== room && orderIds(currentUser?.id_system, member?.id_system) === room &&
                                    <span className="has_seen">{currentUser?.newMessages?.[room]}</span>
                                    }
                                </div>
                                )
                            })
                            }
                        </div>
                        </li>
                    }
                    </div>
                ))
            }
        </ul>
        </div>
    )
}

export default Members