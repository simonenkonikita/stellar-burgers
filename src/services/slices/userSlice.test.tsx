import { userSlice } from './userSlice';
import {
  getUserData,
  registerUser,
  loginUser,
  updateUser,
  logout,
  initUser
} from './userSlice';

// Моковые данные
const mockUser = {
  user: {
    name: 'Test User',
    email: 'test@yandex.ru'
  }
};

jest.mock('../../utils/burger-api', () => ({
  getUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  logoutApi: jest.fn(),
  registerUserApi: jest.fn(),
  updateUserApi: jest.fn()
}));

jest.mock('../../utils/cookie', () => ({
  getCookie: jest.fn(),
  setCookie: jest.fn()
}));

describe('Редьюсер userSlice', () => {
  const initialState = {
    isAuthChecked: false,
    isLoading: false,
    user: null,
    error: null
  };

  afterAll(() => {
    jest.clearAllMocks();
  });

  /* Регистрация */
  describe('registerUser', () => {
    test('должен обрабатывать начальное состояние регистрации', () => {
      const action = { type: registerUser.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('должен обрабатывать успешную регистрацию', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userSlice.reducer(initialState, action);

      expect(state).toEqual({
        isAuthChecked: true,
        isLoading: false,
        user: mockUser,
        error: null
      });
    });

    test('должен обрабатывать ошибку регистрации', () => {
      const errorMessage = 'Ошибка при регистрации';
      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage
      });
    });
  });

  /* Авторизация */
  describe('loginUser', () => {
    test('должен обрабатывать начальное состояние входа', () => {
      const action = { type: loginUser.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('должен обрабатывать успешный вход', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice.reducer(initialState, action);

      expect(state).toEqual({
        isAuthChecked: true,
        isLoading: false,
        user: mockUser,
        error: null
      });
    });

    test('должен обрабатывать ошибку входа', () => {
      const errorMessage = 'Ошибка входа';
      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage
      });
    });
  });

  // Изменение данных пользователя
  test('проверим updateUser.pending', () => {
    const action = {
      type: updateUser.pending.type
    };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('проверим updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      user: mockUser.user,
      isLoading: false
    });
  });

  test('проверим updateUser.rejected', () => {
    const errorMessage = 'Ошибка обновления данных пользователя';
    const action = {
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: errorMessage
    });
  });

  /* Выход */
  describe('logout', () => {
    test('должен обрабатывать начальное состояние выхода', () => {
      const action = { type: logout.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('должен обрабатывать успешный выход', () => {
      const action = { type: logout.fulfilled.type };
      const state = userSlice.reducer(
        { ...initialState, user: mockUser.user, isAuthChecked: true },
        action
      );

      expect(state).toEqual({
        isAuthChecked: true,
        isLoading: false,
        user: null,
        error: null
      });
    });
  });

  /* Инициализация пользователя */
  describe('initUser', () => {
    test('должен помечать проверку авторизации как завершенную', () => {
      const action = { type: initUser.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    test('должен помечать проверку авторизации как завершенную', () => {
      const action = { type: initUser.fulfilled.type };
      const state = userSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        isAuthChecked: true
      });
    });

    test('должен помечать проверку авторизации как завершенную', () => {
      const action = { type: initUser.rejected.type };
      const state = userSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        isAuthChecked: true
      });
    });
  });
});
