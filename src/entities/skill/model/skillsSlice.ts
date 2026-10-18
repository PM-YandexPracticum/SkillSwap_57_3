import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SkillsSliceState } from './types'
import type { Skill } from '@/shared/types/apiTypes'
import axios from 'axios'
import { api } from '@/shared/config/api'
import { handleAxiosError } from '@/shared/lib/handleAxiosError.ts'

const initialState: SkillsSliceState = {
  data: null,
  loading: false,
  error: null,
}

export const fetchSkills = createAsyncThunk<Skill[], void, { rejectValue: string }>(
  'skill/getSkills',
  async (_, { signal, rejectWithValue }) => {
    try {
      const res = await api.get<Skill[]>(`/api/skills`, { signal })
      return res.data
    } catch (e) {
      if (axios.isCancel(e)) throw e

      return rejectWithValue(handleAxiosError(e, 'Не удалось загрузить скиллы'))
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
      if (action.meta.aborted) return
      state.loading = false
      state.error = action.payload ?? action.error.message ?? 'ошибка: категории навыков не загрузились'
    })
  },
})

export default skillsSlice.reducer
