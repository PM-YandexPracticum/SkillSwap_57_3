import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '@/shared/config/api.ts'

const initialState: CitySliceState = {
  data: [],
  loading: false,
  error: null,
}

export const fetchCities = createAsyncThunk<City[], void, { rejectValue: string }>(
  'city/getCities',
  async (_, { signal, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/cities`, { signal })
      if (!res.ok) {
        return rejectWithValue(`HTTP ${res.status}`)
      }
      return await res.json()
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        throw e
      }
      return rejectWithValue(e instanceof Error ? e.message : 'Неизвестная ошибка')
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
      if (action.error.name === 'AbortError') return
      state.loading = false
      state.error = action.error.message ?? 'ошибка: города не загрузились'
    })
  },
})

export default citySlice.reducer
