import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { navButtons } from './navButtons';
import { useNavigate, useLocation } from "react-router-dom"
import { checkIsActive } from "../../../libs/muiDrawer";
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpenModalSetting } from '../../../redux/modal/modalSlice';

const Navigation = ({ open, getBtnNavIsOpen }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [activeRoute, setActiveRoute] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(state => state?.auth?.user)
    const handleRedirect = (isRederect, route, indexElParent, item) => {
        if (isRederect && route) {
            navigate(route)
        } else {
            if (!activeRoute.includes(indexElParent)) {
                setActiveRoute([...activeRoute, indexElParent])
            } else {
                const newArr = activeRoute.filter((item) => item !== indexElParent)
                setActiveRoute(newArr)
            }
        }

        if (!open && item?.name_image !== "setting") {
            getBtnNavIsOpen(true)
        }

        if (item?.name_image === "setting") {
            dispatch(setIsOpenModalSetting(true))
        }

    }

    const showNavChild = (elements) => {
        return elements.map((item, index) => {
            return (
                <ListItemButton
                    key={index}
                    onClick={() => handleRedirect(item.isRederect, item.route)}
                    className={`nav_btnChild ${location.pathname === item.route && "active"}`}
                >
                    <p key={index} className="nav__name--childNav">
                        {item.name}
                    </p>
                </ListItemButton>
            )
        })
    }
    return (
        <>
            <List>
                {
                    navButtons.map((item, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            sx={{ display: 'block' }}
                            className={`${checkIsActive(item.navChild, location.pathname) && !open && "nav__icon-active"}`}
                        >

                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                className={`nav__button 
                                    ${!item.haveModal && open && "nav__btn-active "} 
                                    ${!item.role.includes( user?.data?.role)  && "hidden"}
                                `}
                                onClick={() => handleRedirect(item.isRederect, "", index, item)}
                            >
                                <img src={`../../images/${item.name_image}.svg`} alt="" className="nav__icon" />
                                <ListItemText
                                    primary={item.name}
                                    sx={{ opacity: open ? 1 : 0 }}
                                    className={
                                        `nav__name 
                                            ${open ? "enable" : "disabled"}
                                            ${!item.isRederect && !item.haveModal && !activeRoute.includes(index) && "icon_arrow-up"}
                                            ${activeRoute.includes(index) && item.name !== "Cài đặt" && "icon_arrow-down"}
                                        `
                                    }
                                />
                            </ListItemButton>
                            {
                                open && !item.isisRederect && item.navChild &&
                                <div
                                    className={
                                        `nav__container--nav-child 
                    ${activeRoute.includes(index) && "active"}
                    `
                                    }
                                >
                                    {showNavChild(item.navChild)}
                                </div>
                            }
                        </ListItem>
                    ))
                }
            </List>
        </>
    )
}

export default Navigation