import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserSliceState } from './types'
import type { CatalogUserResponse, SingleUser } from '@/shared/types/apiTypes'
import axios from 'axios'
import { api } from '@/shared/config/api'
import { handleAxiosError } from '@/shared/lib/handleAxiosError.ts'

const initialState: UserSliceState = {
  data: null,
  loading: false,
  error: null,
  currentUser: null,
}

export const fetchUsers = createAsyncThunk<CatalogUserResponse, void, { rejectValue: string }>(
  'user/getUsers',
  async (_, { signal, rejectWithValue }) => {
    try {
      const response = await api.get<CatalogUserResponse>(`/api/users`, { signal })

      return response.data
    } catch (e) {
      if (axios.isCancel(e)) throw e

      return rejectWithValue(handleAxiosError(e, 'Не удалось загрузить пользователей'))
    }
  },
)

export const fetchUser = createAsyncThunk<SingleUser, string, { rejectValue: string }>(
  'user/getUser',
  async (id: string, { signal, rejectWithValue }) => {
    try {
      const response = await api.get<SingleUser>(`/api/users/${id}`, { signal })

      return response.data
    } catch (e) {
      if (axios.isCancel(e)) throw e

      return rejectWithValue(handleAxiosError(e, 'Не удалось загрузить данные пользователя'))
    }
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
      if (action.meta.aborted) return
      state.loading = false
      state.error = action.payload ?? action.error.message ?? 'Ошибка загрузки пользователей'
    })

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  },
})

export default userSlice.reducer
