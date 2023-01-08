import React, { useState } from "react";
import "./App.scss";
import { routes } from "./routes/routes";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./modules/layout/Header";
import { useSelector } from "react-redux";
import Login from "./modules/auth/Login";
import ForgotPassword from "./modules/auth/ForgotPassword";
import ResetPassword from "./modules/auth/ResetPassword";
import { Navigate } from "react-router";
import BtnMess from "./modules/layout/messages/BtnMess";
import Modal from "./modules/modal/Modal";
import Notfound from "./404";
import 'primeicons/primeicons.css';
import Loader from "./commons/loader"

function App() {
    const user = useSelector((state) => state.auth.token);
    const role = useSelector((state) => state.auth?.user);
    const [userIsAuth, setUserIsAuth] = useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setUserIsAuth(user?.isAuth);
        }, 300);
    }, [user?.isAuth]);

    // React.useEffect(() => {
    //     window.onunload = function (ev) {
    //         ev.preventDefault();
    //         return (ev.returnValue = "Are you sure you want to close?");
    //     }
    // });
    const notFound = () => {
        return <>{role?.data?.role && <Notfound />}</>;
    };

    return (
        <BrowserRouter>
            {userIsAuth && <Header />}
            <Routes>
                {user?.isAuth ? (
                    routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                route?.role.includes(role?.data?.role) ? (
                                    <route.main />
                                ) : (
                                    notFound()
                                )
                            }
                        />
                    ))
                ) : (
                    <>
                        <Route
                            path="*"
                            element={<Navigate to="/login" replace />}
                        />
                    </>
                )}
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
            {userIsAuth && (
                <>
                    <Modal />
                    <BtnMess />
                </>
            )}
            <Loader />
        </BrowserRouter>
    );
}

export default App;
