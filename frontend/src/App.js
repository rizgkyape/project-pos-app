// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Component/navbar';
import LoginAdmin from './Pages/LoginAdmin/loginAdmin';
import LoginCashier from './Pages/LoginCashier/LoginCashier';
import LandingPage from './Pages/LandingPage/LandingPage';
import LandingPageCashier from './Pages/LpCashier/LpCashier';


function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/login' element={<LoginAdmin />}></Route>
				<Route path='/login/cashier' element={<LoginCashier />}></Route>
				<Route path='/landingpage' element={<LandingPage />}></Route>
				<Route path='/landingpagecashier' element={<LandingPageCashier />}></Route>
			</Routes>
		</>
	);
}

export default App;
