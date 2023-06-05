import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

const initialState = {
  products: {},
};

export const productsListSlice = createSlice({
  name: "productsList",
  initialState,
  reducers: {
    setProducts: (initialState, action) => {
      initialState.products = action.payload;
    },
  },
});

export const getProductsListAsync = () => async (dispatch) => {
  try {
    const result = axios.get
  } catch (error) {}
};

export const { setProducts } = productsListSlice.actions;
export default productsListSlice.reducer;
