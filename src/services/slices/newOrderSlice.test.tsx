import { describe, test, expect } from '@jest/globals';
import { getOrdersList, newOrderSlice } from './newOrderSlice';

const mockOrder = {
      order: {
        _id: '664de3b36a8038001bb0a837',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2025-05-21T12:00:00.000Z',
        updatedAt: '2025-05-21T12:00:30.000Z',
        number: 12345
      }
    };

describe('Редьюсер слайса newOrderSlice', () => {
  const initialState = {
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  test('устанавливаем orderRequest в true при начале создания заказа pending', () => {
    const action = { type: getOrdersList.pending.type };
    const state = newOrderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: true
    });
  });

  test('должен корректно обрабатывать успешное создание заказа rejected', () => {
    const action = {
      type: getOrdersList.fulfilled.type,
      payload: mockOrder
    };
    const state = newOrderSlice.reducer(initialState, action);
    expect(state).toEqual({
      orderRequest: false,
      orderModalData: mockOrder.order,
      error: null
    });
  });

  test('обрабатывать ошибку при создании заказа', () => {
    const errorMessage = 'Ошибка';
    const action = {
      type: getOrdersList.rejected.type,
      error: { message: errorMessage }
    };
    const state = newOrderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: errorMessage
    });
  });
});
