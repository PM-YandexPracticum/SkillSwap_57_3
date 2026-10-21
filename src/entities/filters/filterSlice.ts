// store/slices/filtersSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UserFilters, FilterMode } from './types'
import { initialUserFilters } from './types'

type FiltersState = {
  users: UserFilters
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState: { users: initialUserFilters } as FiltersState,
  reducers: {
    setMode: (state, action: PayloadAction<FilterMode>) => {
      state.users.mode = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.users.search = action.payload
    },
    toggleSkill: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const list = state.users.skillIds
      state.users.skillIds = list.includes(id) ? list.filter((x) => x !== id) : [...list, id]

      state.users.subskillIds = []
    },
    toggleSubskill: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const list = state.users.subskillIds
      state.users.subskillIds = list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    },
    toggleCity: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const list = state.users.cityIds
      state.users.cityIds = list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    },
    toggleGender: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const list = state.users.genderIds
      state.users.genderIds = list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    },
    setSortBy: (state, action: PayloadAction<UserFilters['sortBy']>) => {
      state.users.sortBy = action.payload
    },
    toggleSortOrder: (state) => {
      state.users.sortOrder = state.users.sortOrder === 'asc' ? 'desc' : 'asc'
    },
    resetFilters: (state) => {
      state.users = initialUserFilters
    },
  },
})

export const {
  setMode,
  setSearch,
  toggleSkill,
  toggleSubskill,
  toggleCity,
  toggleGender,
  setSortBy,
  toggleSortOrder,
  resetFilters,
} = filtersSlice.actions

export default filtersSlice.reducer
