import React, { useRef } from 'react'
import { NAME_ROOM } from '../../../../constants';
import { socket } from "../../../../_services/socket";
import { Toast } from 'primereact/toast';
import { toastMsg } from '../../../../commons/toast';

const Groups = ({ 
    groups, currentUser, currentRoom, 
    setMembersInGroup , setGroups_id, 
    setPrivateGroupMsg, setPrivateMemberMsg, setRole, 
    joinRoom, privateGroupMsg, setNamePrivateRoom }) => {
    const toast = useRef(null);

    const handlePrivateGroup = (group)=>{
        const id_Group = NAME_ROOM.GROUP + "-" + group._id
        setGroups_id(group._id)
        setPrivateGroupMsg(id_Group)
        setPrivateMemberMsg("")
        setRole(NAME_ROOM.GROUP)
        joinRoom(id_Group)
        setMembersInGroup(group?.members)
        setNamePrivateRoom(group.name)
        socket.emit("reset-notifications",id_Group, currentUser?.id_system)
    }

    socket.off("isCreated").on("isCreated", (payload)=>{
        if(payload){
            socket.emit('groups',currentUser?.id_system)
        }
    })

    socket.off("isEdit").on("isEdit", (payload)=>{
        if(payload?.isEdit){
            socket.emit('groups',currentUser?.id_system)
            if(payload?.members.includes(currentUser?.id_system)){
                toastMsg.warn(toast,`Bạn đã rời khỏi nhóm ${payload?.nameRoom}.`)
            }
        }
        if(currentRoom === payload?.room){
            setNamePrivateRoom(payload?.nameRoom)
        }
    })

    const showGroups = ()=>{
        return groups?.map((group,index)=>(
        <div key={index}>
            <li onClick={()=>handlePrivateGroup(group)} className={privateGroupMsg === NAME_ROOM.GROUP + "-" + group._id ? "active" : ""}>
                <div className="chat_img"  role={group.name.slice(0,2)} ></div>
                <div className="about">
                <div className="name">{group?.name}</div>
                    {
                    currentUser?.newMessages && Object?.keys(currentUser?.newMessages)?.map((room,index2)=>{
                        return(
                        <div key={index2}>
                            {
                                currentRoom !== room && room === NAME_ROOM.GROUP + "-" + group._id &&
                                <span className="has_seen">{currentUser?.newMessages?.[room]}</span>
                            } 
                        </div>
                        )
                    })
                    }
                </div>
            </li>
        </div>
    ))
    }

    return (
        <>
        <Toast ref={toast} position="bottom-left"/>
        {
            groups?.length > 0 &&
            <li>
                <span className="title_members">Nhóm</span>
            </li>
        }
        {showGroups()}
        </>
    )
}

export default Groups