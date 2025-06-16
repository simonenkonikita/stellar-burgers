import { getOrdersList, orderSlice } from './orderSlice';
import { describe, test, expect } from '@jest/globals';

const mockOrders = {
  success: true,
  orders: [
    {
      _id: '684e8b7dc2f30c001cb2cd88',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-15T08:59:41.572Z',
      updatedAt: '2025-06-15T08:59:42.296Z',
      number: 81501
    },
    {
      _id: '684e8b92c2f30c001cb2cd89',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-15T09:00:02.930Z',
      updatedAt: '2025-06-15T09:00:03.787Z',
      number: 81502
    },
    {
      _id: '684e8d10c2f30c001cb2cd8e',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-15T09:06:24.095Z',
      updatedAt: '2025-06-15T09:06:24.795Z',
      number: 81503
    }
  ],
  total: 81198,
  totalToday: 131
};

describe('Редьюсер слайса orderSlice', () => {
  const initialState = {
    orders: [],
    isLoading: true,
    error: null
  };

  test('должен устанавливать isLoading в true при начале загрузки заказов', () => {
    const action = { type: getOrdersList.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  test('должен корректно обрабатывать успешную загрузку заказов', () => {
    const action = {
      type: getOrdersList.fulfilled.type,
      payload: mockOrders
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      orders: mockOrders,
      isLoading: false,
      error: null
    });
  });

  test('должен корректно обрабатывать ошибку при загрузке заказов', () => {
    const errorMessage = 'Ошибка: невозможно загрузить заказы';
    const action = {
      type: getOrdersList.rejected.type,
      error: { message: errorMessage }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: errorMessage
    });
  });
});
