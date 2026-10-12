import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SkillsSliceState } from './types'
import type { Skill } from '@/shared/types/apiTypes'

const initialState: SkillsSliceState = {
  data: null,
  loading: false,
  error: null,
}

export const fetchSkills = createAsyncThunk<Skill[]>('skill/getSkills', async () => {
  const data = await fetch('http://localhost:5000/api/skills')
  return data.json()
})

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
      state.loading = false
      state.error = action.error.message ?? 'ошибка: категории навыков не загрузились'
    })
  },
})

export default skillsSlice.reducer
