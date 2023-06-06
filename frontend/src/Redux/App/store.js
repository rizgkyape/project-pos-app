import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./../Features/productsListSlice"

export const store = configureStore({
    reducer: {
        productsList: productsReducer
    }
})