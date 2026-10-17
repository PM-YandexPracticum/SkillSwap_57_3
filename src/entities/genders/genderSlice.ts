import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GenderSliceState } from './types'
import { API_URL } from '@/shared/config/api'
import type { Genders } from '@/shared/types/apiTypes'

const initialState: GenderSliceState = {
  data: [],
  loading: false,
  error: null,
}

export const fetchGenders = createAsyncThunk<Genders[], void, { rejectValue: string }>(
  'gender/getGenders',
  async (_, { signal, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/genders`, { signal })
      if (!res.ok) {
        return rejectWithValue(`HTTP ${res.status}`)
      }
      return await res.json()
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        throw e
      }
      return rejectWithValue((e as Error).message)
    }
  },
)

const genderSlice = createSlice({
  name: 'genders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGenders.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(fetchGenders.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })

    builder.addCase(fetchGenders.rejected, (state, action) => {
      if (action.error.name === 'AbortError') return
      state.loading = false
      state.error = action.error.message ?? 'ошибка: гендеры не загрузились'
    })
  },
})

export default genderSlice.reducer
