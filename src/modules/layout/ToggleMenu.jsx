import React from 'react'
import {useDispatch} from "react-redux"
import {userLogoutRequest} from "../../redux/auth/action"
import { SlideMenu } from 'primereact/slidemenu';
import { useNavigate } from 'react-router';

const ToggleMenu = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const arrMenu = [
        {
            label:'Hoạt động',
            icon:()=>iconMenu("arrow_right"),
            items:[
                {
                    label:'Online',
                    icon:()=>iconMenu("online"),
                },
                {
                    label:'Busy',
                    icon:()=>iconMenu("busy"),
                },
              
                {
                    label:'Office',
                    icon:()=>iconMenu("offline"),
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