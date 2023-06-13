import { createSlice } from "@reduxjs/toolkit";
import urlAPI from "../../Supports/Constant/urlAPI";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  orderDetail: [],
  totalPrice: 0,
  statusOrder: null,
  sales: {},
};

let userLogin = JSON.parse(localStorage?.getItem('userLogin'));

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setOrderDetail: (initialState, action) => {
      initialState.orderDetail = action.payload.orderDetail;
      initialState.totalPrice = action.payload.totalPrice;
      initialState.statusOrder = action.payload.status;
    },
    setSalesAggregate: (initialState, action) => {
			initialState.sales = action.payload;
		},
  },
});

export const getOrderDetailList = () => async (dispatch) => {
  try {
    const result = await axios.get(`${urlAPI}/transactions/`);
    const checkStatus = await axios.get(`${urlAPI}/transactions/order/status`);
    console.log(checkStatus.data);
    let totalPrice = 0;
    result.data.data.map((value, index) => {
      totalPrice += value?.total;
    });
    // console.log(result.data.data, totalPrice, "masukkkkkkkkkkk woi");
    dispatch(
      setOrderDetail({
        orderDetail: result.data,
        totalPrice,
        status: checkStatus.data.success,
      })
    );
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }
};

export const addProductOrder = (productId, price) => async (dispatch) => {
  try {
    const result = await axios.post(`${urlAPI}/transactions/orderdetail`, {
      productId: productId,
      price: price,
    });
    if (result.data.success) {
      toast.success(result.data.message);
    } else {
      throw { message: "Add Product Failed" };
    }
    dispatch(getOrderDetailList());
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }
};

export const reduceProductOrder =
  (id, amount, userId, price) => async (dispatch) => {
    try {
      const result = await axios.patch(
        `${urlAPI}/transactions/orderdetail/reduce`,
        {
          id: id,
          amount: amount,
          userId: userId,
          price: price,
        }
      );

      if (result.data.success) {
        toast.success(result.data.message);
      } else {
        throw { message: "Add Product Failed" };
      }
      dispatch(getOrderDetailList());
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

export const onCharge = (userId) => async (dispatch) => {
  try {
    const result = await axios.patch(`${urlAPI}/transactions/oncharge`, {
      userId: userId,
    });
    if (result.data.success) {
      toast.success(result.data.message);
    } else {
      throw { message: "Add Product Failed" };
    }
    dispatch(getOrderDetailList());
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }
};

export const createOrder = (userId) => async (dispatch) => {
  try {
    const result = await axios.post(`${urlAPI}/transactions/order/create`, {
      userId: userId,
    });
    if (result.data.success) {
      toast.success(result.data.message);
    } else {
      throw { message: "Add Product Failed" };
    }
    dispatch(getOrderDetailList())
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }
};

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

export const { setOrderDetail, setSalesAggregate } = transactionSlice.actions;
export default transactionSlice.reducer;
