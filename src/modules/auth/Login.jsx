import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { storage } from '../../_services/sesionStorage';

import { 
  userloginRequest 
} from '../../redux/auth/action';
import {useDispatch,useSelector} from "react-redux"

const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({});
  const [haveSeenPwd,setHaveSeenPwd] = useState(false)
  const user = useSelector(state=> state.auth.user)
  const dispatch = useDispatch()
  const [error,setError] = useState("")

  const onSubmit = data => {
    if(data){
      dispatch(userloginRequest(data))
    }
  };
  
  useEffect(() => {
    if(user?.data?.access_token){
      storage.save("1touch_access_token",user?.data?.access_token)
      window.location.href = "/"
    }else if(user?.data?.message && !user?.data?.status){
      setError(user?.data?.message )
    }
  },[user])

  return (
    <div className="login__container">
        <div className="login__bg">
        </div>
        <div className="login__form">
          <div className="login__title">
            <p>Hệ thống quản lý</p>
            <p>One Touch</p>
          </div>
          <div className="login__route">
              Đăng nhập
          </div>
          <form  onSubmit={handleSubmit(onSubmit)}>
              <div className="form__email">
                  <p>Tên đăng nhập:</p>
                  <div className="form__input">
                  <input type="text" placeholder="Nhập tên " name="username" id="username"  autoComplete='off'
                     {...register("username", 
                     { required: {value:true,message: "email không được để trống"}, 
                      maxLength: 55, 
                    })}
                  />
                  </div>
                  {
                    errors?.email?.message && 
                    <span className="form__error">{errors?.email?.message}</span>
                  }
              </div>
              <div className="form__password">
                  <p>Mật khẩu:</p>
                  <div className="form__input">
                    <input type={haveSeenPwd ? "text" : "password"} placeholder="Nhập tên đăng nhập" name="password" id="password" autoComplete='off'
                     {...register("password", 
                     { required: {value:true,message: "password không được để trống"}})}
                    />
                    <img className="show__password" src={ haveSeenPwd ? "../../images/closed_eye.svg" :  "../../images/eye.svg"} alt="" onClick={()=>setHaveSeenPwd(!haveSeenPwd)}/>
                  </div>
                  {
                    errors?.password?.message && 
                    <span className="form__error">{errors?.password?.message}</span>
                  }
                   {
                    error && error !=="" &&
                    <span className="form__error">{error}</span>
                  }
              </div>
              <div className="form__save--information">
                  <div className="save__me">
                    <input type="checkbox" />
                    <p>Lưu tài khoản</p>
                  </div>
                  <p className="form__btn-forgotpwd" onClick ={()=>navigate("/forgot-password")}>Quên mật khẩu</p>
              </div>
              <div className="form__btn-submit">
                <button type="submit" >Đăng nhập</button>
              </div>
          </form>
        </div>
    </div>
  )
}

export default Login