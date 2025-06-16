import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { constructorSlice } from './slices/constructorSlice';
import { feedsSlice } from './slices/feedSlice';
import { orderSlice } from './slices/orderSlice';
import { userSlice } from './slices/userSlice';
import { newOrderSlice } from './slices/newOrderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  constructorIngredients: constructorSlice.reducer,
  feeds: feedsSlice.reducer,
  newOrders: newOrderSlice.reducer,
  orders: orderSlice.reducer,
  userData: userSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
