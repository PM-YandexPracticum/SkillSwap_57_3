import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '@/shared/config/api.ts'
import { City } from '@/shared/types/apiTypes'
import { CitySliceState } from './types'
import axios from 'axios'
import { handleAxiosError } from '@/shared/lib/handleAxiosError'

const initialState: CitySliceState = {
  data: [],
  loading: false,
  error: null,
}

export const fetchCities = createAsyncThunk<City[], void, { rejectValue: string }>(
  'city/getCities',
  async (_, { signal, rejectWithValue }) => {
    try {
      const res = await api.get(`/api/cities`, { signal })

      return res.data
    } catch (e) {
      if (axios.isCancel(e)) throw e

      return rejectWithValue(handleAxiosError(e, 'Не удалось загрузить города'))
    }
  },
)

const citySlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCities.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })

    builder.addCase(fetchCities.rejected, (state, action) => {
      if (action.meta.aborted) return
      state.loading = false
      state.error = action.payload ?? action.error.message ?? 'ошибка: города не загрузились'
    })
  },
})

export default citySlice.reducer
