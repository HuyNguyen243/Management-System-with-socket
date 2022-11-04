import React from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import TablePersonalInfor from "./TablePersonalInfor"

const PersonalInfor = () => {

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
                        <span className="p-float-label">
                            <InputText />
                        </span>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span htmlFor="autocomplete">Tên đăng nhập: </span>
                        <span className="p-float-label">
                            <InputText />
                        </span>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span htmlFor="autocomplete">Chức vụ: </span>
                        <span className="p-float-label">
                            <InputText />
                        </span>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span htmlFor="autocomplete">Số điện thoại: </span>
                        <span className="p-float-label">
                            <InputText />
                        </span>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span htmlFor="autocomplete">Email: </span>
                        <span className="p-float-label">
                            <InputText />
                        </span>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span htmlFor="autocomplete">Địa chỉ: </span>
                        <span className="p-float-label">
                            <InputText />
                        </span>
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