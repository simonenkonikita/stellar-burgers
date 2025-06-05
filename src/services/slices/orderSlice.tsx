import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrdersList = createAsyncThunk('orders/getAll', getOrdersApi);

export interface TOrdersState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: TOrdersState = {
  orders: [],
  isLoading: true,
  error: null
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersState: (state) => state.orders,
    getOrdesLoadingsState: (state) => state.isLoading,
    getErrorState: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrdersList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrdersList.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.error = null;
        console.log('Fetched orders:', action.payload);
      });
  }
});

export const { getOrdersState, getOrdesLoadingsState, getErrorState } =
  orderSlice.selectors;
