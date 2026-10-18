import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RecommendationItem, RecommendationsSliceState } from './types'
import { API_URL } from '@/shared/config/api'

const initialState: RecommendationsSliceState = {
  data: null,
  loading: false,
  error: null,
}

export const fetchRecommendations = createAsyncThunk<
  RecommendationItem[],
  number,
  { rejectValue: string }
>('recommendations/getRecommendations', async (id, { signal, rejectWithValue }) => {
  try {
    const res = await fetch(`${API_URL}/api/recommendations/${id}`, { signal })
    if (!res.ok) {
      return rejectWithValue(`HTTP ${res.status}`)
    }
    return (await res.json()) as RecommendationItem[]
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') {
      throw e
    }
    return rejectWithValue(e instanceof Error ? e.message : 'Неизвестная ошибка')
  }
})

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecommendations.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(fetchRecommendations.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })

    builder.addCase(fetchRecommendations.rejected, (state, action) => {
      if (action.error.name === 'AbortError') return
      state.loading = false
      state.error = action.error.message ?? 'ошибка: рекоммендации не загрузились'
    })
  },
})

export default recommendationsSlice.reducer
