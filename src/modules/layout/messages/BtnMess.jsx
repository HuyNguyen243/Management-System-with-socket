import React,{useState} from 'react'
import BoxChat from "../../../modules/manager/messages/BoxChat";
import { setIsOpenChat } from '../../../redux/messages/messageSlice';
import { useDispatch, useSelector } from 'react-redux';

const BtnMess = () => {
    const [isOpen,setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const isOpenChat = useSelector(state=>state.message.isOpenChat)
    const handleOpenMessages =()=>{
      setIsOpen(!isOpen)
      dispatch(setIsOpenChat(!isOpenChat))
    }

  return (
      <div className="messsager__container">
        <div className="btn__messager" onClick={handleOpenMessages}>
                <div className="btn__mes"></div>
        </div>
        <BoxChat/>
      </div>
  )
}

export default BtnMess