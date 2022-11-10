import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import { Avatar } from 'primereact/avatar';

const Members = () => {
  const [keyword,setKeyWord] = useState("")

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
          <Avatar image="images/default_avatar.jpeg" size="normal" shape="circle" data="ONLINE" className="chat_img avatar_me"/>
      </div>
      <ul className="list">
        <li className="active">
          <Avatar image="images/default_avatar.jpeg" size="large" shape="circle" data="ONLINE" className="chat_img"/>
          <div className="about">
            <div className="name">Aiden Chavez</div>
            <div className="status">
               left 7 mins ago
            </div>
            <span className="has_seen">!</span>
          </div>
        </li>
        <li >
          <Avatar image="images/default_avatar.jpeg" size="large" shape="circle" data="ONLINE" className="chat_img"/>
          <div className="about">
            <div className="name">Mike Thomas</div>
            <div className="status">
               online
            </div>
          </div>
        </li>
        <li >
          <Avatar image="images/default_avatar.jpeg" size="large" shape="circle" data="LEAVING" className="chat_img"/>
          <div className="about">
            <div className="name">Erica Hughes</div>
            <div className="status">
               online
            </div>
          </div>
        </li>
        <li >
          <Avatar image="images/default_avatar.jpeg" size="large" shape="circle" data="LEAVING" className="chat_img"/>
          <div className="about">
            <div className="name">Ginger Johnston</div>
            <div className="status">
               online
            </div>
          </div>
        </li>
        <li >
          <Avatar image="images/default_avatar.jpeg" size="large" shape="circle" data="OFFLINE" className="chat_img"/>
          <div className="about">
            <div className="name">Tracy Carpenter</div>
            <div className="status">
               left 30 mins ago
            </div>
          </div>
        </li>
        <li >
          <Avatar image="images/default_avatar.jpeg" size="large" shape="circle" data="OFFLINE" className="chat_img"/>
          <div className="about">
            <div className="name">Christian Kelly</div>
            <div className="status">
               left 10 hours ago
            </div>
          </div>
        </li>
        <li >
          <Avatar image="images/default_avatar.jpeg" size="large" shape="circle" data="OFFLINE" className="chat_img"/>
          <div className="about">
            <div className="name">Monica Ward</div>
            <div className="status">
               online
            </div>
          </div>
        </li>
        <li >
          <Avatar image="images/default_avatar.jpeg" size="large" shape="circle" data="OFFLINE" className="chat_img"/>
          <div className="about">
            <div className="name">Dean Henry</div>
            <div className="status">
               offline since Oct 28
            </div>
          </div>
        </li>
        <li >
          <Avatar image="images/default_avatar.jpeg" size="large" shape="circle" data="OFFLINE" className="chat_img"/>
          <div className="about">
            <div className="name">Peyton Mckinney</div>
            <div className="status">
             online
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Members