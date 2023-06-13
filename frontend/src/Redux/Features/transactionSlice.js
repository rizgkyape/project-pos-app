import { createSlice } from '@reduxjs/toolkit';
import urlAPI from '../../Supports/Constant/urlAPI';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
	sales: {},
};

let userLogin = JSON.parse(localStorage?.getItem('userLogin'));

export const transactionSlice = createSlice({
	name: 'transaction',
	initialState,
	reducers: {
		setSalesAggregate: (initialState, action) => {
			initialState.sales = action.payload;
		},
	},
});

export const getSalesAggregate = (startDate, endDate) => async (dispatch) => {
	try {
		const result = await axios.get(`${urlAPI}/transactions/report/aggregate`, {
			params: {
				startDate: startDate,
				endDate: endDate,
			},
			headers: {
				authorization: `Bearer ${userLogin.token}`,
			},
		});

		dispatch(setSalesAggregate(result.data));
	} catch (error) {
		console.log(error.message);
	}
};

export const { setSalesAggregate } = transactionSlice.actions;
export default transactionSlice.reducer;
