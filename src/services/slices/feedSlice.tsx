import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeedsList = createAsyncThunk('feed/getAll', getFeedsApi);

export interface TFeedsState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: true,
  error: null
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedsState: (state) => state,
    getFeedsLoadingsState: (state) => state.isLoading,
    getOrdersState: (state) => state.orders,
    getFeedsTotal: (state) => state.total,
    getFeedsTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getFeedsList.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
        state.error = null;
      });
  }
});

export const {
  getFeedsState,
  getFeedsLoadingsState,
  getOrdersState,
  getFeedsTotal,
  getFeedsTotalToday
} = feedsSlice.selectors;
