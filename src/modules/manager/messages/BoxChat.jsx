import React from 'react';
import Members from './Members';
import { Avatar } from 'primereact/avatar';

const BoxChat = ({isOpen, setIsOpen}) => {
  return (
    <div className={`chat-container page ${!isOpen && "hidden"}`}>
      <Members />
    <div className="chat">
      <div className="chat-header ">
        <div className="chat__close" onClick={()=>setIsOpen(false)}></div>
        <Avatar image="images/default_avatar.jpeg" size="large" shape="circle" data="ONLINE" className="chat_img"/>
        <div className="chat-about">
          <div className="chat-with">12345.S.12345</div>
          <div className="chat-num-messages">Saler</div>
        </div>
      </div> {/* end chat-header */}
      <div className="chat-history">
        <ul>
          <li className="clearfix">
            <div className="message-data align-right">
              <p className="message-data-time">10:10 AM, Today</p>
            </div>
            <div className="flex justify-content-start">
              <Avatar image="images/default_avatar.jpeg" size="small" shape="circle" className="your-mess"/>
              <div className="message other-message">
                Hi Vincent, how are you? How is the project coming along?
              </div>
            </div>
          </li>
          <li>
            <p className="message-data-alert">Editor đã hoàn thành job 23454.S34568</p>
            <div className="flex justify-content-end">
              <div className="message my-message ">
                <p>Are we meeting today? Project has been already finished and I have results to show you.</p>
              </div>
              <Avatar image="images/default_avatar.jpeg" size="small" shape="circle" className="my-mess"/>
            </div>
          </li>
        </ul>
      </div> {/* end chat-history */}
        <form className="chat-message clearfix">
          <div className="chat__file">
              <input type="file" className="hidden" id="file_chat"/>
              <label htmlFor="file_chat"></label>
          </div>
          <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows={1} defaultValue={""} />
          <button>
            <img src="images/send.svg" alt=""/>
          </button>
        </form>
      </div>
      </div>
  )
}

export default BoxChat