import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import {
    userloginRequest
} from '../../redux/auth/action';
import { useDispatch, useSelector } from "react-redux"
import { Cookie } from '../../commons/cookie';
import { Toast } from 'primereact/toast';
import { toastMsg } from '../../commons/toast';

const Login = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({});

    const [haveSeenPwd, setHaveSeenPwd] = useState(false)
    const [checked, setChecked] = useState(Cookie.getChecked() || false)
    const user = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const toast = useRef(null);

    const onSubmit = data => {
        if (data) {
            const result = {
                data: data,
                checked: checked
            }
            dispatch(userloginRequest(result))
        }
    };

    useEffect(() => {
        if (user?.error) {
            toastMsg.error(toast, "tài khoản hoặc mật khẩu không chính xác")
        }
    }, [user])

    const handleChecked = () => {
        setChecked(!checked)
        Cookie.delete()
        Cookie.deleteChecked()
    }

    return (
        <div className="login__container">
            <Toast ref={toast} position="bottom-left" />
            <div className="login__bg">
            </div>
            <div className="login__form">
                <div className="login__title">
                    <p>Hệ thống quản lý</p>
                    <p>One Touch</p>
                    <span className="login__note">Chào mừng bạn đến với hệ thống quản lý của One Touch</span>
                </div>
                <div className="login__route">
                    Đăng nhập
                </div>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" >
                    <div className="form__email">
                        <p>Tên đăng nhập:</p>
                        <div className="form__input">
                            <input type="text" placeholder="Nhập tên " name="username" id="username"
                                {...register("username",
                                    {
                                        required: { value: true, message: "Email không được để trống" },
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
                            <input type={haveSeenPwd ? "text" : "password"} placeholder="Nhập tên đăng nhập"
                                name="password" id="password"
                                {...register("password",
                                    { required: { value: true, message: "Password không được để trống" },
                                 })}
                            />
                            <img className="show__password" src={haveSeenPwd ? "../../images/closed_eye.svg" : "../../images/eye.svg"}
                                alt="" onClick={() => setHaveSeenPwd(!haveSeenPwd)} />
                        </div>
                        {
                            errors?.password?.message &&
                            <span className="form__error">{errors?.password?.message}</span>
                        }
                    </div>
                    <div className="form__save--information">
                        <div className="save__me">
                            <input type="checkbox" onChange={handleChecked} checked={checked} />
                            <p>Lưu tài khoản</p>
                        </div>
                        <p className="form__btn-forgotpwd" onClick={() => navigate("/forgot-password")}>Quên mật khẩu</p>
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