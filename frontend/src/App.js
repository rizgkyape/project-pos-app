// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Navbar from './Component/navbar';
import LoginAdmin from './Pages/LoginAdmin/loginAdmin';
import LoginCashier from './Pages/LoginCashier/LoginCashier';
import LandingPage from './Pages/LandingPage/LandingPage';
import LandingPageCashier from './Pages/LpCashier/LpCashier';
import ListCashier from './Pages/ListCashier/ListCashier';
import EditProductCategory from './Pages/EditProductCategory/EditProductCategory';
import DashboardAdmin from './Pages/DashboardAdmin/DashboardAdmin';

// const userlogin = JSON.parse(localStorage?.getItem('userLogin'))

const AdminPrivateRoute = ({ children }) => {
	const userlogin = JSON.parse(localStorage?.getItem('userLogin'));

	if (userlogin && userlogin?.isAdmin === true) {
		return children;
	} else if (userlogin && userlogin?.isAdmin === false) {
		return <Navigate to='/landingpage/cashier' />;
	}

	if (!userlogin) {
		return <Navigate to='/' />;
	}
};

const CashierPrivateRoute = ({ children }) => {
	const userlogin = JSON.parse(localStorage?.getItem('userLogin'));

	if (userlogin && userlogin?.isAdmin === false) {
		return children;
	} else if (userlogin && userlogin?.isAdmin === true) {
		return <Navigate to='/landingpage' />;
	}

	if (!userlogin) {
		return <Navigate to='/login/cashier' />;
	}
};

function App() {
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						<>
							<LoginAdmin />
						</>
					}
				></Route>
				<Route
					path='/login/cashier'
					element={
						<>
							<LoginCashier />
						</>
					}
				></Route>
				<Route
					path='/landingpage'
					element={
						<>
							<AdminPrivateRoute>
								<Navbar />
								<LandingPage />
							</AdminPrivateRoute>
						</>
					}
				></Route>
				<Route
					path='/landingpage/cashier'
					element={
						<>
							<CashierPrivateRoute>
								<Navbar />
								<LandingPageCashier />
							</CashierPrivateRoute>
						</>
					}
				></Route>
				<Route
					path='/landingpage/cashierlist'
					element={
						<>
							<AdminPrivateRoute>
								<Navbar />
								<ListCashier />
							</AdminPrivateRoute>
						</>
					}
				></Route>
				<Route
					path='/products/edit/categories'
					element={
						<>
							<AdminPrivateRoute>
								<Navbar />
								<EditProductCategory />
							</AdminPrivateRoute>
						</>
					}
				></Route>
				<Route
					path='/admin/dashboard'
					element={
						<>
							<AdminPrivateRoute>
								<Navbar />
								<DashboardAdmin />
							</AdminPrivateRoute>
						</>
					}
				></Route>
			</Routes>
		</>
	);
}

export default App;
