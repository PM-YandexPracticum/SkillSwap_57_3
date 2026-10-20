import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RecommendationItem, RecommendationsSliceState } from './types'
import axios from 'axios'
import { api } from '@/shared/config/api'
import { handleAxiosError } from '@/shared/lib/handleAxiosError.ts'

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
    const res = await api.get<RecommendationItem[]>(`/api/recommendations/${id}`, { signal })

    return res.data
  } catch (e) {
    if (axios.isCancel(e)) throw e

    return rejectWithValue(handleAxiosError(e, 'Не удалось загрузить рекомендации'))
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
      if (action.meta.aborted) return
      state.loading = false
      state.error = action.payload ?? action.error.message ?? 'ошибка: рекоммендации не загрузились'
    })
  },
})

export default recommendationsSlice.reducer
