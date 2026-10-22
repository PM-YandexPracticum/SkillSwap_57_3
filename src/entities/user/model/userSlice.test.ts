import { configureStore } from '@reduxjs/toolkit'
import { describe, test, expect, vi, afterEach } from 'vitest'
import userReducer, { fetchUsers, fetchUser } from './userSlice'
import { API_URL } from '@/shared/config/api'
import type { UserSliceState } from './types'
import type { CatalogUserResponse, SingleUser, User } from '@/shared/types/apiTypes'

const initialState: UserSliceState = {
  data: null,
  loading: false,
  error: null,
  currentUser: null,
}

const user: User = {
  id: 1,
  name: 'Мария',
  image_path: '/avatar.png',
  likes_count: 0,
  creation_date: '2026-10-01',
  age: 25,
  isLiked: false,
  city: { id: 1, title: 'Москва' },
  canTeach: [],
  wantsToLearn: [],
  gender: { id: 2, title: 'Женщина' },
}

const users: CatalogUserResponse = {
  topByLikes: [user],
  newest: [],
  byName: [user],
}

const currentUser: SingleUser = {
  id: 1,
  name: 'Мария',
  image_path: null,
  bio: 'Хочу научиться рисовать',
  age: 25,
  city: { id: 1, title: 'Москва' },
  canTeach: [],
  wantsToLearn: [],
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('userSlice extraReducers', () => {
  test('возвращает начальное состояние', () => {
    const state = userReducer(undefined, { type: 'UNKNOWN' })

    expect(state).toEqual(initialState)
  })

  test('не изменяет состояние при неизвестном действии', () => {
    const previousState: UserSliceState = {
      ...initialState,
      data: users,
      currentUser,
    }

    const state = userReducer(previousState, { type: 'UNKNOWN' })

    expect(state).toEqual(previousState)
  })

  test('включает загрузку и сбрасывает ошибку при pending', () => {
    const previousState: UserSliceState = {
      ...initialState,
      error: 'Старая ошибка',
    }

    const state = userReducer(previousState, fetchUsers.pending('request-id', undefined))

    expect(state).toEqual({
      ...previousState,
      loading: true,
      error: null,
    })
  })

  test('сохраняет каталог при fulfilled', () => {
    const previousState: UserSliceState = {
      ...initialState,
      loading: true,
      currentUser,
    }

    const state = userReducer(previousState, fetchUsers.fulfilled(users, 'request-id', undefined))

    expect(state).toEqual({
      ...previousState,
      data: users,
      loading: false,
    })
  })

  test('сохраняет ошибку при rejected', () => {
    const previousState: UserSliceState = {
      ...initialState,
      data: users,
      loading: true,
    }
    const error = new Error('Ошибка сети')

    const state = userReducer(previousState, fetchUsers.rejected(error, 'request-id', undefined))

    expect(state).toEqual({
      ...previousState,
      loading: false,
      error: 'Ошибка сети',
    })
  })

  test('использует запасной текст ошибки', () => {
    const previousState: UserSliceState = { ...initialState, loading: true }

    const state = userReducer(previousState, {
      type: fetchUsers.rejected.type,
      error: {},
    })

    expect(state).toEqual({
      ...previousState,
      loading: false,
      error: 'Ошибка загрузки пользователей',
    })
  })

  test('не меняет состояние при AbortError', () => {
    const previousState: UserSliceState = {
      ...initialState,
      data: users,
      loading: true,
    }

    const error = new Error('Запрос отменён')
    error.name = 'AbortError'

    const state = userReducer(previousState, fetchUsers.rejected(error, 'request-id', undefined))

    expect(state).toEqual(previousState)
  })

  test('сохраняет выбранного пользователя при fulfilled', () => {
    const previousState: UserSliceState = {
      ...initialState,
      data: users,
      currentUser: { ...currentUser, id: 2, name: 'Иван' },
    }

    const state = userReducer(previousState, fetchUser.fulfilled(currentUser, 'request-id', '1'))

    expect(state).toEqual({
      ...previousState,
      currentUser,
    })
  })
})

describe('userSlice async thunks', () => {
  test('fetchUsers сохраняет полученный каталог', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => users,
    })

    vi.stubGlobal('fetch', mockFetch)

    const storeTest = configureStore({
      reducer: {
        user: userReducer,
      },
    })

    await storeTest.dispatch(fetchUsers())

    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/api/users`, expect.anything())
    expect(storeTest.getState().user.data).toEqual(users)
    expect(storeTest.getState().user.loading).toBe(false)
    expect(storeTest.getState().user.error).toBeNull()
  })

  test('fetchUser запрашивает пользователя по id и сохраняет его', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => currentUser,
    })

    vi.stubGlobal('fetch', mockFetch)

    const storeTest = configureStore({
      reducer: {
        user: userReducer,
      },
    })

    await storeTest.dispatch(fetchUser('1'))

    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/api/users/1`, expect.anything())
    expect(storeTest.getState().user.currentUser).toEqual(currentUser)
  })

  test('fetchUsers: ошибка 500', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    })

    vi.stubGlobal('fetch', mockFetch)

    const storeTest = configureStore({
      reducer: {
        user: userReducer,
      },
    })

    const result = await storeTest.dispatch(fetchUsers())

    expect(result.type).toBe(fetchUsers.rejected.type)
    expect(result.payload).toBe('HTTP 500')
    expect(storeTest.getState().user.loading).toBe(false)
    expect(storeTest.getState().user.error).toBe('Rejected')
  })
})
