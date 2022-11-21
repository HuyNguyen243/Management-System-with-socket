import React from 'react'
import { timeAgo } from '../../../commons/message.common';

const Messages = ({ messagesOnRoom, currentUser }) => {

    const showMessages = ()=>{
        if(messagesOnRoom?.length > 0){
        return messagesOnRoom.map((msg,index)=>{
            return(
            <div key={index}>
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
                                    <div className="chat_img my-mess" 
                                    role={message?.from?.split(".")[1]} 
                                    data-size="small"></div>
                                    <span className="message_time">
                                    {timeAgo(message?.time)}
                                    </span>
                                </>
                                :
                                <>
                                    <div className="chat_img your-mess" role={message?.from?.split(".")[1]} data-size="small"></div>
                                    <div className="message other-message ">
                                    <p>{message?.content}</p>
                                    </div>
                                    <span className="message_time">
                                    {timeAgo(message?.time)}
                                    </span>
                                </>
                                }
                            </div>
                            </li>
                    )
                    })
                }
            </div>
            )
        })
        }else{
            return <img src="images/btn_chat.svg" alt="" className="logo_chat"></img>
        }
    }

    return (
        <>
            {showMessages()}
        </>
    )
}

export default Messages