import React,{useState} from 'react'
import { timeAgo } from '../../../commons/message.common';
import { Image } from 'primereact/image';

const Messages = ({ messagesOnRoom, currentUser }) => {
    const URL = process.env.REACT_APP_API || process.env.REACT_APP_DEV_API
    const [currentTime,setCurrentTime] = useState(null)

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
                            <div className={`msg__by--user flex ${checkUserSend ? "justify-content-end" : "justify-content-start"}`} onClick={()=>setCurrentTime(message?._id)}>
                                {
                                checkUserSend 
                                ?
                                <>
                                    <div className="message my-message align-items-end ">
                                    <p>{message?.content}</p>
                                    <div className="grid  justify-content-end">
                                        {
                                            message?.images?.length > 0 &&
                                            message?.images.map((image,index3)=>{
                                                return (
                                                    <Image src={`${URL}${image}`} preview alt="Image" className="chat__image col-4 md:col-4 p-1 mb-1" key={index3} />
                                                )
                                            })
                                        }
                                    </div>
                                    </div>
                                    <div className="chat_img my-mess" 
                                    role={message?.from?.split(".")[1]} 
                                    data-size="small"></div>
                                    <span className={`message_time ${currentTime === message?._id && "opacity-100 transition-ease-in transition-duration-300"}`}>
                                    {timeAgo(message?.time)}
                                    </span>
                                </>
                                :
                                <>
                                    <div className="chat_img your-mess" role={message?.from?.split(".")[1]} data-size="small"></div>
                                    <div className="message other-message align-items-start">
                                    <p>{message?.content}</p>
                                    <div className="grid  justify-content-start">
                                        {
                                            message?.images?.length > 0 &&
                                            message?.images.map((image,index3)=>{
                                                return (
                                                    <Image src={`${URL}${image}`} preview alt="Image" className="chat__image col-4 md:col-4 p-1 mb-1" key={index3} />
                                                )
                                            })
                                        }
                                    </div>
                                    </div>
                                    <span className={`message_time ${currentTime === message?._id && "opacity-100 transition-ease-in transition-duration-300"}`}>
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