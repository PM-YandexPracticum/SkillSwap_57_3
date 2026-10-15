import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserSliceState } from './types'
import { API_URL } from '@/shared/config/api'
import type { CatalogUserResponse, SingleUser } from '@/shared/types/apiTypes'

const initialState: UserSliceState = {
  data: null,
  loading: false,
  error: null,
  currentUser: null,
}

export const fetchUsers = createAsyncThunk<CatalogUserResponse>('user/getUsers', async () => {
  const response = await fetch(`${API_URL}/api/users/`)
  return response.json()
})

export const fetchUser = createAsyncThunk<SingleUser, string>(
  'user/getUser',
  async (id: string) => {
    const response = await fetch(`${API_URL}/api/users/${id}`)
    return response.json()
  },
)

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

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  },
})

export default userSlice.reducer
