import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./../Features/productsListSlice"
import userReducer from "./../Features/userSlice"

export const store = configureStore({
    reducer: {
        productsList: productsReducer,
        user: userReducer
    }
})