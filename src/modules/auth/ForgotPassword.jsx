import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../../constants";
import { forgotPassword } from '../../redux/auth/action';
import { useDispatch, useSelector } from "react-redux"

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const resetpass = useSelector(state => state.auth?.resetpassword)
    const [errorMessage, setErrorMessage] = useState(["",""]);
    const { register, handleSubmit, formState: { errors } } = useForm({});

    useEffect(() => {
        if (resetpass?.error) {
            console.log(resetpass?.data);
            setErrorMessage([false,resetpass?.data])
        }
        if (resetpass?.data?.status) {
            setErrorMessage([true,resetpass?.data?.data?.messager])
        }
    }, [resetpass])
    const onSubmit = (data) => {
        if (data) {
            const dataPost = {
                email: data?.email,
            }
            dispatch(forgotPassword(dataPost))
        }
        console.log(errorMessage);

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
                    <div className="form__email">
                        <p>Email:</p>
                        <div className="form__input">
                            <input type="text" placeholder="Nhập mail của bạn" name="email"
                                {...register("email",
                                    {
                                        required: { value: true, message: "Email không được để trống" },
                                        maxLength: 55,
                                        pattern: {
                                            value: EMAIL_REGEX,
                                            message: "Email không hợp lệ"
                                        }
                                    })}
                            />
                        </div>
                        {
                            errors?.email?.message &&
                            <span className="form__error">{errors?.email?.message}</span>
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
                { errorMessage[0] === false &&
                    <p className="form__message form__message_error">{errorMessage[1]}</p>
                }
            </div>
            <div className="forgotpassword__bg"></div>
        </div>
    )
}

export default ForgotPassword