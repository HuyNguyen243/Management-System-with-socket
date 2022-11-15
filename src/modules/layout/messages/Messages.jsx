import React,{useState} from 'react'
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import TextField from '@mui/material/TextField';

const Messages = ({isOpenMessages}) => {
    const [keyword,setKeyWord] = useState("")

     //GET MSG

    //------------------------------

  return (
    <div className={`notification-message__container ${!isOpenMessages && "hidden"}`}>
        <div className="notification-message__title">
            <h5>Tin nhắn</h5>
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
        </div>
        <div className="notification-message__block">
            <div className="notification-message__it">
                <AvatarGroup className="mb-3">
                    <Avatar image="images/default_avatar.jpeg" size="large" shape="circle" />
                    <Avatar image="images/default_avatar.jpeg" size="large" shape="circle" />
                </AvatarGroup>
                <div className="notification-message_item">
                    <p className="notification-message__name">12345.S.12345</p>
                    <div className="notification-message__i">
                        <p className="notification-message__note">Sale 123 đã đánh dấu hoàn thành công việc </p>
                        <label className="notification-message__alert" data-count="1"></label>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Messages