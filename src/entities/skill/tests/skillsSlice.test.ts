import { configureStore } from '@reduxjs/toolkit'
import { expect, test, vi, afterEach } from 'vitest'

import skillsReducer, { fetchSkills } from '@/entities/skill/model/skillsSlice'
import skillsMock from '@/entities/skill/mock/skillsMock.json'
import type { SkillsSliceState } from '../model/types'
import type { Skill } from '@/shared/types/apiTypes'

afterEach(() => {
  vi.unstubAllGlobals()
})

test('fetchSkills loads skills', async () => {
  const mockFetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => skillsMock,
  })

  vi.stubGlobal('fetch', mockFetch)

  const storeTest = configureStore({
    reducer: {
      skill: skillsReducer,
    },
  })

  await storeTest.dispatch(fetchSkills())

  expect(storeTest.getState().skill.data).toEqual(skillsMock)
  expect(storeTest.getState().skill.loading).toBe(false)
  expect(storeTest.getState().skill.error).toBe(null)
})

test('fetchSkills pending', () => {
  const initialState: SkillsSliceState = {
    data: null,
    loading: false,
    error: 'Старая ошибка',
  }

  const state = skillsReducer(initialState, fetchSkills.pending('request-id', undefined))

  expect(state.loading).toBe(true)
  expect(state.error).toBe(null)
})

test('fetchSkills fulfilled', () => {
  const initialState: SkillsSliceState = {
    data: null,
    loading: true,
    error: null,
  }

  const state = skillsReducer(
    initialState,
    fetchSkills.fulfilled(skillsMock as Skill[], 'request-id', undefined),
  )

  expect(state.loading).toBe(false)
  expect(state.error).toBe(null)
  expect(state.data).toEqual(skillsMock)
})

test('fetchSkills error', () => {
  const initialState: SkillsSliceState = {
    data: null,
    loading: true,
    error: null,
  }

  const error = new Error('Случилась ошибка')

  const state = skillsReducer(initialState, fetchSkills.rejected(error, 'request-id', undefined))

  expect(state.loading).toBe(false)
  expect(state.error).toBe('Случилась ошибка')
})

test('fetchSkills status 500', async () => {
  const mockFetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 500,
  })

  vi.stubGlobal('fetch', mockFetch)

  const storeTest = configureStore({
    reducer: {
      skill: skillsReducer,
    },
  })

  const result = await storeTest.dispatch(fetchSkills())

  expect(result.type).toBe(fetchSkills.rejected.type)
  expect(storeTest.getState().skill.loading).toBe(false)
  expect(storeTest.getState().skill.error).toBe('Rejected')
})

test('fetchSkills network error', async () => {
  const mockFetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))

  vi.stubGlobal('fetch', mockFetch)

  const storeTest = configureStore({
    reducer: {
      skill: skillsReducer,
    },
  })

  const result = await storeTest.dispatch(fetchSkills())

  expect(result.type).toBe(fetchSkills.rejected.type)
  expect(result.payload).toBe('Failed to fetch')
  expect(storeTest.getState().skill.error).toBe('Rejected')
})

test('fetchSkills abort', async () => {
  const mockFetch = vi.fn(
    (_url: string, { signal }: { signal: AbortSignal }) =>
      new Promise<never>((_resolve, reject) => {
        signal.addEventListener(
          'abort',
          () => {
            reject(new DOMException('The operation was aborted', 'AbortError'))
          },
          { once: true },
        )
      }),
  )

  vi.stubGlobal('fetch', mockFetch)

  const storeTest = configureStore({
    reducer: {
      skill: skillsReducer,
    },
  })

  const request = storeTest.dispatch(fetchSkills())

  request.abort()

  const result = await request

  if (result.meta.requestStatus !== 'rejected') {
    throw new Error('Ожидалось отклонённое действие после отмены')
  }

  expect(result.meta.aborted).toBe(true)
  expect(result.type).toBe(fetchSkills.rejected.type)
})
