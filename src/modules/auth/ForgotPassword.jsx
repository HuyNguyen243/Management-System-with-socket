import React from 'react'
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import {EMAIL_REGEX} from "../../constants"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({});

  const onSubmit = data => console.log(data);

  return (
    <div className="login__container">
        <div className="login__form form__forgot-pwd">
          <div className="login__title">
            <p>Hệ thống quản lý</p>
            <p>One Touch</p>
          </div>
          <div className="login__route forgot__title">
              Khôi phục mật khẩu
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="forgot__form">
              <div className="form__email">
                  <p>Email:</p>
                  <div className="form__input">
                  <input type="text" placeholder="Nhập tên đăng nhập" name="email" 
                  {...register("email", 
                  { required: {value:true,message: "email không được để trống"}, 
                   maxLength: 55, 
                   pattern:{
                     value: EMAIL_REGEX,
                     message: "Email không hợp lệ"
                   } })}
                  />
                  </div>
                  {
                    errors?.email?.message && 
                    <span className="form__error">{errors?.email?.message}</span>
                  }
              </div>
              <div className="form__forgotpwd">
                  <p className="form__btn-forgotpwd" onClick ={()=>navigate("/login")}>Quay lại trang đăng nhập</p>
              </div>
              <div className="form__btn-submit btn_forgot">
                <button type="submit" >Khôi phục mật khẩu</button>
              </div>
          </form>
          <p className="form__message">Have send email already !</p>
        </div>
        <div className="forgotpassword__bg"></div>
    </div>
  )
}

export default ForgotPassword