import React,{useState} from 'react'
import BoxChat from "../../../modules/manager/messages/BoxChat";
import { useLocation } from 'react-router';

const BtnMess = () => {
    const location = useLocation()
    const { pathname } = location
    const [isOpen,setIsOpen] = useState(false)

    const arrpath = ["/login", "/forgot-password"]
    
  return (
      <div className={ `chat_block ${arrpath.includes(pathname) && "hidden"}`}>
        <div className="btn__messager" onClick={()=>setIsOpen(!isOpen)}>
                <div className="btn__mes"></div>
        </div>
        <BoxChat isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
  )
}

export default BtnMess