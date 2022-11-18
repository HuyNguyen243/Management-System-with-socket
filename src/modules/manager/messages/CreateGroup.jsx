import React, { useState, useEffect, useRef } from 'react'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { roleGroup } from '../../modal/dropDown';
import { useSelector, useDispatch } from 'react-redux';
import { dashboardEmployeeRequest } from '../../../redux/overviewEmployee/actionEmployee';
import { Chips } from 'primereact/chips';
import { ListBox } from 'primereact/listbox';
import { NAME_ROOM } from '../../../constants';
import { createGroupMsgRequest } from '../../../redux/messages/action';
import { Toast } from 'primereact/toast';
import { toastMsg } from '../../../commons/toast';

const CreateGroup = ({isOpenCreateGroup, setIsOpenCreateGroup, nameGroup , editDataGroup}) => {
    const dispatch = useDispatch()
    const employees = useSelector(state => state.employee.dashboard)
    const createGroup = useSelector(state => state.message.createGroupMsg)
    const user = useSelector(state=> state.auth.user)
    const [userRole,setUserRole] = useState({})
    const [members,setMembers] = useState([])
    const [name,setName] = useState("")
    const [errors,setErrors] = useState("")
    const toast = useRef(null);

    useEffect(()=>{
        if(Object.keys(editDataGroup).length > 0){
            setMembers(editDataGroup?.membersInGroup)
            setName(editDataGroup?.currentRoom)
            setUserRole(roleGroup[0])
        }
    },[editDataGroup])

    useEffect(() => {
        if(createGroup?.data){
            toastMsg.success(toast,'Tạo group thành công')
            setIsOpenCreateGroup(false)
            setUserRole({})
            setMembers([user?.data?.id_system])
            setName("")
        }

        if(createGroup?.error){
            toastMsg.error(toast,'Tạo group thất bại, xin vui lòng thử lại.')
        }
    },[createGroup, setIsOpenCreateGroup, user])

    useEffect(() => {
        if(user?.data){
            setMembers([user?.data?.id_system])
        }
    },[user])

    useEffect(() => {
        if(Object.keys(userRole).length > 0){
            const filter = `?keyword=${userRole?.code}`
            dispatch(dashboardEmployeeRequest(filter))
        }
    },[dispatch, userRole])

    const renderFooter = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <span className="warning" style={{fontSize:"12px"}}>{errors}</span>
                <div>
                    <Button label="Hủy bỏ" icon="pi pi-times" onClick={handleCloseModal} className="p-button-text" />
                    <Button label={nameGroup === NAME_ROOM.CREATE ? "Đồng ý" : "Cập nhật"}  onClick={handleSubmit} autoFocus />
                </div>
            </div>
        );
    }

    const checkHaveSelectRole = ()=>{
        if(Object.keys(userRole).length > 0 && employees?.data && employees?.data.length > 0){
            return true;
        }else{
            return false;
        }
    }

    const handleSetmembers = (e)=>{
        const { value } = e
        if(!members.includes(value)){
            setMembers([...members,value])
        }else{
            const arr = members.filter(item=>{
                return item !== value

            })
            setMembers(arr)
        }
    }

    const handleCloseModal = ()=>{
        setIsOpenCreateGroup(false)
        setUserRole({})
        setMembers([user?.data?.id_system])
        setName("")
    }

    const membersTemplate = (option) => {
        return (
            <div className={`members-item ${members.includes(option?.id_system) && "active"} `}>
                <div>{option.fullname}</div>
            </div>
        );
    }

    const handleRemove = (e)=>{
        const { value } = e
        const newValue = value[0] !== user?.data?.id_system ? value[0] : ""
        const arr = members.filter(item=>{
            return  item !== newValue
        })
        setMembers(arr)
    }

    const handleSubmit =()=>{
        let flag = true
        const regexName = name.replace(/[^\w\s]/gi, '')

        if(name === ""){
            setErrors("Tên group không được để trống.")
            flag = false;
        }else if(regexName.length < 6){
            setErrors("Tên group trên 6 ký tự và không được chưa ký tự đặt biệt.")
            flag = false;
        }

        if(Object.keys(userRole).length === 0){
            flag = false;
            setErrors("Vui lòng chọn chức vụ")
        }

        if(members.length < 1){
            flag = false;
            setErrors("Vui lòng thêm thành viên vào group")
        }


        if(flag){
            const regexName = name.replace(/[^\w\s]/gi, '')
            const data = {
                name: regexName,
                type: NAME_ROOM.GROUP,
                members: members,
                create_by: user?.data?.id_system
            }
            if(nameGroup === NAME_ROOM.CREATE){
                dispatch(createGroupMsgRequest(data))
            }else{

            }
        }

    }
    return (
        <>
            <Toast ref={toast} position="bottom-left"/>
            <Dialog 
                header={nameGroup === NAME_ROOM.CREATE ? "Tạo nhóm:" : "Sửa nhóm:" }
                visible={isOpenCreateGroup} 
                onHide={handleCloseModal} 
                breakpoints={{'960px': '75vw'}} 
                style={{width: '50vw'}} 
                footer={renderFooter('displayResponsive')}
            >
                <form className="grid">
                    <div className="field col-12 md:col-12">
                        <span htmlFor="autocomplete">
                            Tên group:
                        <span className="warning">*</span>
                        </span>
                            <InputText 
                            className="group__name"
                            placeholder="Nhập tên group"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            />
                    </div>
                    {
                        Object.keys(userRole).length > 0 &&
                        <div className="field col-12 md:col-12">
                            <span htmlFor="autocomplete">Thành viên trong group: <span className="warning">*</span></span>
                            <Chips value={members} style={{width: '100%'}} onRemove={handleRemove}></Chips>
                        </div>
                    }
                    <div className="field col-12 md:col-12 ">
                        <span htmlFor="autocomplete">Chức vụ : <span className="warning">*</span></span>
                        <Dropdown optionLabel="name" value={userRole} options={roleGroup} 
                        onChange={(e) =>{setUserRole(e.value)}} 
                        placeholder="Chọn chức vụ"/>
                    </div>
                    {
                        checkHaveSelectRole() &&
                        <div className="field col-12 md:col-12 ">
                            <span htmlFor="autocomplete">Thành viên : <span className="warning">*</span></span>
                            <ListBox value={members} 
                                options={employees?.data} 
                                onChange={handleSetmembers} 
                                optionLabel="fullname" 
                                optionValue="id_system"
                                filter className="member__search"
                                itemTemplate={membersTemplate}
                            />
                        </div>
                    }
                </form>
            </Dialog>
        </>
    )
}

export default CreateGroup