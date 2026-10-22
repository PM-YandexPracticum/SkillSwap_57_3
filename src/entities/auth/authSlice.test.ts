import { configureStore } from '@reduxjs/toolkit'
import { afterEach, describe, expect, test, vi } from 'vitest'
import authReducer, {
  authUser,
  getIsAuthCheckedSelector,
  getUserSelector,
  logout,
  registerUser,
  updateUser,
} from './authSlice'
import type { AuthUserResponse } from '@/shared/types/apiTypes'
import type { RegisterUserData } from './types'

const user = {
  accessToken: 'test-token',
  user: {
    id: 1,
    name: 'Иван',
    email: 'test@mail.ru',
    bio: 'bio',
    birth_date: '2000-01-01',
    city_id: 1,
    gender_id: 1,
    creation_date: '2026-01-01',
    image_path: '',
    likes_count: 0,
  },
} as AuthUserResponse

const loginData = { email: 'test@mail.ru', password: '123456' }

const registerData = {
  name: 'Иван',
  email: 'test@mail.ru',
  password: '123456',
  date_birth: new Date('2000-01-01'),
  gender: { id: 1, title: 'Мужской' },
  city: { id: 1, title: 'Витебск' },
  bio: 'bio',
  image_path: new File([], 'avatar.png'),
  image_1: new File([], '1.png'),
  image_2: new File([], '2.png'),
  image_3: new File([], '3.png'),
  image_4: new File([], '4.png'),
  skillTitle: 'Барабаны',
  skillDescription: 'desc',
  canTeachSkillId: '1',
  canTeachSubskillId: '1',
  wantsToLearnSkillId: '2',
  wantsToLearnSubskillId: '2',
} as unknown as RegisterUserData

const createStore = () => configureStore({ reducer: { auth: authReducer } })

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('test extraReducer authSlice', () => {
  test('начальное состояние', () => {
    expect(authReducer(undefined, { type: 'UNKNOWN' })).toEqual({
      data: null,
      loading: false,
      error: null,
      isAuth: false,
      isAuthChecked: false,
    })
  })

  test('authUser.pending включает загрузку', () => {
    const state = authReducer(undefined, authUser.pending('request-id', loginData))
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  test('authUser.fulfilled сохраняет пользователя', () => {
    const state = authReducer(undefined, authUser.fulfilled(user, 'request-id', loginData))
    expect(state.data).toEqual(user)
    expect(state.isAuth).toBe(true)
    expect(state.isAuthChecked).toBe(true)
  })

  test('authUser.rejected сохраняет ошибку', () => {
    const error = new Error('ошибка: авторизация не удалась')
    const state = authReducer(undefined, authUser.rejected(error, 'request-id', loginData))
    expect(state.error).toBe('ошибка: авторизация не удалась')
    expect(state.isAuthChecked).toBe(true)
  })

  test('registerUser.fulfilled сохраняет пользователя', () => {
    const state = authReducer(undefined, registerUser.fulfilled(user, 'request-id', registerData))
    expect(state.data).toEqual(user)
    expect(state.isAuth).toBe(true)
  })

  test('registerUser.rejected сохраняет ошибку', () => {
    const error = new Error('ошибка: регистрация не удалась')
    const state = authReducer(undefined, registerUser.rejected(error, 'request-id', registerData))
    expect(state.error).toBe('ошибка: регистрация не удалась')
  })

  test('updateUser.fulfilled обновляет пользователя', () => {
    const state = authReducer(undefined, updateUser.fulfilled(user, 'request-id', {} as never))
    expect(state.data).toEqual(user)
  })

  test('AbortError не меняет стейт', () => {
    const error = new Error('aborted')
    error.name = 'AbortError'
    const prev = { data: null, loading: true, error: null, isAuth: false, isAuthChecked: false }
    expect(authReducer(prev, authUser.rejected(error, 'request-id', loginData))).toEqual(prev)
  })

  test('logout сбрасывает стейт', () => {
    const authedState = authReducer(undefined, authUser.fulfilled(user, 'request-id', loginData))
    const state = authReducer(authedState, logout())
    expect(state.data).toBeNull()
    expect(state.isAuth).toBe(false)
  })

  test('селекторы', () => {
    const store = createStore()
    store.dispatch(authUser.fulfilled(user, 'request-id', loginData))
    const state = store.getState()
    expect(getUserSelector(state)).toEqual(user)
    expect(getIsAuthCheckedSelector(state)).toBe(true)
  })
})

describe('authUser thunk', () => {
  test('авторизация успешна', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => user }),
    )

    const store = createStore()
    await store.dispatch(authUser(loginData))

    const state = store.getState().auth
    expect(state.data).toEqual(user)
    expect(state.isAuth).toBe(true)
  })

  test('ошибка сервера', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))

    const store = createStore()
    const result = await store.dispatch(authUser(loginData))

    expect(result.type).toBe(authUser.rejected.type)
    expect(store.getState().auth.isAuth).toBe(false)
  })
})