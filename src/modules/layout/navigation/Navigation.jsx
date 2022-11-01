import React,{ useState } from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { navButtons } from './navButtons';
import {useNavigate, useLocation} from "react-router-dom"
import { checkIsActive } from "../../../libs/muiDrawer"

const Navigation = ({open, getBtnNavIsOpen}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeRoute,setActiveRoute] = useState([])

  const handleRedirect = (isRederect,route,indexElParent)=>{
    if(isRederect && route){
      navigate(route)
    }else{
      if(!activeRoute.includes(indexElParent)){
        setActiveRoute([...activeRoute,indexElParent])
      }else{
        const newArr = activeRoute.filter((item) => item !== indexElParent )
        setActiveRoute(newArr)
      }
    }
    
    if(!open){
      getBtnNavIsOpen(true)
    }
  }

  const showNavChild = (elements) =>{
    return elements.map((item,index)=>{
      return (
        <ListItemButton
          key={index}
          onClick={()=>handleRedirect(item.isRederect,item.route)}
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
    <List>
      {
        navButtons.map((item,index)=>(
          <ListItem 
            key={index} 
            disablePadding 
            sx={{ display: 'block' }}
            className={`${checkIsActive(item.navChild,location.pathname) && !open && "nav__icon-active"}`}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              className={`nav__button ${!item.haveModal && open && "nav__btn-active "}`}
              onClick={()=>handleRedirect(item.isRederect,"",index)}
            >
            <img src={`../../images/${item.name_image}.svg`} alt="" className="nav__icon"/>
            <ListItemText 
              primary={item.name} 
              sx={{ opacity: open ? 1 : 0 }} 
              className={`nav__name ${!item.isRederect && !item.haveModal && "icon_arrow"} `}
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
                  { showNavChild(item.navChild)}
                </div>
              }
          </ListItem>
        ))
      }
    </List>
  )
}

export default Navigation