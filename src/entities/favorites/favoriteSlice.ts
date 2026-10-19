import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '@/shared/config/api.ts'
import { AddFavoritesArgs, FavoritesSliceState } from './types'
import { User } from '@/shared/types/apiTypes'

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
      const res = await fetch(`${API_URL}/api/favorites/${id}`, { signal })
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

export const addToFavorites = createAsyncThunk<User[], AddFavoritesArgs, { rejectValue: string }>(
  'favorites/addToFavorites',
  async ({ userId, likedUserId }, { signal, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/favorites/add/${userId}?liked=${likedUserId}`, {
        method: 'POST',
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
  },
)

export const removeFromFavorites = createAsyncThunk<
  User[],
  AddFavoritesArgs,
  { rejectValue: string }
>('favorites/addToFavorites', async ({ userId, likedUserId }, { signal, rejectWithValue }) => {
  try {
    const res = await fetch(`${API_URL}/api/favorites/remove/${userId}?liked=${likedUserId}`, {
      method: 'POST',
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
      if (action.error.name === 'AbortError') return
      state.loading = false
      state.error = action.error.message ?? 'ошибка: избранные записи не загрузились'
    })

    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.lastFetched = Date.now()
    })
  },
})

export default favoriteSlice.reducer
