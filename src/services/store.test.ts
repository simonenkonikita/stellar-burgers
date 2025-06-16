import store, { rootReducer } from './store';
import { describe, expect, test } from '@jest/globals';

describe('Проверка rootReducer', () => {
  // Получаем начальное состояние редюсера
  const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

  test('Начальное состояние rootReducer совпадает с состоянием store', () => {
    expect(initialState).toEqual(store.getState());
  });
});