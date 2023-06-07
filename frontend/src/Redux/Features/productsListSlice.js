import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import urlAPI from "../../Supports/Constant/urlAPI";

const initialState = {
  products: {},
  category: {}
};

export const productsListSlice = createSlice({
  name: "productsList",
  initialState,
  reducers: {
    setProducts: (initialState, action) => {
      initialState.products = action.payload;
    },
    setCategory: (initialState, action) => {
      initialState.category = action.payload
    }
  },
});

export const getProductsListAsync = (page, category, name, sortBy, sort) => async (dispatch) => {
  try {
    const result = await axios.get(`http://localhost:5678/products?name=${name}&sortBy=${sortBy}&sort=${sort}&category=${category}&page=${page}`)
    dispatch(setProducts(result.data))

  } catch (error) {}
};

export const getCategoryProducts = () => async (dispatch) => {
  try {
    const result = await axios.get(`${urlAPI}/products/getcategory`)
    dispatch(setCategory(result.data))
  } catch (error) {
    
  }
}

export const { setProducts, setCategory } = productsListSlice.actions;
export default productsListSlice.reducer;
