import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthUser, AuthUserState, RegisterUserData } from './types.ts'
import axios from 'axios'
import { api } from '@/shared/config/api'
import { handleAxiosError } from '@/shared/lib/handleAxiosError.ts'

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

      const res = await api.post<AuthUser>(`/api/users/register`, formData, {
        signal
      });

      return res.data;
    } catch (e) {
      if (axios.isCancel(e)) throw e
      return rejectWithValue(handleAxiosError(e, 'Не удалось выполнить регистрацию'))
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

    const res = await api.post<AuthUser>(`/api/users/auth`, formData, {
      signal,
      withCredentials: true,
    })

    return res.data
  } catch (e) {
    if (axios.isCancel(e)) throw e

    return rejectWithValue(handleAxiosError(e, 'Не удалось войти в аккаунт'))
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
      if (action.meta.aborted) return
      state.loading = false
      state.error = action.payload ?? action.error.message ?? 'ошибка: регистрация не удалась'
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
      if (action.meta.aborted) return
      state.loading = false
      state.error = action.payload ?? action.error.message ?? 'ошибка: авторизация не удалась'
      state.isAuthChecked = true
    })
  },
})

export default authUserSlice.reducer

export const { getUserSelector, getIsAuthCheckedSelector } = authUserSlice.selectors
