import React,{useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from "react-redux"
import {userProfile} from "../../redux/auth/action"
import { storage } from '../../_services/sesionStorage';
import { NAME_SESSION_STORAGE_TOKEN, ID_SESSION, UserRules } from '../../constants';
import ToggleMenu from "./ToggleMenu"

export default function Header() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const location = useLocation()
  const pathsName = ["/login","/forgot-password"]
  const [openMenu, setOpenMenu] = useState(false);

  const token =storage.get(NAME_SESSION_STORAGE_TOKEN)
  const id =storage.get(ID_SESSION)
  const user = useSelector(state=> state.auth.user)

  useEffect(() => {
      const handleClickOutsideMenu = (e)=>{
        const elementChildMenu = document.querySelector(".header__menu")
        if(openMenu && !elementChildMenu.contains(e.target)){
          setOpenMenu(false)
        }
        
      }
      window.addEventListener('mousedown', handleClickOutsideMenu);

      return ()=>{
        window.removeEventListener('mousedown',handleClickOutsideMenu)
      }
  },[openMenu,open])

  useEffect(()=>{
    if(id && token){
      dispatch(userProfile(id))
    }
  },[dispatch,id,token])

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
          <AppBar position="fixed" open={open} className="navigation_left">
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
                  <div className="header__right--profile" onClick={()=>{setOpenMenu(!openMenu); setOpen(false)}}>
                    <Stack direction="row" spacing={2}>
                      <Avatar alt="" src="../../images/default_avatar.jpeg" />
                    </Stack>
                    <div className="header__right--information">
                        <div className="information__name">
                            <p>{user?.data?.username}</p>
                            {user?.data?.status === UserRules.STATUS.ONLINE &&  <span className="dots_online"></span>}
                            {user?.data?.status === UserRules.STATUS.LEAVE &&  <span className="dots_busy"></span>}
                            {user?.data?.status === UserRules.STATUS.OFFLINE &&  <span className="dots_offline"></span>}
                        </div>
                        <div className="information__roles">
                            {user?.data?.id_system?.includes(UserRules._ROLE.ADMIN) && <p>Admin</p>}
                            {user?.data?.id_system?.includes(UserRules._ROLE.SALE) && <p>Sale</p>}
                            {user?.data?.id_system?.includes(UserRules._ROLE.EDITOR) && <p>Editor</p>}
                            {user?.data && <img src="../../images/arrow_down_gray.svg" alt=""/>}
                        </div>
                    </div>
                  </div>
                </div>
                {
                  openMenu &&
                  <ToggleMenu />
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
