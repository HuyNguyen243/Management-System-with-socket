import React, { useState } from 'react';
import './App.scss';
import { routes } from './routes/routes';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './modules/layout/Header';
import { useSelector } from 'react-redux';
import Login from './modules/auth/Login';
import ForgotPassword from './modules/auth/ForgotPassword';
import ResetPassword from './modules/auth/ResetPassword';
import { Navigate } from 'react-router';
import BtnMess from './modules/layout/messages/BtnMess';
import Modal from './modules/modal/Modal';
import Notfound from './404';
import 'primeicons/primeicons.css';
import Loader from './commons/loader';
import { URL_ROUTER } from './routes/routes';

function App() {
	const user = useSelector((state) => state.auth.token);
	const role = useSelector((state) => state.auth?.user);
	const [userIsAuth, setUserIsAuth] = useState(false);

	React.useEffect(() => {
		setTimeout(() => {
			setUserIsAuth(user?.isAuth);
		}, 300);
	}, [user?.isAuth]);

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
							element={route?.role.includes(role?.data?.role) ? <route.main /> : notFound()}
						/>
					))
				) : (
					<>
						<Route path='*' element={<Navigate to={URL_ROUTER.LOGIN} replace />} />
					</>
				)}
				<Route path={URL_ROUTER.LOGIN}  element={<Login />} />
				<Route path={URL_ROUTER.FORGOT_PASSWORD}  element={<ForgotPassword />} />
				<Route path={URL_ROUTER.RESET_PASSWORD}  element={<ResetPassword />} />
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
