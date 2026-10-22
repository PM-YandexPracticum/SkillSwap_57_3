import type { User } from '@/shared/types/apiTypes'
import { describe, test, expect } from 'vitest'
import reducer, { addToFavorites, fetchFavorites } from './favoriteSlice'

const user: User = {
  id: 1,
  name: 'Александр',
  image_path: '/avatar.png',
  likes_count: 0,
  creation_date: '2026-10-22',
  age: 34,
  isLiked: true,
  city: { id: 1, title: 'Москва' },
  canTeach: [],
  wantsToLearn: [],
  gender: { id: 1, title: 'Мужчина' },
}

const users: User[] = [user]

describe('test extraReducer favoriteSlice', () => {
  test('fetchFavorites.pending', () => {
    const state = reducer(undefined, fetchFavorites.pending('request-id', 1))

    expect(state).toEqual({
      data: null,
      lastFetched: null,
      loading: true,
      error: null,
    })
  })

  test('fetchFavorites.fulfilled', () => {
    const state = reducer(undefined, fetchFavorites.fulfilled(users, 'request-id', 1))

    expect(state).toEqual({
      data: users,
      lastFetched: expect.any(Number),
      loading: false,
      error: null,
    })
  })

  test('fetchFavorites.rejected AbortError', () => {
    const error = new Error('отмена запроса')
    error.name = 'AbortError'

    const state = reducer(undefined, fetchFavorites.rejected(error, 'request-id', 1))

    expect(state).toEqual({
      data: null,
      lastFetched: null,
      loading: false,
      error: null,
    })
  })

  test('fetchFavorites.rejected', () => {
    const error = new Error('ошибка: данные не загружены')

    const state = reducer(undefined, fetchFavorites.rejected(error, 'request-id', 1))

    expect(state).toEqual({
      data: null,
      lastFetched: null,
      loading: false,
      error: 'ошибка: данные не загружены',
    })
  })

  test('addToFavorites.fulfilled', () => {
    const state = reducer(
      undefined,
      addToFavorites.fulfilled(users, 'request-id', { userId: 1, likedUserId: 2 }),
    )

    expect(state).toEqual({
      data: users,
      lastFetched: expect.any(Number),
      loading: false,
      error: null,
    })
  })
})
