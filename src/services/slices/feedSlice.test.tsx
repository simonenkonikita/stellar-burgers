import { describe, expect, test } from '@jest/globals';
import { feedsSlice, getFeedsList } from './feedSlice';

const mockFeed = {
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

describe('Редьюсер слайса feedsSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: true,
    error: null
  };

  test('устанавливаем isLoading в true при pending', () => {
    const action = { type: getFeedsList.pending.type };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  test('обрабатываем успешную загрузку ленты заказов fulfilled', () => {
    const action = {
      type: getFeedsList.fulfilled.type,
      payload: {
        orders: mockFeed.orders,
        total: mockFeed.total,
        totalToday: mockFeed.totalToday
      }
    };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({
      orders: mockFeed.orders,
      total: mockFeed.total,
      totalToday: mockFeed.totalToday,
      isLoading: false,
      error: null
    });
  });

  test('записываем ошибку при загрузке ленты заказов и устанавливать isLoading в false при rejected', () => {
    const errorMessage = 'Ошибка при загрузке ленты заказов';
    const action = {
      type: getFeedsList.rejected.type,
      error: { message: errorMessage }
    };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: errorMessage
    });
  });
});
