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

export const fetchUsers = createAsyncThunk<CatalogUserResponse, void, { rejectValue: string }>(
  'user/getUsers',
  async (_, { signal, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/users`, { signal })

      if (!response.ok) {
        return rejectWithValue(`HTTP ${response.status}`)
      }

      return (await response.json()) as CatalogUserResponse
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        throw e
      }
      return rejectWithValue((e as Error).message)
    }
  },
)

export const fetchUser = createAsyncThunk<SingleUser, string, { rejectValue: string }>(
  'user/getUser',
  async (id: string, { signal, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/users/${id}`, { signal })

      if (!response.ok) {
        return rejectWithValue(`HTTP ${response.status}`)
      }

      return response.json()
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        throw e
      }
      return rejectWithValue((e as Error).message)
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
      if (action.error.name === 'AbortError') return
      state.loading = false
      state.error = action.error.message ?? 'Ошибка загрузки пользователей'
    })

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  },
})

export default userSlice.reducer
