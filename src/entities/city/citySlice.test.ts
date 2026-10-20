import { describe, test, expect } from 'vitest'
import reducer, { fetchCities } from './citySlice'
import type { City } from '@/shared/types/apiTypes'

const Cities: City[] = [
  {id: 1,
  title: "Москва"
  }
]

describe('test extraReducer citySlice', () => {
   test('fetchCities.pending', () => {
    const state = reducer(
      undefined,
      fetchCities.pending('request-id', undefined),
    )

    expect(state).toEqual({
      data: [],
      loading: true,
      error: null,
    })
  })
  test('fetchCities.fulfilled', () => {
    const state = reducer(
      undefined,
      fetchCities.fulfilled(Cities, 'request-id', undefined),
    )

    expect(state).toEqual({
      data: Cities,
      loading: false,
      error: null,
    })
  })
  test('fetchCities.rejected', () => {
    const error = new Error('ошибка: данные не загружены')
    const state = reducer(
      undefined,
      fetchCities.rejected(error, 'request-id', undefined),
    )

    expect(state).toEqual({
      data: [],
      loading: false,
      error: 'ошибка: данные не загружены',
    })
  })
})
