import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import urlAPI from '../../Supports/Constant/urlAPI';

const initialState = {
	products: {},
	category: {},
};

export const productsListSlice = createSlice({
	name: 'productsList',
	initialState,
	reducers: {
		setProducts: (initialState, action) => {
			initialState.products = action.payload;
		},
		setCategory: (initialState, action) => {
			initialState.category = action.payload;
		},
	},
});

export const getProductsListAsync =
	(page, category, name, sortBy, sort) => async (dispatch) => {
		try {
			console.log('getProductsListAsync');
			const result = await axios.get(`http://localhost:5678/products`, {
				params: {
					name: name,
					sortBy: sortBy,
					sort: sort,
					category: category,
					page: page,
				},
			});
			dispatch(setProducts(result.data));
		} catch (error) {
			console.log(error.message);
		}
	};

export const getCategoryProducts = () => async (dispatch) => {
	try {
		const result = await axios.get(`${urlAPI}/products/getcategory`);
		dispatch(setCategory(result.data));
	} catch (error) {
		console.log(error.message);
	}
};

export const addProduct =
	(category, productName, price, stock, expiredDate, imageLink, image) =>
	async (dispatch) => {
		try {
			const result = await axios.post(
				`${urlAPI}/products`,
				{
					categoryId: category,
					name: productName,
					price: price,
					stock: stock,
					expiredDate: expiredDate,
					imageLink: imageLink,
					image: image,
				},
				{
					headers: {
						'content-type': 'multipart/form-data',
					},
				}
			);

			if (result) {
				toast.success('Add Product Success');
			} else {
				throw { message: 'Add Product Failed' };
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

export const editProduct =
	(id, category, productName, price, stock, expiredDate, imageLink, image) =>
	async (dispatch) => {
		try {
			const result = await axios.put(
				`${urlAPI}/products/modify/${id}`,
				{
					categoryId: category,
					name: productName,
					price: price,
					stock: stock,
					expiredDate: expiredDate,
					imageLink: imageLink,
					image: image,
				},
				{
					headers: {
						'content-type': 'multipart/form-data',
					},
				}
			);

			if (result) toast.success('Edit product success!');
		} catch (error) {
			toast.error(error.message);
		}
	};

export const deleteProduct = (id) => async (dispatch) => {
	try {
		const result = await axios.delete(`${urlAPI}/products/delete/${id}`);

		if (result) toast.success('Delete product success!');
		dispatch(getProductsListAsync());
	} catch (error) {
		toast.error(error.message);
	}
};

export const addProductCategory = (category) => async (dispatch) => {
	try {
		const result = await axios.post(`${urlAPI}/products/categories`, {
			category: category,
		});

		if (result) toast.success('Add product category success!');
		dispatch(getCategoryProducts());
	} catch (error) {
		toast.error(error.message);
	}
};

export const editProductCategory = (id, category) => async (dispatch) => {
	try {
		const result = await axios.put(
			`${urlAPI}/products/categories/modify/${id}`,
			{
				category: category,
			}
		);

		if (result) toast.success('Edit product success!');
		dispatch(getCategoryProducts());
	} catch (error) {
		toast.error(error.message);
	}
};

export const { setProducts, setCategory } = productsListSlice.actions;
export default productsListSlice.reducer;
