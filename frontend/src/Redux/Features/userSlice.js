import { createSlice } from '@reduxjs/toolkit';
import urlAPI from '../../Supports/Constant/urlAPI';
import axios from 'axios';
import toast from 'react-hot-toast';

let userLogin = JSON.parse(localStorage?.getItem('userLogin'));
console.log(userLogin);

const initialState = {
    cashier: {},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCashier: (initialState, action) => {
			initialState.cashier = action.payload;
		},
	},
});

export const getCashierList = () => async (dispatch) => {
	try {
		const result = await axios.get(`${urlAPI}/auth/cashier`, {
			headers: {
				authorization: `Bearer ${userLogin.token}`,
			},
		});
		dispatch(setCashier(result.data));
	} catch (error) {
		if (error.response) {
			toast.error(error.response.data.message);
		} else {
			toast.error(error.message);
		}
	}
};

export const changeStatusCashier = (id, status) => async (dispatch) => {
	try {
		const result = await axios.patch(
			`${urlAPI}/auth/status/cashier`,
			{
				id: id,
				isCashier: status,
			},
			{
				headers: {
					authorization: `Bearer ${userLogin.token}`,
				},
			}
		);
		console.log(userLogin);
		dispatch(getCashierList());

		if (result.data.success) {
			toast.success(result.data.message);
		}
	} catch (error) {
		if (error.response) {
			toast.error(error.response.data.message);
		} else {
			toast.error(error.message);
		}
	}
};

export const registerCashier =
	(adminId, name, email, phoneNumber, password, confirmPassword) =>
	async (dispatch) => {
		try {
			const result = await axios.post(
				`${urlAPI}/auth/register/cashier`,
				{
					adminId: adminId,
					name: name,
					email: email,
					phoneNumber: phoneNumber,
					password: password,
					confirmPassword: confirmPassword,
				},
				{
					headers: {
						authorization: `Bearer ${userLogin.token}`,
					},
				}
			);
			console.log(result);

			if (result.data.success) {
				toast.success(result.data.message);
			}
			dispatch(getCashierList());
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message);
			} else {
				toast.error(error.message);
			}
		}
	};

export const { setCashier } = userSlice.actions;
export default userSlice.reducer;
