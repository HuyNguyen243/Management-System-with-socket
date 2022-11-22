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
import { roomStorage } from '../../../../commons/message.common';
import { UserRules } from '../../../../constants';

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
      membersInGroup,
      setMembersInGroup,
      setGroups_id,
      privateGroupMsg,
      setPrivateGroupMsg,
      setNamePrivateRoom,
      setMessageOnRoom,
  }
  ) => {
    const [keyword,setKeyWord] = useState("")
    const user = useSelector(state=> state.auth.user)
    const currentRoomByNotifications = useSelector(state=>state.message.curentRoom)
    const dispatch = useDispatch()

    const [originalMembers, setOriginalMembers] = useState([])
    const [originalGroups, setOriginalGroups] = useState([])
    
    useEffect(() => {
        // CHECK SESSIONSTORAGE AND SAVE
        const roomBySsTorage = roomStorage.get()
        if(roomBySsTorage){
                setGroups_id(roomBySsTorage.groud_id)
                setPrivateGroupMsg(roomBySsTorage?.privateGroupMsg)
                setPrivateMemberMsg(roomBySsTorage?.received)
                setRole(NAME_ROOM.GROUP)
                setMembersInGroup(roomBySsTorage?.membersInGroup)
                setNamePrivateRoom(roomBySsTorage?.namePrivateRoom)
            if(roomBySsTorage?.privateGroupMsg !== ""){
                setCurrentRoom(roomBySsTorage?.privateGroupMsg)
                joinRoom(roomBySsTorage?.privateGroupMsg)
            }else{
                setCurrentRoom(roomBySsTorage?.privateMemberMsg)
                joinRoom(roomBySsTorage?.privateMemberMsg)
            }
        }
    },[setGroups_id, setMembersInGroup, setNamePrivateRoom, setPrivateGroupMsg, setPrivateMemberMsg, setRole, joinRoom, setCurrentRoom])

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
        socket.emit('get-members')
        socket.emit('groups',user?.data?.id_system)
        }
    },[user])
    //-----------------------------------//
  //GET ALL USER
    socket.off('get-members').on('get-members', (payload)=>{
        payload.forEach((member)=>{
            if(member?.id_system === user?.data?.id_system){
                setCurrentUser(member)
                dispatch(getCurrentUser(member))
            }
        })
        dispatch(getAllMembers(payload))
        setMembers(payload)
        setOriginalMembers(payload)
    })
 
    //GET ALL GROUP
    socket.off('groups').on("groups", (payload)=>{
        setGroups(payload)
        dispatch(getAllgroups(payload))
        setOriginalGroups(payload)
    })
    //SEARCH ROOM
    const handleSearchRoom = (e)=>{
        const { value } = e.target
        setKeyWord(value)
        let newMembers;

        newMembers = members.filter(member=>{
            return member?.id_system.toLowerCase().includes(value.toLowerCase())
        })

        const newGroups = groups.filter(group=>{
            return group?.name.toLowerCase().includes(value.toLowerCase())
        })

        if(currentUser.role === UserRules.ROLE.ADMIN){
             newMembers = members.filter(member=>{
                return member?.fullname.toLowerCase().includes(value.toLowerCase())
            })
        }

        if(value === ""){
            setMembers(originalMembers)
            setGroups(originalGroups)
        }else{
            setMembers(newMembers)
            setGroups(newGroups)
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
                    onChange={handleSearchRoom}
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
                membersInGroup={membersInGroup}
                setMembersInGroup={setMembersInGroup}
                setGroups_id={setGroups_id}
                setPrivateGroupMsg={setPrivateGroupMsg}
                setPrivateMemberMsg={setPrivateMemberMsg} 
                setRole={setRole}
                joinRoom={joinRoom}
                privateGroupMsg={privateGroupMsg}
                setNamePrivateRoom={setNamePrivateRoom}
                setCurrentRoom={setCurrentRoom}
                setMessageOnRoom={setMessageOnRoom}
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