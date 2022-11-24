import React,{ useState, useEffect, useRef } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import TablePersonalInfor from "./TablePersonalInfor";
import { useSelector } from "react-redux";
import { PHONE_REGEX } from '../../../constants';
import { useDispatch } from 'react-redux';
import {userEditProfile} from "../../../redux/auth/action"
import { Password } from 'primereact/password';
import { Calendar } from 'primereact/calendar';
import { storage } from '../../../_services/sesionStorage';
import { Toast } from 'primereact/toast';
import { toastMsg } from '../../../commons/toast';
import { formatDate } from '../../../commons/dateTime';

const PersonalInfor = () => {
    const dispatch = useDispatch()
    const user = useSelector(state=> state.auth.user)
    const editUser = useSelector(state=> state.auth.editUser)
    const [username,setUserName] = useState("")
    const [fullname,setFullname] = useState("")
    const [role,setRole] = useState("")
    const [phone,setPhone] = useState("")
    const [email,setEmail] = useState("")
    const [address,setAddress] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [avatar,setAvatar] = useState(null)
    const [nameBank,setNameBank] = useState("")
    const [numberAccountPayment,setNumberAccountPayment] = useState("")
    const [paymentMethod,setPaymentMethod] = useState("")
    const [branch,setBranch] = useState("")
    const [error,setError] = useState("")
    const [birth,setBirth] = useState(null)
    const [imagePreview,setImagePreview] = useState(null)
    const birthStorage = storage.get("birth")
    const toast = useRef(null);

    useEffect(() => {
        if(editUser?.data){
            setConfirmPassword("")
            setPassword("")
            toastMsg.success(toast,'Cập nhật thành công')
        }

        if(editUser?.error){
            toastMsg.error(toast,'Cập nhật thất bại')
        }
    },[setConfirmPassword, setPassword,editUser])

    const checkProfileChange = ()=>{
        let oldData = user?.data;

        const result = {
            address: address,
            avatar: avatar,
            births: birth,
            branch: branch,
            email: email,
            fullname: fullname,
            id_system: user?.data?.id_system,
            nameBank: nameBank,
            number_account_payment: numberAccountPayment,
            payment_method: paymentMethod,
            phone: phone,
            role: role,
            start_day: user?.data?.start_day,
            status : user?.data?.status,
            username: username
        }
 
        for(let item in result){
            if(result[item] !== oldData?.[item] && item !== "births"){
                return false
            }
            if(item === "births"){
                if(formatDate(new Date(oldData?.[item])) !== formatDate(birth)){
                    return false
                }
            }
        }
        return true
    }

    useEffect(()=>{
        if(user?.data){
            const { data } = user
            if(data?.username){
                setUserName(data?.fullname)
            }
            if(data?.fullname){
                setFullname(data?.username)
            }
            if(data?.role){
                setRole(data?.role)
            }
            if(data?.phone){
                setPhone(data?.phone)
            }
            if(data?.address){
                setAddress(data?.address)
            }
            if(data?.email){
                setEmail(data?.email)
            }
            if(data?.avatar){
                setAvatar(data?.avatar)
            }
            if(data?.nameBank){
                setNameBank(data?.nameBank)
            }
            if(data?.number_account_payment){
                setNumberAccountPayment(data?.number_account_payment)
            }
            if(data?.payment_method){
                setPaymentMethod(data?.payment_method)
            }
            if(data?.branch){
                setBranch(data?.branch)
            }
            if(data?.births){
                const date = new Date(data?.births) || new Date(birthStorage)
                setBirth(date)
            }
        }
    },[user,birthStorage])
    const handleSubmit = (e)=>{
        e.preventDefault()
        let flag = true;
        if(password.length < 8 && password.length !== 0 ){
            setError("Mật khẩu ít nhất 8 ký tự và không được để trống")
            flag = false
        }

        if(confirmPassword !== password){
            setError("Xác nhận mật khẩu phải khớp mật khẩu")
            flag = false
        }
        if(avatar?.size > 10448576){
            setError(" Kích thước ảnh quá lớn")
            flag = false
        }

        if(!phone.match(PHONE_REGEX)){
            setError(" số điện thoại không phù hợp ")
            flag = false
        }

        if(flag && !checkProfileChange()){
            if(password !== ""){
              console.log(password)
            }

            const data ={};
            data.phone = phone;
            data.address = address;
            data.nameBank = nameBank;
            data.number_account_payment = numberAccountPayment;
            data.branch = branch;
            data.births = birth;
            // data.avatar = avatar;
            const result = {}
            result.id = user?.data?.id_system
            result.data = data
            dispatch(userEditProfile(result))
        }
    }

    const handleChangeAvatar = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = () => {
            console.log('called: ', reader)
          }
        // setImagePreview(URL.createObjectURL(file))
        // setAvatar(file)
    }

  return (
    <div className="page">
        <Toast ref={toast} position="bottom-left"/>
        <div className="grid" >
            <div className="field col-12 md:col-6">
                <form className="infor__block grid" onSubmit={handleSubmit}>
                    <div className="field col-12 md:col-10 ">
                        <p className="infor__title">Thông tin cá nhân</p>
                    </div>
                    <div className="field avatar__block relative ava_res">
                        <Avatar image={imagePreview || "images/default_avatar.jpeg"} className="mr-5 infor_avatar"  shape="circle" />
                        <input type="file"  id="avatar" onChange={handleChangeAvatar}/>
                        <label htmlFor="avatar" className="label_avatar absolute"></label>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span>Họ và tên: </span>
                            <InputText placeholder="Nhập họ và tên" value={username} disabled/>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span>Tên đăng nhập: </span>
                            <InputText placeholder="Tên đăng nhập" value={fullname} disabled/>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span>Chức vụ: </span>
                            <InputText placeholder="Chức vụ" value={role} disabled/>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span>Email: </span>
                            <InputText placeholder="nhập email" value={email} disabled/>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span>Ngày sinh: </span>
                        <Calendar value={birth || new Date(birthStorage)} onChange={e=>setBirth(e.value)} placeholder="Ngày sinh"/>
                    </div>
                
                    <div className="field col-12 md:col-10">
                        <span>Số điện thoại: </span>
                            <InputText placeholder="Số điện thoại" value={phone} 
                            onChange={(e)=>{setError("");setPhone(e.target.value)}}
                            />
                    </div>
                    <div className="field col-12 md:col-10">
                        <span>Địa chỉ: </span>
                            <InputText placeholder="nhập địa chỉ" value={address} 
                            onChange={(e)=>{setError("");setAddress(e.target.value)}}
                            />
                    </div>
                    <div className="field col-12 md:col-10">
                        <span>Mật khẩu mới: </span>
                            <Password 
                                placeholder="nhập mật khẩu mới" 
                                value={password} 
                                toggleMask 
                                onChange={(e)=>{setError("");setPassword(e.target.value)}} 
                            />
                    </div>
                    <div className="field col-12 md:col-10">
                        <span>Nhập lại mật khẩu: </span>
                             <Password value={confirmPassword}
                              onChange={(e)=>{setError("");setConfirmPassword(e.target.value)}}  
                              toggleMask 
                              placeholder="Nhập lại mật khẩu"
                              />
                    </div>
                    {error.length > 0 && 
                    <span className="warning" 
                    style={{ fontSize:"13px",marginLeft:"10px",position: "absolute",bottom: "100px" }}>
                        {error}
                    </span>}
                    <div className="field col-12 md:col-10 flex justify-content-end">
                            <Button label="Sửa" className="p-button-outlined p-button-secondary infor__submit" type="submit"/>
                    </div>
                </form>
            </div>
            <div className="field col-12 md:col-6">
                <div className="flex flex-column justify-content-between" style={{height:"100%"}}>
                    <div className="field avatar__block relative ava_right">
                        <Avatar image={imagePreview || "images/default_avatar.jpeg"} className="mr-5 infor_avatar"  shape="circle" />
                        <input type="file"  id="avatar" onChange={handleChangeAvatar}/>
                        <label htmlFor="avatar" className="label_avatar absolute"></label>
                    </div>
                
                    <TablePersonalInfor 
                        nameBank={nameBank}
                        numberAccountPayment={numberAccountPayment}
                        paymentMethod={paymentMethod}
                        branch={branch}
                        setNameBank={setNameBank}
                        setNumberAccountPayment={setNumberAccountPayment}
                        setBranch={setBranch}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default PersonalInfor