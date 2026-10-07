import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/index.ts'

interface SearchState {
  searchQuery: string
}

const initialState: SearchState = {
  searchQuery: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    resetSearchQuery: (state) => {
      state.searchQuery = ''
    },
  },
})

export const { setSearchQuery, resetSearchQuery } = searchSlice.actions
export const selectSearchQuery = (state: RootState) => state.search.searchQuery
export default searchSlice.reducer
