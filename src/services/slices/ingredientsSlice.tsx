import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredientsList = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

export interface TIngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsState: (state) => state,
    ingredientsLoadingsState: (state) => state.isLoading,
    getIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredientsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredientsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getIngredientsState, ingredientsLoadingsState, getIngredients } =
  ingredientsSlice.selectors;
