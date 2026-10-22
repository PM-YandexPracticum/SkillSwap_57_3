import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '@/shared/config/api.ts'
import { ExchangeSliceState } from './types'
import { ExchangeRequest, fetchExchangesResponse } from '@/shared/types/apiTypes'

const initialState: ExchangeSliceState = {
  data: null,
  loading: false,
  error: null,
}

export const sendExchange = createAsyncThunk<
  fetchExchangesResponse,
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

export const fetchExchanges = createAsyncThunk<
  fetchExchangesResponse,
  number,
  { rejectValue: string }
>('exchange/fetchExchange', async (user_id, { signal, rejectWithValue }) => {
  try {
    const res = await fetch(`${API_URL}/api/exchange/fetch/${user_id}`, {
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
      console.log(action.payload)
      state.loading = false
      state.data = action.payload.data
    })

    builder.addCase(sendExchange.rejected, (state, action) => {
      if (action.error.name === 'AbortError') return
      state.loading = false
      state.error = action.error.message ?? 'ошибка: обмены не загрузились'
    })

    builder.addCase(fetchExchanges.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchExchanges.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload.data
    })
    builder.addCase(fetchExchanges.rejected, (state, action) => {
      if (action.error.name === 'AbortError') return
      state.loading = false
      state.error = (action.payload as string) ?? action.error.message ?? 'Ошибка'
    })
  },
})

export default exchangeSlice.reducer
