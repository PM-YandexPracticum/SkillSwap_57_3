import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { api } from '@/shared/config/api'
import { handleAxiosError } from '@/shared/lib/handleAxiosError.ts'
import { GenderSliceState } from './types'
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
      const res = await api.get<Genders[]>(`/api/genders`, { signal })
      return res.data
    } catch (e) {
      if (axios.isCancel(e)) throw e

      return rejectWithValue(handleAxiosError(e, 'Не удалось загрузить гендеры'))
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
      if (action.meta.aborted) return
      state.loading = false
      state.error =action.payload ?? action.error.message ?? 'ошибка: гендеры не загрузились'
    })
  },
})

export default genderSlice.reducer
