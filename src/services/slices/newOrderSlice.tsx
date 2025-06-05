import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrdersList = createAsyncThunk('orders/getAll', orderBurgerApi);

export interface TNewOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null | undefined;
}

export const initialState: TNewOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const newOrderSlice = createSlice({
  name: 'newOrders',
  initialState,
  reducers: {
    resetOrder: (state) => (state = initialState)
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersList.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getOrdersList.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getOrdersList.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
  }
});
export const { resetOrder } = newOrderSlice.actions;
export const { getOrderRequest, getOrderModalData } = newOrderSlice.selectors;
