import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { resetPassword } from '../../redux/auth/action';
import { useDispatch, useSelector } from "react-redux"

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(["", ""]);
    const { register, handleSubmit, formState: { errors } } = useForm({});
    const queryParams = new URLSearchParams(window.location.search)
    const resetpass = useSelector(state => state.auth?.resetpassword)
    const [haveSeenPwd, setHaveSeenPwd] = useState(false)
    const [haveSeenRePwd, setHaveSeenRePwd] = useState(false)

    useEffect(() => {
        if (resetpass?.error) {
            setErrorMessage([false,resetpass?.data])
        }
        if (resetpass?.data?.status) {
            setErrorMessage([true,resetpass?.data?.data?.messager])
            setTimeout(() => {
                navigate("/login")
            }, 2000);
        }
    }, [resetpass,navigate])

    const onSubmit = (data) => {
        let id = queryParams.get("id");
        let token = queryParams.get("token");
        if (data?.password !== data?.repassword) {
            setErrorMessage([false, "Hai mật khẩu phải trùng nhau"])
        } else {
            if (data && id && token) {
                const dataPost = {
                    password: data?.password,
                    id: id,
                    token: token,
                }
                dispatch(resetPassword(dataPost))
            }
        }

    };

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
                    <div className="form__password">
                        <p>Nhập mật khẩu mới:</p>
                        <div className="form__input">
                            <input type={haveSeenPwd ? "text" : "password"} placeholder="Nhập mật khẩu mới của bạn" name="password"
                                {...register("password",
                                    {
                                        required: { value: true, message: "Mật khẩu không được để trống" },
                                        minLength: {
                                            value: 8,
                                            message: 'Mật khẩu dài hơn 8 kí tự'
                                        }
                                    })}
                            />
                            <img className="show__password" src={haveSeenPwd ? "../../images/closed_eye.png" : "../../images/eye.png"}
                                alt="" onClick={() => setHaveSeenPwd(!haveSeenPwd)} />
                        </div>
                        {
                            errors?.password?.message &&
                            <span className="form__error">{errors?.password?.message}</span>
                        }
                    </div>
                    <div className="form__password">
                        <p>Nhập lại mật khẩu:</p>
                        <div className="form__input">
                            <input type={haveSeenRePwd ? "text" : "password"} placeholder="Nhập mật khẩu mới của bạn" name="repassword"
                                {...register("repassword",
                                    {
                                        required: { value: true, message: "Mật khẩu không được để trống" },
                                        minLength: {
                                            value: 8,
                                            message: 'Mật khẩu dài hơn 8 kí tự'
                                        }
                                    })}
                            />
                            <img className="show__password" src={haveSeenRePwd ? "../../images/closed_eye.png" : "../../images/eye.png"}
                                alt="" onClick={() => setHaveSeenRePwd(!haveSeenRePwd)} />
                        </div>
                        {
                            errors?.repassword?.message &&
                            <span className="form__error">{errors?.repassword?.message}</span>
                        }
                    </div>
                    <div className="form__forgotpwd">
                        <p className="form__btn-forgotpwd" onClick={() => navigate("/login")}>Quay lại trang đăng nhập</p>
                    </div>
                    <div className="form__btn-submit btn_forgot">
                        <button type="submit" >Khôi phục mật khẩu</button>
                    </div>
                </form>
                {errorMessage[0] &&
                    <p className="form__message">{errorMessage[1]}</p>
                }
                {errorMessage[0] === false &&
                    <p className="form__message form__message_error">{errorMessage[1]}</p>
                }
            </div>
            <div className="forgotpassword__bg"></div>
        </div>
    )
}

export default ForgotPassword