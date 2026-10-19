import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SkillsSliceState } from './types'
import { API_URL } from '@/shared/config/api'
import type { Skill } from '@/shared/types/apiTypes'

const initialState: SkillsSliceState = {
  data: null,
  loading: false,
  error: null,
}

export const fetchSkills = createAsyncThunk<Skill[], void, { rejectValue: string }>(
  'skill/getSkills',
  async (_, { signal, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/skills`, { signal })
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

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSkills.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(fetchSkills.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })

    builder.addCase(fetchSkills.rejected, (state, action) => {
      if (action.error.name === 'AbortError') return
      state.loading = false
      state.error = action.error.message ?? 'ошибка: категории навыков не загрузились'
    })
  },
})

export default skillsSlice.reducer
