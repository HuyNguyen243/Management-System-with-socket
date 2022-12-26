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
import {useDispatch, useSelector} from "react-redux"
import {userProfile} from "../../redux/auth/action"
import { storage } from '../../_services/sesionStorage';
import { NAME_SESSION_STORAGE_TOKEN, UserRules } from '../../constants';
import ToggleMenu from "./ToggleMenu";
import jwt_decode from "jwt-decode";
import { profileUserByToken } from "../../redux/auth/authSlice";
import Notification from "./notification/Notification";
import Messages from "./messages/Messages";
import { socket } from "../../_services/socket";

export default function Header() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [avatar, setAvatar] = useState("/images/default_avatar.jpeg");
  const user = useSelector(state=> state.auth.user)
  const token =storage.get(NAME_SESSION_STORAGE_TOKEN)
  const userByToken = useSelector(state=> state.auth.userByToken)
  const [isOpenNotification, setisOpenNotification] = useState(false)
  const [isOpenMessages, setisOpenMessages] = useState(false)
  const currentUser = useSelector(state=> state.message.currentUser)

	useEffect(() => {
		if(user?.data){
			if(user?.data?.avatar && user?.data?.avatar !== ""){
				setAvatar(user?.data?.avatar)
			}
		}
	},[user])

	useEffect(() => {
		if(token){
		const decodedToken = jwt_decode(token)
		dispatch(profileUserByToken(decodedToken))
		}
	},[token,dispatch])

	useEffect(() => {
		const handleClickOutsideMenu = (e)=>{
			const elementChildMenu = document.querySelector(".header__menu")
			const btn = document.querySelector(".header__right--profile")
			if(openMenu && !elementChildMenu?.contains(e.target)){
			setOpenMenu(false)
			}else if (!openMenu && btn?.contains(e.target)){
			setOpenMenu(!openMenu)
			}
		}

		window.addEventListener('mousedown', handleClickOutsideMenu);

		return ()=>{
			window.removeEventListener('mousedown',handleClickOutsideMenu)
		}

	},[openMenu,open])
  
	useEffect(() => {
		const handleClickOutSideNav = (e)=>{
		const el = document.querySelector(".header__container .MuiDrawer-root .MuiPaper-elevation")
		if(open && !el?.contains(e.target)){
			setOpen(false)
		}
		}
		window.addEventListener('mousedown', handleClickOutSideNav);

		return ()=>{
		window.removeEventListener('mousedown',handleClickOutSideNav)
		}

	},[openMenu,open])

	useEffect(() => {
		const handleClickOutSideNotification = (e)=>{
		const el = document.querySelector(".notification__container")
		const btn = document.querySelector(".header__right--notification")
		if(isOpenNotification && !el?.contains(e.target)){
			setisOpenNotification(false)
		}else if (!isOpenNotification && btn?.contains(e.target)){
			setisOpenNotification(!isOpenNotification)
			setisOpenMessages(false)
		}
		}
		window.addEventListener('mousedown', handleClickOutSideNotification);

		return ()=>{
		window.removeEventListener('mousedown',handleClickOutSideNotification)
		}

	},[isOpenNotification])

	useEffect(() => {
		const handleClickOutSideNotificationMsg = (e)=>{
		const el = document.querySelector(".notification-message__container")
		const btn = document.querySelector(".header__right--notification-msg")
		if(isOpenMessages && !el.contains(e.target)){
			setisOpenMessages(false)
		}else if (!isOpenMessages && btn?.contains(e.target)){
			//OPEN MODAL
			setisOpenMessages(!isOpenMessages)
			setisOpenNotification(false)
		}
		}
		window.addEventListener('mousedown', handleClickOutSideNotificationMsg);

		return ()=>{
		window.removeEventListener('mousedown',handleClickOutSideNotificationMsg)
		}

	},[isOpenMessages, user])

	useEffect(()=>{
		if(userByToken && token){
		dispatch(userProfile(userByToken?.id_system))
		}
	},[dispatch,token,userByToken])

	const handleDrawer = () => {
		setOpen(!open);
	};

	const getBtnNavIsOpen = (isOpen)=>{
		setOpen(isOpen)
	}

	socket.off("is_reset_count_notify").on("is_reset_count_notify", (payload)=>{
        if(payload){
            socket.emit('get-members')
        }
    })

	return (
		<Box sx={{ display: 'flex' }} className="header__container">
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
					<div className="header__right--notification" >
						<img src="../../images/notifications.svg" alt="" onClick={()=>socket.emit("reset-count-notify",user?.data?.id_system)}/>
						{
							currentUser?.notification_count && currentUser?.notification_count > 0 &&
							<span className="count_notification">{currentUser?.notification_count }</span>
						}
					</div>
					<div className="header__right--notification-msg">
						<img src="../../images/chat.svg" alt="" />
						{
						currentUser?.newMessages && Object.keys(currentUser?.newMessages).length > 0
						&& 
						<span className="count_notification">{Object.keys(currentUser?.newMessages).length}</span>
						}

					</div>
					<div className="header__right--profile" onClick={()=>{ setOpen(false)}}>
						<Stack direction="row" spacing={2}>
						<Avatar crossorigin="anonymous" alt="" src={avatar} />
						</Stack>
						<div className="header__right--information">
							<div className="information__name">
								<p>{user?.data?.fullname}</p>
								{user?.data?.status === UserRules.STATUS.ONLINE &&  <span className="dots_online"></span>}
								{user?.data?.status === UserRules.STATUS.LEAVE &&  <span className="dots_busy"></span>}
								{user?.data?.status === UserRules.STATUS.OFFLINE &&  <span className="dots_offline"></span>}
							</div>
							<div className="information__roles">
								{user?.data?.role === UserRules.ROLE_NAME.ADMIN && <p>Admin</p>}
								{user?.data?.role === UserRules.ROLE_NAME.SALER && <p>Saler</p>}
								{user?.data?.role === UserRules.ROLE_NAME.EDITOR && <p>Editor</p>}
								{user?.data && <img src={`images/${openMenu ? "arrow_down" : "arrow_up"}.svg`} alt=""/>}
							</div>
						</div>
					</div>
					</div>
					{
					openMenu &&
					<ToggleMenu/>
					}
				</div>
				<Notification isOpenNotification={isOpenNotification} setisOpenNotification={setisOpenNotification}/>
				<Messages isOpenMessages={isOpenMessages} setisOpenMessages={setisOpenMessages}/>
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
		</Box>
	);
}
