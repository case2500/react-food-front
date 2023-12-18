import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {URL} from "../../URL.js"
import axios from "axios";
const API_URL = `${URL}/category/`;

const authtoken = JSON.parse(localStorage.getItem("token"))

const initialState = {
  category: null,
  categorys: [],
  isError: false,
  isSuccess: false,

};

// ***************** createCategory
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}`, formData,{
        haders:{
          authtoken
        }
      });  
      alert(JSON.stringify(response.data))
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

// ***************** Update updateCategory
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ formData }, thunkAPI) => {
    // alert(id)
    try {
      const response = await axios.put(`${API_URL}`, formData,{
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
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ***************** getCategories
export const getCategories = createAsyncThunk(
  "category/getAll",
  async (_, thunkAPI) => {   
    try {

      const response = await axios.get(API_URL);  

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

// *****************  getCategory
export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (id, thunkAPI) => {
    try {
      // console.log(id);
      const response = await axios.get(API_URL + id);
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

// *****************  del product
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (  id , thunkAPI) => {
     try {
      // alert("del"+id)
       const response = await axios.delete(`${URL}/category/` + id, {
        //  headers: {
        //      authtoken
        //  }
     })
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

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {

        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload);    
        state.categorys = action.payload;
        //  alert(JSON.stringify(state.categorys))
      })
      .addCase(getCategories.rejected, (state, action) => {
        
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload);
        state.category = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
  },
});

export const selectCategory = (state) => state.category.category;
export const selectCategorys = (state) => state.category.categorys;
export default categorySlice.reducer;
