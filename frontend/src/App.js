// import logo from './logo.svg';
import './App.css';
import React from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from './Component/navbar';
import LoginAdmin from './Pages/LoginAdmin/loginAdmin';
import LoginCashier from './Pages/LoginCashier/LoginCashier';
import LandingPage from './Pages/LandingPage/LandingPage';
import LandingPageCashier from './Pages/LpCashier/LpCashier';
import ListCashier from './Pages/ListCashier/ListCashier';
import EditProductCategory from './Pages/EditProductCategory/EditProductCategory';
import DashboardAdmin from './Pages/DashboardAdmin/DashboardAdmin';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<LoginAdmin />}></Route>
				<Route path='/login/cashier' element={<LoginCashier />}></Route>
				<Route
					path='/landingpage'
					element={
						<>
							<Navbar />
							<LandingPage />
						</>
					}
				></Route>
				<Route
					path='/landingpage/cashier'
					element={
						<>
							<Navbar />
							<LandingPageCashier />
						</>
					}
				></Route>
				<Route
					path='/landingpage/cashierlist'
					element={
						<>
							<Navbar />
							<ListCashier />
						</>
					}
				></Route>
				<Route
					path='/products/edit/categories'
					element={
						<>
							<Navbar />
							<EditProductCategory />
						</>
					}
				></Route>
				<Route
					path='/admin/dashboard'
					element={
						<>
							<Navbar />
							<DashboardAdmin />
						</>
					}
				></Route>
			</Routes>
		</>
	);
}

export default App;
