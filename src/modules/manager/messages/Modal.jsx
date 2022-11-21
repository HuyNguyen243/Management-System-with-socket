import React, { useEffect, useRef } from 'react'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown, } from 'primereact/dropdown';
import { roleGroup } from '../../modal/dropDown';
import { useSelector, useDispatch } from 'react-redux';
import { dashboardEmployeeRequest } from '../../../redux/overviewEmployee/actionEmployee';
import { Chips } from 'primereact/chips';
import { ListBox } from 'primereact/listbox';
import { NAME_ROOM } from '../../../constants';
import { 
    createGroupMsgRequest,
    updateGroupMsgRequest,
 } from '../../../redux/messages/action';
import { Toast } from 'primereact/toast';
import { toastMsg } from '../../../commons/toast';
import { useForm, Controller } from "react-hook-form";

// import { storage } from '../../../_services/sesionStorage';
// import { ROOM_SESSION_MESSAGES } from '../../../constants';

const Modal = ({isOpenCreateGroup, setIsOpenCreateGroup, nameModal , editDataGroup, setEditDataGroup, setMembersInGroup}) => {
    const dispatch = useDispatch()
    const employees = useSelector(state => state.employee.dashboard)
    const createGroup = useSelector(state => state.message.createGroupMsg)
    const updateGroup = useSelector(state => state.message.updateGroupMsg)

    const user = useSelector(state=> state.auth.user)
    const toast = useRef(null);

    const { control, formState: { errors }, handleSubmit, reset, setValue, register, watch } = useForm();

    const dataWatch = watch()

    useEffect(() => {
        if(user?.data){
            setValue("members",[user?.data?.id_system])
        }
    },[user, setValue])

    const resetModal = React.useCallback(()=>{
        setIsOpenCreateGroup(false)
        setEditDataGroup({})
        reset({
            data: 'test'
          })
    },[setIsOpenCreateGroup, reset, setEditDataGroup])

    useEffect(()=>{
        if(nameModal === NAME_ROOM.EDIT && Object.keys(editDataGroup)?.length > 0){
            setValue("name",editDataGroup?.name)
            setValue("members",editDataGroup?.members)
            setValue("role",roleGroup?.[0]?.code)
        }else{
            setValue("name","")
            setValue("members",[])
            setValue("role",{})
        }
    },[editDataGroup, setValue, nameModal])
    useEffect(() => {
        if(createGroup?.data){
            toastMsg.success(toast,'Tạo nhóm thành công')
            resetModal()
        }
    },[createGroup, setIsOpenCreateGroup, user, resetModal])
    
    useEffect(() => {
        if(updateGroup?.data){
            toastMsg.success(toast,'Cập nhật thành công.')
            resetModal()
        }
    },[updateGroup, setIsOpenCreateGroup, user, resetModal])

    const handleAddMember = (e)=>{
        const { value } = e
        if(!dataWatch?.members.includes(value)){
            setValue("members",[...dataWatch?.members,value])
        }else{
            const arr = dataWatch?.members.filter(item=>{
                return item !== value
            })
            setValue("members",arr)
        }
    }

    const handleRemoveMember = (e)=>{
        const { value } = e
        const newValue = value[0] !== user?.data?.id_system ? value[0] : ""
        const arr = dataWatch?.members.filter(item=>{
            return  item !== newValue
        })
        setValue("members",arr)
    }

    const changeRole = (e, field)=>{
        const { value } = e
        field.onChange(value)
        const filter = `?keyword=${value?.code}`
        dispatch(dashboardEmployeeRequest(filter))
    }

    const onSubmit = (data) => {
        const result = {
            name: data.name,
            members: data.members
        }
        if(nameModal === NAME_ROOM.CREATE){
            result.type  = NAME_ROOM.GROUP
            result.create_by  = user?.data?.id_system
            dispatch(createGroupMsgRequest(result))
        }else{ 
            const req = {
                data: result,
                id: editDataGroup?.group_id
            }
            setMembersInGroup(result.members)
            dispatch(updateGroupMsgRequest(req))
        }
    };

    const membersTemplate = (option) => {
        return (
            <div className={`members-item ${dataWatch?.members?.includes(option?.id_system) && "active"} `}>
                <div>{option.fullname} <span style={{fontSize:"12px"}}>( {option.id_system} )</span></div>
            </div>
        );
    }

    return (
        <>
            <Toast ref={toast} position="bottom-left"/>
            <Dialog 
                header={nameModal === NAME_ROOM.CREATE ? "Tạo nhóm:" : "Sửa nhóm:" }
                visible={isOpenCreateGroup} 
                onHide={()=>resetModal()} 
                breakpoints={{'960px': '75vw'}} 
                style={{width: '50vw'}} 
            >
                <form className="grid" onSubmit={handleSubmit(onSubmit)}>
                    <div className="field col-12 md:col-12">
                        <span htmlFor="autocomplete">
                            Tên group:
                        <span className="warning">*</span>
                        </span>
                            <InputText 
                            className="group__name"
                            placeholder="Nhập tên group"
                            {...register( "name", 
                            {   required: {value:true,message: "Tên không được để trống"}, 
                                maxLength: 55, 
                            })}
                            />
                            {
                        errors?.name &&  <span className="warning" style={{fontSize:"12px"}}>{errors?.name.message}</span>
                        }
                    </div>
                    <div className="field col-12 md:col-12">
                        <span htmlFor="autocomplete">Thành viên trong group: <span className="warning">*</span></span>
                        <Controller name="members"
                            control={control}
                            rules={{ required: true, message: "Thành viên không được để trống" }} render={({ field }) => (
                                <Chips 
                                    style={{width: '100%'}} 
                                    onRemove={handleRemoveMember} 
                                    value={field.value}
                                />
                        )} />
                    </div>
                    <div className="field col-12 md:col-12 ">
                        <span htmlFor="autocomplete">Chức vụ : <span className="warning">*</span></span>
                        <Controller name="role"
                            control={control}
                            rules={{ required: "Chức vụ không được để trống" }} render={({ field }) => (
                                <Dropdown
                                    options={roleGroup}
                                    optionLabel="name"
                                    value={field.value} onChange={(e) => changeRole(e, field)}
                                    placeholder="Chọn chức vụ"
                                />
                        )} />
                    </div>
                    {
                        errors?.role &&  <span className="warning" style={{fontSize:"12px"}}>{errors?.role.message}</span>
                    }
                    {
                        employees?.data &&
                        <div className="field col-12 md:col-12 ">
                            <span htmlFor="autocomplete">Thành viên : <span className="warning">*</span></span>
                            <ListBox 
                                options={employees?.data} 
                                onChange={handleAddMember} 
                                optionLabel="fullname" 
                                optionValue="id_system"
                                filter className="member__search"
                                itemTemplate={membersTemplate}
                            />
                        </div>
                    }
                    <div className="w-full">                      
                        <div className="flex justify-content-end align-items-center w-full">
                            <Button label={nameModal === NAME_ROOM.CREATE ? "Đồng ý" : "Cập nhật"}   />
                        </div>
                    </div>
                </form>
                <Button label="Hủy bỏ" icon="pi pi-times" onClick={()=>resetModal()} className="p-button-text btn__close" />
            </Dialog>
        </>
    )
}

export default Modal