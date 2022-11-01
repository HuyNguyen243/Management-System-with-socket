
import React from 'react';
import "./App.scss";
import { routes } from "./routes/routes";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Header from "./modules/layout/Header";
import { useSelector } from "react-redux";
import Login from "./modules/auth/Login";
import ForgotPassword from "./modules/auth/ForgotPassword";
import { Navigate } from 'react-router';

function App() {
  const user = useSelector(state =>state.auth.user)

  return (
   <BrowserRouter>
    <Header />
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
        <Route path="/Login" element={<Login />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        </>
      }
      
      </Routes>
   </BrowserRouter>
  );
}

export default App;
