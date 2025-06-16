import { ingredientsSlice, getIngredientsList } from './ingredientsSlice';

const mockMainIngredients = {
  _id: '643d69a5c3f7b9001cfa0941',
  id: '1',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const mockBunIngredients = {
  _id: '643d69a5c3f7b9001cfa093c',
  id: '2',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const mockSauceIngredients = {
  _id: '643d69a5c3f7b9001cfa0945',
  id: '3',
  name: 'Соус с шипами Антарианского плоскоходца',
  type: 'sauce',
  proteins: 101,
  fat: 99,
  carbohydrates: 100,
  calories: 100,
  price: 88,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
};

describe('Редьюсер слайса ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  test('устанавливаем isLoading в true при pending', () => {
    const action = { type: getIngredientsList.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  test('записываем ингредиенты и устанавливать isLoading в false при fulfilled', () => {
    const mockIngredients = [
      mockMainIngredients,
      mockBunIngredients,
      mockSauceIngredients
    ];
    const action = {
      type: getIngredientsList.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ingredients: mockIngredients,
      isLoading: false,
      error: null
    });
  });

  test('записываем ошибку и устанавливать isLoading в false при rejected', () => {
    const errorMessage = 'Ошибка при загрузке ингредиентов';
    const action = {
      type: getIngredientsList.rejected.type,
      error: { message: errorMessage }
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: errorMessage
    });
  });
});
