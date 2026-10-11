import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserSliceState } from './types'
import type { CatalogUserResponse } from '@/shared/types/apiTypes'

const initialState: UserSliceState = {
  data: null,
  loading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk<CatalogUserResponse>('user/getUsers', async () => {
  const response = await fetch('http://localhost:5001/api/users/')
  return response.json()
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? 'Ошибка загрузки пользователей'
    })
  },
})

export default userSlice.reducer
