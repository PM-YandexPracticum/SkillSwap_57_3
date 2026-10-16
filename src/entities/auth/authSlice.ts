import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthUser, AuthUserState, RegisterUserData } from './types.ts'
import { API_URL } from '@/shared/config/api.ts'

const initialState: AuthUserState = {
  data: null,
  loading: false,
  error: null,
}

// export const fetchCities = createAsyncThunk<City[], void, { rejectValue: string }>(
//   'city/getCities',
//   async (_, { signal, rejectWithValue }) => {
//     try {
//       const res = await fetch(`${API_URL}/api/cities`, { signal })
//       if (!res.ok) {
//         return rejectWithValue(`HTTP ${res.status}`)
//       }
//       return await res.json()
//     } catch (e) {
//       if (e instanceof Error && e.name === 'AbortError') {
//         throw e
//       }
//       return rejectWithValue((e as Error).message)
//     }
//   },
// )

export const registerUser = createAsyncThunk<AuthUser, RegisterUserData, { rejectValue: string }>(
  'user/registerUser',
  async (registerData, { signal, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
        signal,
      })
      if (!res.ok) {
        return rejectWithValue(`HTTP ${res.status}`)
      }
      return (await res.json()) as AuthUser
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        throw e
      }
      return rejectWithValue((e as Error).message)
    }
  },
)

const authUserSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })

    builder.addCase(registerUser.rejected, (state, action) => {
      if (action.error.name === 'AbortError') return
      state.loading = false
      state.error = action.error.message ?? 'ошибка: регистрация не удалась'
    })
  },
})

export default authUserSlice.reducer
