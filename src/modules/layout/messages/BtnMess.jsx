import React,{useState} from 'react'
import BoxChat from "../../../modules/manager/messages/BoxChat";

const BtnMess = () => {
    const [isOpen,setIsOpen] = useState(false)

  return (
      <>
        <div className="btn__messager" onClick={()=>setIsOpen(!isOpen)}>
                <div className="btn__mes"></div>
        </div>
        <BoxChat isOpen={isOpen} setIsOpen={setIsOpen}/>
      </>
  )
}

export default BtnMess