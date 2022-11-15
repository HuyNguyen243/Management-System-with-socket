import React,{ useState, useRef, useEffect } from 'react';
import Members from './Members';
import { socket } from "../../../_services/socket";
import { getFormattedDate } from '../../../commons/message.common';
import {addNotifications, resetNotifications } from "../../../redux/auth/authSlice"
import { useDispatch } from "react-redux"

const BoxChat = ({isOpen, setIsOpen}) => {
  const dispatch = useDispatch()
  const [members, setMembers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [currentRoom, setCurrentRoom] = useState(undefined)
  const [messages, setMessages] = useState("")
  const [messagesOnRoom, setMessageOnRoom] = useState([])
  const [privateMemberMsg, setPrivateMemberMsg] = useState("")
  const [role, setRole] = useState("")
  const messageEndRef = useRef(null);

  useEffect(() => {
      scrollToBottom();
  }, [messagesOnRoom]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const joinRoom = React.useCallback((room) => {
      socket.emit("join-room", room)
      setCurrentRoom(room)
      dispatch(resetNotifications(room))
  },[dispatch, setCurrentRoom])

  socket.off('notifications').on('notifications',(room)=>{
      if(room !== currentRoom){
        dispatch(addNotifications(room))
      }
  })

  socket.off('room-messages').on('room-messages', (payload)=>{
    setMessageOnRoom(payload)
  })

  const handleSubmit = (e)=>{
    e?.preventDefault()
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
                            <div className="chat_img my-mess" role={privateMemberMsg?.split(".")[1]} data-size="small"></div>
                            <span className="message_time">
                              {message?.time}
                            </span>
                          </>
                          :
                          <>
                            <div className="chat_img your-mess" role={privateMemberMsg?.split(".")[1]} data-size="small"></div>
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
              <div ref={messageEndRef} />
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
        <div className="chat_img" data="ONLINE" role={privateMemberMsg?.split(".")[1]} ></div>
        {currentUser?.id_system && <span className="id__me">{currentUser?.id_system}</span>}
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
          <button className={`${isOpen && "btn__sendChat"} ""`}>
            <img src="images/send.svg" alt=""/>
          </button>
        </form>
      </div>
      </div>
  )
}

export default BoxChat