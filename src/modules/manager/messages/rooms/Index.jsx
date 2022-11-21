import React,{ useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { useSelector,useDispatch } from "react-redux"
import { socket } from "../../../../_services/socket";
import {
    getCurrentUser
} from "../../../../redux/messages/messageSlice";
import { 
    getAllgroups,
    getAllMembers,
 } from '../../../../redux/messages/messageSlice';
import { NAME_ROOM } from '../../../../constants';
import Members from './Members';
import Groups from './Groups';
import { CharacterRoom } from '../../../../commons/message.common';

const Index = (
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
      setGroups,
      groups,
      setMembersInGroup,
      setGroups_id,
      privateGroupMsg,
      setPrivateGroupMsg,
      setNamePrivateRoom,
  }
  ) => {
    const [keyword,setKeyWord] = useState("")
    const user = useSelector(state=> state.auth.user)
    const currentRoomByNotifications = useSelector(state=>state.message.curentRoom)
    const dispatch = useDispatch()

    useEffect(() => {
        if(currentRoomByNotifications){
            setCurrentRoom(currentRoomByNotifications?.room)
            setRole(currentRoomByNotifications?.type)
            joinRoom(currentRoomByNotifications?.room)
            if(currentRoomByNotifications?.room.includes(NAME_ROOM.USER)){
                setPrivateMemberMsg(currentRoomByNotifications?.name)
                setPrivateGroupMsg("")
            }else if(currentRoomByNotifications?.room.includes(NAME_ROOM.GROUP)){
                setPrivateMemberMsg("")
                setNamePrivateRoom(currentRoomByNotifications?.name)
                setPrivateGroupMsg(currentRoomByNotifications?.room)
            }
        }
    },[currentRoomByNotifications, setCurrentRoom, setRole, setPrivateMemberMsg, setPrivateGroupMsg, joinRoom, setNamePrivateRoom])
  ///set first room 
    useEffect(() => {
        if(user?.data){
        socket.emit('new-user')
        socket.emit('groups',user?.data?.id_system)
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
        dispatch(getAllMembers(payload))
        setMembers(payload)
    })
    socket.off('groups').on("groups", (payload)=>{
        setGroups(payload)
        dispatch(getAllgroups(payload))
    })

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
                <div className="chat_img avatar_me" data="ONLINE" role={CharacterRoom(currentUser?.role)}></div>
            </div>
        </div>
        <ul className="list">
            <Groups 
                groups={groups}
                currentUser={currentUser}
                currentRoom={currentRoom}
                setMembersInGroup={setMembersInGroup}
                setGroups_id={setGroups_id}
                setPrivateGroupMsg={setPrivateGroupMsg}
                setPrivateMemberMsg={setPrivateMemberMsg} 
                setRole={setRole}
                joinRoom={joinRoom}
                privateGroupMsg={privateGroupMsg}
                setNamePrivateRoom={setNamePrivateRoom}
            />
            <Members 
                members={members} 
                currentUser={currentUser} 
                privateMemberMsg={privateMemberMsg} 
                setPrivateMemberMsg={setPrivateMemberMsg} 
                setRole={setRole}
                joinRoom={joinRoom}
                currentRoom={currentRoom}    
                setPrivateGroupMsg={setPrivateGroupMsg}
                setNamePrivateRoom={setNamePrivateRoom}
            />
        </ul>
        </div>
    )
}

export default Index