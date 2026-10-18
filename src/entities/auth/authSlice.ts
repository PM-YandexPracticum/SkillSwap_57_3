import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthUser, AuthUserState, RegisterUserData } from './types.ts'
import { API_URL } from '@/shared/config/api.ts'

const initialState: AuthUserState = {
  data: null,
  loading: false,
  error: null,
  isAuth: false,
  isAuthChecked: false,
}

export const registerUser = createAsyncThunk<AuthUser, RegisterUserData, { rejectValue: string }>(
  'user/registerUser',
  async (registerData, { signal, rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('name', registerData.name)
      formData.append('email', registerData.email)
      formData.append('password', registerData.password)
      formData.append('bio', registerData.bio)
      formData.append('date_birth', registerData.date_birth.toISOString().split('T')[0])
      formData.append('city_id', String(registerData.city.id))
      formData.append('gender_id', String(registerData.gender.id))
      formData.append('skillTitle', registerData.skillTitle)
      formData.append('skillDescription', registerData.skillDescription)
      formData.append('canTeachSkillId', registerData.canTeachSkillId)
      formData.append('canTeachSubskillId', registerData.canTeachSubskillId)
      formData.append('wantsToLearnSkillId', registerData.wantsToLearnSkillId)
      formData.append('wantsToLearnSubskillId', registerData.wantsToLearnSubskillId)
      formData.append('avatar', registerData.image_path)
      formData.append('images', registerData.image_1)
      formData.append('images', registerData.image_2)
      formData.append('images', registerData.image_3)
      formData.append('images', registerData.image_4)

      const res = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
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

export const authUser = createAsyncThunk<
  AuthUser,
  Pick<RegisterUserData, 'email' | 'password'>,
  { rejectValue: string }
>('user/authUser', async (authData, { signal, rejectWithValue }) => {
  try {
    const formData = new FormData()
    formData.append('email', authData.email)
    formData.append('password', authData.password)
    const res = await fetch(`${API_URL}/api/users/auth`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
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
})

const authUserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  selectors: {
    getUserSelector: (state) => state.data,
    getIsAuthCheckedSelector: (state) => state.isAuthChecked,
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.isAuth = true
      state.isAuthChecked = true
    })

    builder.addCase(registerUser.rejected, (state, action) => {
      if (action.error.name === 'AbortError') return
      state.loading = false
      state.error = action.error.message ?? 'ошибка: регистрация не удалась'
      state.isAuthChecked = true
    })

    builder.addCase(authUser.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(authUser.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.isAuth = true
      state.isAuthChecked = true
    })

    builder.addCase(authUser.rejected, (state, action) => {
      if (action.error.name === 'AbortError') return
      state.loading = false
      state.error = action.error.message ?? 'ошибка: авторизация не удалась'
      state.isAuthChecked = true
    })
  },
})

export default authUserSlice.reducer

export const { getUserSelector, getIsAuthCheckedSelector } = authUserSlice.selectors
