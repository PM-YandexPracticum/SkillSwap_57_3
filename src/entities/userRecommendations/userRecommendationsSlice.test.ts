import { describe, test, expect } from 'vitest'
import reducer, { fetchRecommendations, initialState } from './userRecommendationsSlice'
import type { RecommendationItem } from './types'

const Recommendations: RecommendationItem[] = [{ id: 1 }] as RecommendationItem[]

describe('userRecommendationsSlice', () => {
  test('возвращает начальное состояние', () => {
    const state = reducer(undefined, { type: 'UNKNOWN' })

    expect(state).toEqual(initialState)
  })

  test('включает загрузку при pending', () => {
    const state = reducer(undefined, fetchRecommendations.pending('request-id', 1))

    expect(state).toEqual({
      data: null,
      loading: true,
      error: null,
    })
  })

  test('сохраняет данные при fulfilled', () => {
    const state = reducer(
      undefined,
      fetchRecommendations.fulfilled(Recommendations, 'request-id', 1),
    )

    expect(state).toEqual({
      data: Recommendations,
      loading: false,
      error: null,
    })
  })

  test('сохраняет ошибку при rejected', () => {
    const error = new Error('ошибка: рекоммендации не загрузились')
    const state = reducer(undefined, fetchRecommendations.rejected(error, 'request-id', 1))

    expect(state).toEqual({
      data: null,
      loading: false,
      error: 'ошибка: рекоммендации не загрузились',
    })
  })

  test('ничего не делает при AbortError', () => {
    const error = new Error('aborted')
    error.name = 'AbortError'
    const prev = { data: null, loading: true, error: null }

    const state = reducer(prev, fetchRecommendations.rejected(error, 'request-id', 1))

    expect(state).toEqual(prev)
  })
})
