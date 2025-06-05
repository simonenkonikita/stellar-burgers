import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TConstructorIngredientsState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorIngredientsState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    resetConstructor: (state) => (state = initialState),
    updateConstructor: (
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.ingredients = action.payload;
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const { ingredients } = state;

      if (index < ingredients.length - 1) {
        const updatedIngredients = [...ingredients];

        [updatedIngredients[index], updatedIngredients[index + 1]] = [
          updatedIngredients[index + 1],
          updatedIngredients[index]
        ];
        state.ingredients = updatedIngredients;
      }
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const { ingredients } = state;

      if (index > 0) {
        const updatedIngredients = [...ingredients];

        [updatedIngredients[index], updatedIngredients[index - 1]] = [
          updatedIngredients[index - 1],
          updatedIngredients[index]
        ];

        state.ingredients = updatedIngredients;
      }
    }
  },
  selectors: {
    constructorSelectors: (state) => state
  }
});

export const {
  addIngredients,
  removeIngredient,
  resetConstructor,
  updateConstructor,
  moveDownIngredient,
  moveUpIngredient
} = constructorSlice.actions;

export const constructorSelectors = constructorSlice.selectors;
