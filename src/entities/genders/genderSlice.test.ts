import { describe, it, expect } from 'vitest'
import reducer, { fetchGenders } from './genderSlice'

const state = {
  data: [],
  loading: false,
  error: null,
}

describe('genderSlice', () => {
  it('возвращает начальное состояние', () => {
    expect(reducer(undefined, { type: 'UNKNOWN' })).toEqual(state)
  })

  it('включает загрузку при pending', () => {
    const newState = reducer(state, { type: fetchGenders.pending.type })
    expect(newState.loading).toBe(true)
    expect(newState.error).toBeNull()
  })

  it('сохраняет данные при fulfilled', () => {
    const mockData = [
      { id: 1, title: 'Мужчина' },
      { id: 2, title: 'Женщина' },
    ]
    const newState = reducer(state, {
      type: fetchGenders.fulfilled.type,
      payload: mockData,
    })
    
    expect(newState.loading).toBe(false)
    expect(newState.data).toEqual(mockData)
  })

  it('сохраняет ошибку при rejected', () => {
    const newState = reducer(state, {
      type: fetchGenders.rejected.type,
      error: { message: 'Ошибка сервера', name: 'Error' },
    })
    
    expect(newState.loading).toBe(false)
    expect(newState.error).toBe('Ошибка сервера')
  })

  it('ничего не делает при AbortError', () => {
    const loadingState = { ...state, loading: true }
    const newState = reducer(loadingState, {
      type: fetchGenders.rejected.type,
      error: { message: 'Отменено', name: 'AbortError' },
    })
    
    expect(newState).toEqual(loadingState)
  })
})