import {
  addIngredients,
  constructorReducer,
  initialState,
  moveDownIngredient,
  moveUpIngredient,
  removeIngredient
} from './constructorSlice';
import { describe, test, expect } from '@jest/globals';

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

describe('Тест редьюсера конструктора', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('тест начального состояния', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('Тест добавления ингредиентов', () => {
    test('Добавляем булку', () => {
      const result = constructorReducer(
        initialState,
        addIngredients(mockBunIngredients)
      );

      expect(result.bun).toEqual(
        expect.objectContaining({
          ...mockBunIngredients,
          id: expect.any(String)
        })
      );
    });

    test('Добавляем ингредиент', () => {
      const result = constructorReducer(
        initialState,
        addIngredients(mockMainIngredients)
      );

      expect(result.ingredients).toEqual([
        { ...mockMainIngredients, id: expect.any(String) }
      ]);
    });

    test('Добавляем соуса', () => {
      const result = constructorReducer(
        initialState,
        addIngredients(mockSauceIngredients)
      );

      expect(result.ingredients).toEqual([
        { ...mockSauceIngredients, id: expect.any(String) }
      ]);
    });

    describe('Тест удаления ингредиента', () => {
      test('Удаляем ингредиент', () => {
        const result = constructorReducer(
          initialState,
          addIngredients(mockMainIngredients)
        );

        const resultRemove = constructorReducer(result, removeIngredient('1'));
        expect(resultRemove.ingredients).toHaveLength(1);
      });
    });

    test('Удаляем соуса', () => {
      const result = constructorReducer(
        initialState,
        addIngredients(mockSauceIngredients)
      );

      const resultRemove = constructorReducer(result, removeIngredient('1'));
      expect(resultRemove.ingredients).toHaveLength(1);
    });
  });

  describe('Тест изменения порядка ингредиентов', () => {
    test('Перемещаем ингредиенты вниз', () => {
      const stateWithFirstIngredient = constructorReducer(
        initialState,
        addIngredients(mockMainIngredients)
      );
      const stateWithTwoIngredients = constructorReducer(
        stateWithFirstIngredient,
        addIngredients(mockMainIngredients)
      );

      const [firstId, secondId] = stateWithTwoIngredients.ingredients.map(
        (i) => i.id
      );

      expect(stateWithTwoIngredients.ingredients).toHaveLength(2);

      const result = constructorReducer(
        stateWithTwoIngredients,
        moveDownIngredient(0)
      );

      expect(result.ingredients.map((i) => i.id)).toEqual([secondId, firstId]);
    });

    test('Перемещаем ингредиент вверх', () => {
      const stateWithFirstIngredient = constructorReducer(
        initialState,
        addIngredients(mockMainIngredients)
      );
      const stateWithTwoIngredients = constructorReducer(
        stateWithFirstIngredient,
        addIngredients(mockMainIngredients)
      );

      const [firstId, secondId] = stateWithTwoIngredients.ingredients.map(
        (i) => i.id
      );

      expect(stateWithTwoIngredients.ingredients).toHaveLength(2);

      const result = constructorReducer(
        stateWithTwoIngredients,
        moveUpIngredient(1)
      );

      expect(result.ingredients.map((i) => i.id)).toEqual([secondId, firstId]);
    });
  });
});
