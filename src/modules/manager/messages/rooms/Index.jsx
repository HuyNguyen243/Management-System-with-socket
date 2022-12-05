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
    const [groupsAfterSort, setGroupsAfterSort] = useState([])
    const [membersAfterSort, setMembersAfterSort] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const MsgsByIdSystem = useSelector(state=> state.message.messagesByIdSystem)

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
            socket.emit('get-members',user?.data?.role)
            socket.emit('groups',user?.data?.id_system)
        }
    },[user])
    //-----------------------------------//

  //GET ALL USER
    socket.off('get-members').on('get-members', (payload)=>{
        payload?.forEach((member)=>{
            if(member?.id_system === user?.data?.id_system){
                setCurrentUser(member)
                dispatch(getCurrentUser(member))
            }
        })
        
        let result;
        if(user?.data?.role === UserRules.ROLE.EDITOR || user?.data?.role === UserRules.ROLE.LEADER_EDITOR){
           result = payload.filter(member=>{ return member?.role === UserRules.ROLE.SALER ||  member?.role === UserRules.ROLE.ADMIN })
        }else{
            result = payload
        }
        
        dispatch(getAllMembers(result))
        setMembers(result)
        setOriginalMembers(result)
    })   

    const SORTMEMBERS = React.useCallback(()=>{
        let result = []
        //SORT MEMBERS
        if(MsgsByIdSystem){
            let fn = []
            const arrTime = []
            const arrMembersByMsgs = []
            MsgsByIdSystem?.forEach((msg)=>{
               if(msg.type === NAME_ROOM.USER){
                    const receiver = msg?.members.filter(member=> { return member !== currentUser?.id_system })
                    let newDate = new Date(msg?.time);
                    newDate = newDate?.setHours(newDate.getHours() - 7);
                    arrTime.push({[receiver[0]]: newDate})
                    arrMembersByMsgs.push(receiver[0])
               }
            })

            const membersHaveMsg = []
            members?.forEach((member)=>{
                if(member?.id_system !== currentUser?.id_system){
                    if(arrMembersByMsgs?.includes(member?.id_system)){
                        membersHaveMsg?.push(member)
                    }else{
                        fn.push(member)
                    }
                }
            })

            const membersHaveTime = []
            for(let i = 0; i < membersHaveMsg.length; i++){
                const { id_system } = membersHaveMsg[i]
                const member = membersHaveMsg[i]
                let a = {}
                for(let j = 0; j < arrTime.length; j++){
                    if(Object?.keys(arrTime[j])?.[0] === id_system){
                        a = Object.assign({},member,{
                            time : arrTime[j][id_system]
                        })
                    }
                }
                membersHaveTime.push(a)
            }
            const sort = membersHaveTime?.sort((a,b)=>{
                return a?.time > b?.time ? -1 : 1
            })

            fn.unshift(...sort)

            result = fn
        }else{
            result = members
        }
        return result
    },[MsgsByIdSystem,currentUser,members])

    useEffect(() => {
        const result = SORTMEMBERS()
        setMembersAfterSort(result)
    },[SORTMEMBERS, setMembersAfterSort])
    // GET ALL GROUP
    socket.off('groups').on("groups", (payload)=>{
        setGroups(payload)
        dispatch(getAllgroups(payload))
        setOriginalGroups(payload)
    })

    const SORTGROUPS = React.useCallback(()=>{
        let result = []
        //SORT MEMBERS
        if(MsgsByIdSystem){
            const fn = []
            const arrGroupsByMsgs = []
            const arrTime = []

            MsgsByIdSystem?.forEach((msg)=>{
               if(msg.type === NAME_ROOM.GROUP){
                    let newDate = new Date(msg?.time);
                    newDate = newDate?.setHours(newDate.getHours() - 7);
                    arrTime.push({[msg?._id]: newDate})
                    arrGroupsByMsgs.push(msg?._id)
               }
            })

            const groupsHaveMsg = []
            groups?.forEach((group)=>{
                if(arrGroupsByMsgs?.includes(NAME_ROOM.GROUP + '-' + group?._id)){
                    groupsHaveMsg?.push(group)
                }else{
                    fn.push(group)
                }
            })

            const groupsHaveTime = []
            for(let i = 0; i < groupsHaveMsg.length; i++){
                const group = groupsHaveMsg[i]
                let a = {}
                for(let j = 0; j < arrTime.length; j++){
                    if(Object?.keys(arrTime[j])?.[0] === NAME_ROOM.GROUP + '-' + group?._id){
                        a = Object.assign({},group,{
                            time : arrTime[j][NAME_ROOM.GROUP + '-' + group?._id]
                        })
                    }
                }
                groupsHaveTime.push(a)
            }

            const sort = groupsHaveTime?.sort((a,b)=>{
                return a?.time > b?.time ? -1 : 1
            })
            fn.unshift(...sort)
            result = fn
        }else{
            result = groups
        }
        return result
    },[MsgsByIdSystem,groups])

    useEffect(() => {
        const result = SORTGROUPS()
        setGroupsAfterSort(result)
    },[SORTGROUPS, setGroupsAfterSort])

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

    const handleOpenMembersBlock = ()=>{
        setIsOpen(true)
    }

    return (
        <div className={`people-list ${isOpen && "active"}`} id="people-list" onClick={handleOpenMembersBlock}>
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
                <div className="chat_img avatar_me" data={user?.data?.status} role={CharacterRoom(currentUser?.role)}></div>
            </div>
        </div>
        <ul className="list">
            <Groups 
                groups={groupsAfterSort}
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
                members={membersAfterSort} 
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