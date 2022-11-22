import React from 'react'
import { useDispatch,useSelector } from "react-redux"
import {
  userLogoutRequest,
  userChangeStatus,
} from "../../redux/auth/action"
import { SlideMenu } from 'primereact/slidemenu';
import { useNavigate } from 'react-router';
import { UserRules } from '../../constants';

const ToggleMenu = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state=> state.auth.user)

    const changeStatus = (status) => {
        let newUser = Object.assign({}, user?.data,{
            status: status
        })

        const result = {
            id : user?.data?.id_system,
            status : status,
            newUser: newUser
        }
        dispatch(userChangeStatus(result))
    }

    const arrMenu = [
        {
            label:'Hoạt động',
            icon:()=>iconMenu("arrow_right"),
            items:[
                {
                    label:'Online',
                    icon:()=>iconMenu("online"),
                    command: ()=>{
                      const status = UserRules.STATUS.ONLINE
                      changeStatus(status)
                    }
                },
                {
                    label:'Busy',
                    icon:()=>iconMenu("busy"),
                    command: ()=>{
                      const status = UserRules.STATUS.LEAVE
                      changeStatus(status)
                    }
                },
              
                {
                    label:'Office',
                    icon:()=>iconMenu("offline"),
                    command: ()=>{
                      const status = UserRules.STATUS.OFFLINE
                      changeStatus(status)
                    }
                },
            ]
        },
        {
            separator:true
        },
        {
          label:'Thông tin cá nhân',
          command: ()=>{
            navigate("/perosonal-information")
          }
        },
        {
            label:'Thoát',
            command: ()=>{
              dispatch(userLogoutRequest())
            }
        }
    ];
    
  const iconMenu = (image)=>{
    return (
      <img src={`images/${image}.svg`} alt="" className={`header__menu-icon ${image === "arrow_right" && "flex_right" }`} />
    )
  }

  return (
    <div className="header__menu">
        <SlideMenu model={arrMenu} ></SlideMenu>
    </div>
  )
}

export default ToggleMenu