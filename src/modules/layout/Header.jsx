import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Navigation from './navigation/Navigation';
import { DrawerHeader, AppBar, Drawer } from "../../libs/muiDrawer"
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router';
import { SlideMenu } from 'primereact/slidemenu';
import {useDispatch} from "react-redux"
import {userLogoutRequest} from "../../redux/auth/action"
import {storage} from "../../_services/sesionStorage"

export default function Header() {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const location = useLocation()
  const pathsName = ["/login","/forgot-password"]
  const [openMenu, setOpenMenu] = React.useState(false); 

  const iconMenu = (image)=>{
    return (
      <img src={`images/${image}.svg`} alt="" className={`header__menu-icon ${image === "arrow_right" && "flex_right" }`} />
    )
  }
  
  const items = [
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
        console.log(true)
      }
    },
    {
        label:'Thoát',
        command: ()=>{
          dispatch(userLogoutRequest())
          storage.delete("1touch_access_token")
        }
    }
];
  
  const handleDrawer = () => {
    setOpen(!open);
  };

  const getBtnNavIsOpen = (isOpen)=>{
    setOpen(isOpen)
  }

  return (
    <Box sx={{ display: 'flex' }} className="header__container">
      {
        !pathsName.includes(location.pathname) &&
        <>
          <CssBaseline />
          <AppBar position="fixed" open={open} >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawer}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
                className="header__button"
              >
                <img src="../../images/menu_blue.svg" alt=""/>
              </IconButton>
              <div className="header__block">
                <div className="header__left">
                  One Touch
                </div>
                <div className="header__right">
                  <div className="header__right--notification">
                    <img src="../../images/notifications.svg" alt=""/>
                    <span className="count_notification">1</span>
                  </div>
                  <div className="header__right--notification-msg">
                    <img src="../../images/chat.svg" alt=""/>
                    <span className="count_notification">1</span>
                  </div>
                  <div className="header__right--profile" onClick={()=>setOpenMenu(!openMenu)}>
                    <Stack direction="row" spacing={2}>
                      <Avatar alt="" src="../../images/default_avatar.jpeg" />
                    </Stack>
                    <div className="header__right--information">
                        <div className="information__name">
                            <p>neymar JR.</p>
                            <span className="dots_online"></span>
                        </div>
                        <div className="information__roles">
                            <p>Admin</p>
                            <img src="../../images/arrow_down_gray.svg" alt=""/>
                        </div>
                    </div>
                  </div>
                </div>
                {
                  openMenu &&
                  <div className="header__menu">
                    <SlideMenu model={items} ></SlideMenu>
                  </div>
                }
              </div>
            
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open} className="nav__container">
            <DrawerHeader className="nav__btnMenu">
              <IconButton onClick={handleDrawer}>
                <img src="images/menu.svg" alt=""/>
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Navigation  open={open} getBtnNavIsOpen={getBtnNavIsOpen}/>
          </Drawer>
        </>
      }
   
    </Box>
  );
}
