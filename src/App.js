
import React,{ useState } from 'react';
import "./App.scss";
import { routes } from "./routes/routes";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Header from "./modules/layout/Header";
import { useSelector } from "react-redux";
import Login from "./modules/auth/Login";
import ForgotPassword from "./modules/auth/ForgotPassword";
import { Navigate } from 'react-router';
import BtnMess from "./modules/layout/messages/BtnMess";
import Modal from './modules/modal/Modal';
function App() {
  const user = useSelector(state =>state.auth.token)
  const [userIsAuth,setUserIsAuth]= useState(false)

  React.useEffect(()=>{
      setTimeout(()=>{
        setUserIsAuth(user?.isAuth)
      },300)
  },[user?.isAuth])
  
  return (
    <BrowserRouter>
      { userIsAuth && <Header /> }
          <Routes>
          { 
            user?.isAuth ?
            routes.map((route, index) =>
              (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.main />}
                />
              )
            )
            :
            <>
            <Route path="*" element={<Navigate to="/login" replace/>}/>
            </>
          }
            <Route path="/login" element={<Login />}/>
            <Route path="/forgot-password" element={<ForgotPassword />}/>
          </Routes>
          { userIsAuth && 
          <>
            <BtnMess />
            <Modal />
          </>
          }
    </BrowserRouter>
  );
}

export default App;
