import React,{ useState } from 'react';
import Members from './Members';
import { Avatar } from 'primereact/avatar';
import { socket } from "../../../_services/socket";
import { getFormattedDate } from '../../../commons/message.common';
import {addNotifications, resetNotifications } from "../../../redux/auth/authSlice"
import { useDispatch } from "react-redux"

const BoxChat = ({isOpen, setIsOpen}) => {
  const dispatch = useDispatch()
  const [members, setMembers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [currentRoom, setCurrentRoom] = useState({})
  const [messages, setMessages] = useState("")
  const [messagesOnRoom, setMessageOnRoom] = useState([])
  const [privateMemberMsg, setPrivateMemberMsg] = useState("")
  const [role, setRole] = useState("")

  const joinRoom = React.useCallback((room) => {
      socket.emit("join-room", room)
      setCurrentRoom(room)
      dispatch(resetNotifications(room))
  },[dispatch, setCurrentRoom])

  socket.off('notifications').on('notifications',(room)=>{
      dispatch(addNotifications(room))
  })

  socket.off('room-messages').on('room-messages', (payload)=>{
    setMessageOnRoom(payload)
  })

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(messages !== ""){
      const today = new Date()
      const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()
      const hour = today.getHours() + ":" + minutes
      const roomId = currentRoom
      const toDayDate = getFormattedDate()
      socket.emit('message-room', roomId, messages, currentUser?.id_system, hour, toDayDate)
      setMessages("")
    }
  }

  const showMessages = ()=>{
    if(messagesOnRoom?.length > 0){
      return messagesOnRoom.map((msg,index)=>{
        return(
          <div key={index}>
            {
              msg?._id?.room === currentRoom &&
              <>
              <div className="message-data align-right">
                <p className="message-data-time">{msg?._id?.date}</p>
              </div>
              {
                msg.messagesByDate.map((message,index2)=>{
                  const checkUserSend = message?.from === currentUser?.id_system ? true : false
                  return (
                    <li className={`relative ${checkUserSend && "clearfix"}`} key={index2}>
                    {/* <p className="message-data-alert">Editor đã hoàn thành job 23454.S34568</p> */}
                      <div className={`msg__by--user flex ${checkUserSend ? "justify-content-end" : "justify-content-start"}`}>
                        {
                          checkUserSend 
                          ?
                          <>
                            <div className="message my-message ">
                              <p>{message?.content}</p>
                            </div>
                            <Avatar image="images/default_avatar.jpeg" size="small" shape="circle" className="my-mess"/>
                            <span className="message_time">
                              {message?.time}
                            </span>
                          </>
                          :
                          <>
                            <Avatar image="images/default_avatar.jpeg" size="small" shape="circle" className="your-mess"/>
                            <div className="message other-message ">
                              <p>{message?.content}</p>
                            </div>
                            <span className="message_time">
                              {message?.time}
                            </span>
                          </>
                        }
                      </div>
                    </li>
                  )
                })
              }
              </>
            }
            
          </div>
        )
      })
    }
  }
 
  return (
    <div className={`chat-container page ${!isOpen && "hidden"}`}>
      <Members 
        members={members} 
        setCurrentUser={setCurrentUser} 
        setMembers={setMembers} 
        currentUser={currentUser} 
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
        setMessageOnRoom={setMessageOnRoom}
        privateMemberMsg={privateMemberMsg}
        setPrivateMemberMsg={setPrivateMemberMsg}
        setRole={setRole}
        joinRoom={joinRoom}
      />

    <div className="chat">
      <div className="chat-header ">
        <div className="chat__close" onClick={()=>setIsOpen(false)}></div>
        <Avatar image="images/default_avatar.jpeg" size="large" shape="circle" data="ONLINE" className="chat_img"/>
        <div className="chat-about">
          <div className="chat-with">{privateMemberMsg}</div>
          <div className="chat-num-messages">{role}</div>
        </div>
      </div> {/* end chat-header */}
      <div className="chat-history">
        <ul>
          {showMessages()}
        </ul>
      </div> {/* end chat-history */}
        <form className="chat-message clearfix" onSubmit={handleSubmit}>
          <div className="chat__file">
              <input type="file" className="hidden" id="file_chat"/>
              <label htmlFor="file_chat"></label>
          </div>
          <textarea name="message-to-send" id="message-to-send" 
          placeholder="Type your message" rows={1} value={messages} onChange={(e)=>setMessages(e.target.value)}
          />
          <button>
            <img src="images/send.svg" alt=""/>
          </button>
        </form>
      </div>
      </div>
  )
}

export default BoxChat