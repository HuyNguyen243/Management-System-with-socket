import React,{ useState, useRef, useEffect } from 'react';
import Index from './rooms/Index';
import { socket } from "../../../_services/socket";
import { getFormattedDate } from '../../../commons/message.common';
import { NAME_ROOM } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpenChat } from '../../../redux/messages/messageSlice';
// import { storage } from '../../../_services/sesionStorage';
// import { ROOM_SESSION_MESSAGES } from '../../../constants';
import Modal from "./Modal";
import { UserRules } from '../../../constants';
import Messages from './Messages';

const BoxChat = () => {
    const [members, setMembers] = useState([])
    const [membersInGroup, setMembersInGroup] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [messages, setMessages] = useState("")
    const [groups,setGroups] = useState([])
    const [groups_id,setGroups_id] = useState("")
    const [currentRoom, setCurrentRoom] = useState(undefined)
    const [namePrivateRoom, setNamePrivateRoom] = useState("")
    const [messagesOnRoom, setMessageOnRoom] = useState([])
    const [privateMemberMsg, setPrivateMemberMsg] = useState("")
    const [privateGroupMsg, setPrivateGroupMsg] = useState("")
    const [role, setRole] = useState("")
    const messageEndRef = useRef(null);
    const dispatch = useDispatch()
    const isOpenChat = useSelector(state=>state.message.isOpenChat)
    const [isOpenCreateGroup, setIsOpenCreateGroup] = useState(false);
    const [nameModal, setNameModal] = useState("");
    const [editDataGroup, setEditDataGroup] = useState({});
    const user = useSelector(state=> state.auth.user)

    //scroll bottom
    useEffect(() => {
        scrollToBottom();
    }, [messagesOnRoom]);
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    //------------------------------
    //join room
    const joinRoom = React.useCallback((room) => {
        socket.emit("join-room", room)
        setCurrentRoom(room)
    },[ setCurrentRoom])

    // GET NOTIFICATION 
    socket.off('notifications').on('notifications',(room, receiver)=>{
        if(room !== currentRoom){
            if(room.includes(NAME_ROOM.USER)){
                socket.emit("new-notifications",room, receiver)
            }else if(room.includes(NAME_ROOM.GROUP)){
                for(const group of groups){
                    if(room === group?.type + "-" + group?._id){
                        socket.emit("new-notifications",room, currentUser?.id_system)
                        break
                    }
                }
            }
        }
    })

    //------------------------------
    //GET MSG
    socket.off('room-messages').on('room-messages', (payload)=>{
        if(payload.length === 0){
            setMessageOnRoom([])
        }else{
            if(payload?.[0]?._id?.room === currentRoom){
                setMessageOnRoom(payload)
            }
        }
    })
    //------------------------------
    //SUBMIT MESSAGE
    const handleSubmit = (e)=>{
        e?.preventDefault()
        if(messages !== ""){
            const time = new Date().getTime()
            const nameRoom = currentRoom
            const toDayDate = getFormattedDate()
            let allmembers;
            let type ;
            if(nameRoom?.includes(NAME_ROOM.USER)){
                allmembers = [privateMemberMsg, currentUser?.id_system]
                type = NAME_ROOM.USER;
            }else{
                allmembers = membersInGroup
                type = NAME_ROOM.GROUP;
            }
            socket.emit('message-room', nameRoom, messages, currentUser?.id_system, time, toDayDate, allmembers, type, groups_id, privateMemberMsg)
            setMessages("")
        }
    }

    //PRESS ENTER TO SUBMIT
    useEffect(() => {
        const submitForm= (event)=>{
        const btn = document.querySelector(".btn__sendChat")
        if(btn !== null && event.key === "Enter"){
            event.preventDefault();
            handleSubmit()
        }
        }
        window.addEventListener("keypress",submitForm)
        return ()=>{
        window.removeEventListener('keypress',submitForm)
        }
    })
    //------------------------------

    const handlecloseChat = ()=>{
        dispatch(setIsOpenChat(false))
        setCurrentRoom(undefined)
        setRole("")
        setPrivateMemberMsg("")
        setMessageOnRoom([])
    }

    const handleEditGroup =()=>{
        setIsOpenCreateGroup(true)
        setNameModal(NAME_ROOM.EDIT)
        const data = {
            name : namePrivateRoom,
            members: membersInGroup,
            group_id: groups_id
        }
        setEditDataGroup(data)
    }

  return (
    <div className={`chat-container page ${!isOpenChat && "hidden"}`}>
        {
            user?.data?.role === UserRules.ROLE.ADMIN &&
            <>
                <div className="chat__createGroup" 
                onClick={()=>{ setNameModal(NAME_ROOM.CREATE);setIsOpenCreateGroup(!isOpenCreateGroup);setEditDataGroup({})} } 
                ></div>
                <Modal 
                    isOpenCreateGroup={isOpenCreateGroup} 
                    setIsOpenCreateGroup={setIsOpenCreateGroup} 
                    nameModal={nameModal}
                    editDataGroup={editDataGroup}
                    setEditDataGroup={setEditDataGroup}
                    setMembersInGroup={setMembersInGroup}
                />
            </>
        }
        <Index 
            members={members} 
            setCurrentUser={setCurrentUser} 
            setMembers={setMembers} 
            currentUser={currentUser} 
            currentRoom={currentRoom}
            setCurrentRoom={setCurrentRoom}
            setMessageOnRoom={setMessageOnRoom}
            privateMemberMsg={privateMemberMsg}
            setPrivateMemberMsg={setPrivateMemberMsg}
            privateGroupMsg={privateGroupMsg}
            setPrivateGroupMsg={setPrivateGroupMsg}
            setRole={setRole}
            joinRoom={joinRoom}
            setGroups={setGroups}
            groups={groups}
            setMembersInGroup={setMembersInGroup}
            setGroups_id={setGroups_id}
            setNamePrivateRoom={setNamePrivateRoom}
        />
    <div className="chat">
        <div className="chat-header ">
            <div className="chat__close" onClick={handlecloseChat}></div>
            {
                namePrivateRoom &&  <div className="chat_img" role={namePrivateRoom.charAt(0) + namePrivateRoom.charAt(1)} ></div>
            }
            <span className="id__me">{currentUser?.id_system}</span>
            <div className="chat-about">
            <div className="chat-with">{privateMemberMsg || namePrivateRoom}</div>
            <div className="chat-num-messages">{role}</div>
            {
                user?.data?.role === UserRules.ROLE.ADMIN && currentRoom && currentRoom?.includes(NAME_ROOM.GROUP) &&
                <img src="images/edit_group.svg" alt="" className="edit__group" onClick={handleEditGroup}/>
            }
            </div>
        </div> 
        {/* end chat-header */}
        <div className={`chat-history relative`}>
            <ul>
                <Messages messagesOnRoom={messagesOnRoom}  currentUser={currentUser}/>
            </ul>
            <div ref={messageEndRef} />
        </div> 
        {/* end chat-history */}
            <form className="chat-message clearfix" onSubmit={handleSubmit}>
                <div className="chat__file">
                    <input type="file" className="hidden" id="file_chat"/>
                    <label htmlFor="file_chat"></label>
                </div>
                <textarea name="message-to-send" id="message-to-send" 
                placeholder="Type your message" rows={1} value={messages} onChange={(e)=>setMessages(e.target.value)}
                />
                <button className={`${isOpenChat && "btn__sendChat"} ""`}>
                    <img src="images/send.svg" alt=""/>
                </button>
            </form>
        </div>
      </div>
  )
}

export default BoxChat