import React from 'react'
import { orderIds } from '../../../../commons/message.common';
import { NAME_ROOM } from '../../../../constants';
import { socket } from "../../../../_services/socket";
import { CharacterRoom } from '../../../../commons/message.common';
import { roomStorage } from '../../../../commons/message.common';
import { UserRules } from '../../../../constants';

const Members = ({ 
    members, 
    currentUser, 
    privateMemberMsg, 
    setPrivateMemberMsg, 
    setRole, 
    joinRoom, 
    currentRoom, 
    setPrivateGroupMsg, 
    setNamePrivateRoom,
}) => {

    const handlePrivateRoom = (member)=>{
        setPrivateMemberMsg(member?.id_system)
        setRole(member?.role)
        const roomId = orderIds(currentUser?.id_system, member?.id_system, NAME_ROOM.USER)
        joinRoom(roomId)
        setPrivateGroupMsg("")
        setNamePrivateRoom(CharacterRoom(member?.role))
        socket.emit("reset-notifications",roomId, currentUser?.id_system)

        //SAVESTORAGE
        roomStorage.set("", "", roomId, member?.role, [], CharacterRoom(member?.role), member?.id_system)
    }

  return (
    <>
        <li>
            <span className="title_members">Thành viên</span>
        </li>
        { 
            members?.map((member,index)=>(
                <div key={index}>
                {
                    members?.id_system !== currentUser?.id_system &&
                    <li className={privateMemberMsg === member.id_system ? "active" : ""} onClick={()=>handlePrivateRoom(member)}>
                    <div className="chat_img" data={member?.status} role={CharacterRoom(member.role)} ></div>
                    <div className="about">
                    <div className="name">{ currentUser?.role === UserRules.ROLE.ADMIN ? member?.fullname : member?.id_system}</div>
                        {
                        currentUser?.newMessages && Object?.keys(currentUser?.newMessages)?.map((room,index2)=>{
                            return(
                            <div key={index2}>
                                {
                                currentRoom !== room && orderIds(currentUser?.id_system, member?.id_system, NAME_ROOM.USER) === room &&
                                <span className="has_seen">{currentUser?.newMessages?.[room]}</span>
                                }
                            </div>
                            )
                        })
                        }
                    </div>
                    </li>
                }
                </div>
            ))
        }
    </>
  )
}

export default Members