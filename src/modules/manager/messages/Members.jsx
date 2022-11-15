import React,{ useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux"
import { orderIds } from '../../../commons/message.common';
import { socket } from "../../../_services/socket";
import { storage } from '../../../_services/sesionStorage';
import { NAME_SESION_NOTIFICATIONS } from '../../../constants';
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
  const user = useSelector(state=> state.auth.user)
  const notifications = useSelector(state=> state.auth.newMessages)
  const getFirstRoom = orderIds(currentUser?.id_system, members?.[0]?.id_system)
  ///set first room 
  useEffect(() => {
    if(user?.data){
      socket.emit('new-user')
      socket.emit("join-room", getFirstRoom)
      joinRoom(getFirstRoom)
    }
  },[user, getFirstRoom, joinRoom])

  useEffect(() => {
    if(Object.keys(notifications).length > 0){
      storage.save(NAME_SESION_NOTIFICATIONS,JSON.stringify(notifications))
    }
  },[notifications])

  useEffect(() => {
    setCurrentRoom(getFirstRoom)
    setPrivateMemberMsg(members?.[0]?.id_system)
    setRole(members?.[0]?.role)
  },[currentUser, getFirstRoom, members, setCurrentRoom, setPrivateMemberMsg, setRole])
  //-----------------------------------//

  //GET ALL USER
  socket.off('new-user').on('new-user', (payload)=>{
      payload.forEach((member)=>{
        if(member?.id_system === user?.data?.id_system){
          setCurrentUser(member)
        }
      })
      setMembers(payload)
 })
  //-----------------------------------//

  const handlePrivateUser = (member)=>{
    setPrivateMemberMsg(member?.id_system)
    setRole(member?.role)
    const roomId = orderIds(currentUser.id_system, member.id_system)
    joinRoom(roomId)
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
                onChange={(e)=>setKeyWord(e.target.value)}
            />
            <img src="../../images/search_blue.svg" alt="" className="filter__btn--search"/>
          </div>
          <div className="flex flex-column justify-content-center">
            <div className="chat_img avatar_me" data="ONLINE" role={currentUser?.id_system?.split(".")?.[1]}></div>
          </div>
      </div>
      <ul className="list">
        { 
          members.map((member,index)=>(
            <div key={index}>
              {
                member?.id_system !== currentUser?.id_system &&
                <li className={privateMemberMsg === member.id_system ? "active" : ""} onClick={()=>handlePrivateUser(member) }>
                  {/* <Avatar image="images/default_avatar.jpeg" size="large" shape="circle" data={member?.status} className="chat_img" /> */}
                  <div className="chat_img" data={member?.status} role={member.id_system?.split(".")?.[1]} ></div>
                  <div className="about">
                  <div className="name">{member?.id_system}</div>
                    {
                      Object?.keys(notifications)?.map((room,index2)=>{
                        return(
                          <div key={index2}>
                            {
                              currentRoom !== room && orderIds(currentUser?.id_system, member?.id_system) === room && 
                              <span className="has_seen">{notifications?.[room]}</span>
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