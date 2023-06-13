import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './../Features/productsListSlice';
import userReducer from './../Features/userSlice';
import transactionReducer from './../Features/transactionSlice';

export const store = configureStore({
	reducer: {
		productsList: productsReducer,
		user: userReducer,
		transaction: transactionReducer,
	},
});
