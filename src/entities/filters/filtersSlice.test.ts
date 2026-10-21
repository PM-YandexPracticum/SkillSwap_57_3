import { describe, it, expect } from 'vitest'
import reducer, {
  setMode,
  setSearch,
  toggleSkill,
  toggleSubskill,
  selectParentCategory,
  toggleCity,
  toggleGender,
  setSortBy,
  toggleSortOrder,
  resetFilters,
} from './filterSlice'
import { initialUserFilters } from './types'
import type { UserFilters} from './types'

const makeState = (overrides:Partial<UserFilters> = {}) => ({
  users: {...initialUserFilters, ...overrides},
})

describe('FiltersSlice', () => {
  it('возвращает начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown'})).toEqual({
      users: initialUserFilters,
    })
  })
})

describe('простые сеттеры', () => {
  it('setMode меняет режим', () => {
    const state = reducer(makeState(), setMode('canTeach'))
    expect(state.users.mode).toBe('canTeach')
  })

it('setSearch записывает строку поиска', () => {
  const state = reducer(makeState(), setSearch('react'))
  expect(state.users.search).toBe('react')
  })

it('setSortBy меняет поле сортировки ',() => {
  const state = reducer(makeState(), setSortBy('age'))
  expect(state.users.sortBy).toBe('age')
  })
})

describe('toggleSkill', () => {
  it('добавляет навык если его не было', () => {
    const state = reducer(makeState(), toggleSkill({ id: 1, subskillIds: [10, 11] }))
    expect(state.users.skillIds).toEqual([1]);
  })

  it('при добавлении не трогает subskillIds', () =>{
    const prev = makeState({ subskillIds: [99]})
    const state = reducer (prev, toggleSkill({ id: 1, subskillIds:[10, 11]}))
    expect(state.users.subskillIds).toEqual([99])
  })

  it('убирает навык и его подкатегории', () => {
    const prev = makeState({ skillIds:[1, 2], subskillIds: [10, 11, 20]})
    const state = reducer(prev, toggleSkill({ id: 1, subskillIds: [10, 11] }))
    expect(state.users.skillIds).toEqual([2])
    expect(state.users.subskillIds).toEqual([20])
  })
})

describe('toggleSubskill', () => {
  it('добавляет подкотегорию', () =>{
    const state = reducer(makeState(), toggleSubskill(5))
    expect(state.users.subskillIds).toEqual([5])
  })

  it('убирает подкатегорию при повторном вызове', () =>{
    const state = reducer(makeState({ subskillIds: [5, 6]}), toggleSubskill(5))
    expect(state.users.subskillIds).toEqual([6])
  })
})

describe('selectParentCategory', () => {
  it('добавляет подкатегорию, если ее нет ',() => {
    const state = reducer(makeState(), selectParentCategory(3))
    expect(state.users.skillIds).toEqual([3])
  })

  it('не дублирует уже выбранную категорию', () =>{
    const state = reducer(makeState({ skillIds: [3]}), selectParentCategory(3))
    expect(state.users.skillIds).toEqual([3])
  })
})

describe('toggleCity', () => {
  it('добавляет город', () => {
    const state = reducer(makeState(), toggleCity(1))
      expect(state.users.cityIds).toEqual([1])
  })

  it('убирает город при повтороном вызове', () => {
    const state = reducer(makeState({ cityIds: [1, 2]}), toggleCity(1))
    expect(state.users.cityIds).toEqual([2]);
  })
})

describe('toggleGender', () => {
  it('добавляет пол', () => {
    const state = reducer(makeState(), toggleGender(1))
    expect(state.users.genderIds).toEqual([1])
  })

  it('убирает пол при повторном вызове', () => {
    const state = reducer(makeState({ genderIds: [1, 2]}),toggleGender(1))
    expect(state.users.genderIds).toEqual([2]);
  })
})

describe('toggleSortOrder', () => {
  it("asc ? desc", () => {
    const state = reducer(makeState({ sortOrder: 'asc'}), toggleSortOrder())
    expect(state.users.sortOrder).toBe('desc')
  })

  it('desc : asc', () => {
    const state = reducer(makeState({ sortOrder: 'desc'}),toggleSortOrder())
    expect(state.users.sortOrder).toBe('asc')
  })
})

describe("resetFilters", () => {
  it('возвращает фильтры к начальным значениям', () => {
    const dirty = makeState({
      mode: 'canTeach',
      search: 'abcdf',
      skillIds: [1],
      subskillIds: [2],
      cityIds: [3],
      genderIds: [1],
      sortBy: 'age',
      sortOrder: 'desc',

    })
    const state = reducer(dirty, resetFilters())
    expect(state.users).toEqual(initialUserFilters)
  })
})
