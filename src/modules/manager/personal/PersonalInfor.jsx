import React from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import TablePersonalInfor from "./TablePersonalInfor"


const PersonalInfor = () => {
    // const file = e.target.files[0];
    // if(file.size > 10448576){
    //   return alert("Maximum image size is 1mb")
    // }
    // setImagePreview(URL.createObjectURL(file))
  return (
    <div className="page">
        <div className="grid" style={{margin:"0 100px"}}>
            <div className="field col-12 md:col-6">
                <form className="infor__block grid">
                    <div className="field col-12 md:col-10 ">
                        <p className="infor__title">Thông tin cá nhân</p>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span htmlFor="autocomplete">Họ và tên: </span>
                            <InputText placeholder="Nhập họ và tên" disabled/>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span htmlFor="autocomplete">Tên đăng nhập: </span>
                            <InputText placeholder="Tên đăng nhập" disabled/>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span htmlFor="autocomplete">Chức vụ: </span>
                            <InputText placeholder="Chức vụ" disabled/>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span htmlFor="autocomplete">Số điện thoại: </span>
                            <InputText placeholder="Số điện thoại" disabled/>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span htmlFor="autocomplete">Email: </span>
                            <InputText placeholder="nhập email" disabled/>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span htmlFor="autocomplete">Địa chỉ: </span>
                            <InputText placeholder="nhập địa chỉ" disabled/>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span htmlFor="autocomplete">Mật khẩu mới: </span>
                            <InputText placeholder="nhập mật khẩu mới" />
                    </div>
                    <div className="field col-12 md:col-10">
                        <span htmlFor="autocomplete">Nhập lại mật khẩu: </span>
                            <InputText placeholder="Nhập lại mật khẩu"/>
                    </div>
                    <div className="field col-12 md:col-10 flex justify-content-end">
                            <Button label="Sửa" className="p-button-outlined p-button-secondary infor__submit" type="submit"/>
                    </div>
                </form>
            </div>
            <div className="field col-12 md:col-6">
                <div className="field avatar__block relative">
                    <Avatar image="images/default_avatar.jpeg" className="mr-5 infor_avatar"  shape="circle" />
                    <input type="file"  id="avatar"/>
                    <label htmlFor="avatar" className="label_avatar absolute"></label>
                </div>
            </div>
            <div className="field col-12 md:col-12">
                <TablePersonalInfor />
            </div>
        </div>
    </div>
  )
}

export default PersonalInfor