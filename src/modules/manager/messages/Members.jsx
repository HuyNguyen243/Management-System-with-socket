import React,{ useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { Avatar } from 'primereact/avatar';
import { useSelector } from "react-redux"
import { orderIds } from '../../../commons/message.common';
import { socket } from "../../../_services/socket";

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
    joinRoom
  }
  ) => {
  const [keyword,setKeyWord] = useState("")
  const user = useSelector(state=> state.auth.user)
  const notifications = useSelector(state=> state.auth.newMessages)
  const getFirstRoom = orderIds(currentUser?.id_system, members?.[0]?.id_system)
    console.log(notifications)
  ///set first room 
  useEffect(() => {
    if(user?.data){
      socket.emit('new-user')
      socket.emit("join-room", getFirstRoom)
      joinRoom(getFirstRoom)
    }
  },[user, getFirstRoom, joinRoom])

  useEffect(() => {
    setCurrentRoom(getFirstRoom)
    setPrivateMemberMsg(members?.[0]?.id_system)
    setRole(members?.[0]?.role)
  },[currentUser, getFirstRoom, members, setCurrentRoom, setPrivateMemberMsg, setRole])
  //-----------------------------------//

  //GET ALL USER
  socket.off('new-user').on('new-user', (payload)=>{
    if(payload){
      payload.forEach((member)=>{
        if(member?.id_system === user?.data?.id_system){
          setCurrentUser(member)
        }
      })
      setMembers(payload)
    }
  })
  //-----------------------------------//

  const handlePrivateUser = (member)=>{
    setPrivateMemberMsg(member?.id_system)
    setRole(member?.role)
    const roomId = orderIds(currentUser.id_system, member.id_system)
    joinRoom(roomId, false)
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
            <Avatar image="images/default_avatar.jpeg" size="normal" shape="circle" data="ONLINE" className="chat_img avatar_me"/>
          </div>
      </div>
      <ul className="list">
        { 
          members.map((member,index)=>(
            <div key={index}>
              {
                member?.id_system !== currentUser?.id_system &&
                <li className={privateMemberMsg === member.id_system ? "active" : ""} onClick={()=>handlePrivateUser(member) }>
                  <Avatar image="images/default_avatar.jpeg" size="large" shape="circle" data={member?.status} className="chat_img"/>
                  <div className="about">
                    <div className="name">{member?.id_system}</div>
                    {
                      currentRoom !== Object.keys(notifications)?.[0] 
                      && 
                      orderIds(currentUser?.id_system, member?.id_system) === Object.keys(notifications)?.[0]
                      && 
                      <span className="has_seen">!</span>
                    }
                   {/* <div className="status">
                      left 7 mins ago
                    </div>
                  */}
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