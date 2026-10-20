import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '@/shared/config/api.ts'
import { ExchangeSliceState } from './types'
import { ExchangeRequest, ExchangeResponse } from '@/shared/types/apiTypes'

const initialState: ExchangeSliceState = {
  data: [],
  loading: false,
  error: null,
}

export const sendExchange = createAsyncThunk<
  ExchangeResponse,
  ExchangeRequest,
  { rejectValue: string }
>('exchange/sendExchange', async (exchangeData, { signal, rejectWithValue }) => {
  try {
    const formData = new FormData()
    formData.append('initiator_id', String(exchangeData.initiator_id))
    formData.append('receiver_id', String(exchangeData.receiver_id))

    const res = await fetch(`${API_URL}/api/exchange/send`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      signal,
    })
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
})

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendExchange.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(sendExchange.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload.data
    })

    builder.addCase(sendExchange.rejected, (state, action) => {
      if (action.error.name === 'AbortError') return
      state.loading = false
      state.error = action.error.message ?? 'ошибка: города не загрузились'
    })
  },
})

export default exchangeSlice.reducer
