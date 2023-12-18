import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {URL} from "../../URL.js"
// Create new Order
export const saveOrder = createAsyncThunk(
  "cart/saveOrder",
  async ({formData}, thunkAPI) => {
    // alert(JSON.stringify(formData))
    try {
      const response = await axios.post(`${URL}/order`, formData ,{
        // headers: {
        //   authtoken,
        // },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ******  Get a handleChangeStatus   handleChangeCompany
export const handleChangeStatus = createAsyncThunk(
  "cart/gethandleChangeStatus",
  async ({authtoken,formData}, thunkAPI) => {
    try {
      const response = await axios.post(`${URL}order/updateorder`, formData ,{
        headers: {
          authtoken,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// handleChangeNoShip
// ******  Get a handleChangeNoShip
export const handleChangeNoShip = createAsyncThunk(
  "cart/gethandleChangeNoShip",
  async ({authtoken,formData}, thunkAPI) => {
    try {
      const response = await axios.post(`${URL}order/updateship`, formData ,{
        headers: {
          authtoken,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// ******  Get a  handleChangeCompany
export const handleChangeCompany = createAsyncThunk(
  "cart/handleChangeCompany",
  async ({authtoken,formData}, thunkAPI) => {
    try {
      const response = await axios.post(`${URL}order/updateordercompany`, formData ,{
        headers: {
          authtoken,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOrders = createAsyncThunk(
  "cart/getAll",
  async (authtoken, thunkAPI) => {

    try {
      const response = await axios.get(`${URL}order/getOrders` ,{
        headers: {
          authtoken,
        },
      });
  
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// ******  Get a order id
export const getOrder = createAsyncThunk(
  "cart/getOrderId",
  async ({authtoken,id}, thunkAPI) => {
    
    try {
      const response = await axios.get(`${URL}order/getOrder/` + id,{
        headers:{
          authtoken
        }
      });
     
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        // alert("หมดเวลากรูณาloginใหม่")
      // console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    orders: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
     ;
        state.isSuccess = true;
        state.isError = false;
    
        state.order = action.payload;
        state.orderItems = action.payload;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
     ;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.orders = action.payload;
      });
  },
});



export const selectOrder = (state) => state.order.orders;
export const selectUserOrder = (state) => state.order;
export default orderSlice.reducer;
