import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '@/shared/config/api.ts'
import { AddFavoritesArgs, FavoritesSliceState } from './types'
import { User } from '@/shared/types/apiTypes'
import axios from 'axios'
import { handleAxiosError } from '@/shared/lib/handleAxiosError'

const initialState: FavoritesSliceState = {
  data: null,
  lastFetched: null,
  loading: false,
  error: null,
}

export const fetchFavorites = createAsyncThunk<User[], number, { rejectValue: string }>(
  'favorites/getFavorites',
  async (id, { signal, rejectWithValue }) => {
    try {
      const res = await api.get(`/api/favorites/${id}`, { signal })
      return res.data
    } catch (e) {
      if (axios.isCancel(e)) throw e

      return rejectWithValue(handleAxiosError(e, 'Не удалось загрузить Favorites'))
    }
  },
)

export const addToFavorites = createAsyncThunk<User[], AddFavoritesArgs, { rejectValue: string }>(
  'favorites/addToFavorites',
  async ({ userId, likedUserId }, { signal, rejectWithValue }) => {
    try {
      const res = await api.post(`/api/favorites/add/${userId}?liked=${likedUserId}`, {
        signal,
      })

      return res.data
    } catch (e) {
      if (axios.isCancel(e)) throw e

      return rejectWithValue(handleAxiosError(e, 'Не удалось отправить Favorites'))
    }
  },
)

export const removeFromFavorites = createAsyncThunk<
  User[],
  AddFavoritesArgs,
  { rejectValue: string }
>('favorites/addToFavorites', async ({ userId, likedUserId }, { signal, rejectWithValue }) => {
  try {
    const res = await api.post(`/api/favorites/remove/${userId}?liked=${likedUserId}`, {
      signal,
    })

    return res.data
  } catch (e) {
    if (axios.isCancel(e)) throw e

    return rejectWithValue(handleAxiosError(e, 'Не удалось удалить Favorites'))
  }
})

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.lastFetched = Date.now()
    })

    builder.addCase(fetchFavorites.rejected, (state, action) => {
      if (action.meta.aborted) return
      state.loading = false
      state.error = action.payload ?? action.error.message ?? 'ошибка: избранные записи не загрузились'
    })

    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.lastFetched = Date.now()
    })
  },
})

export default favoriteSlice.reducer
