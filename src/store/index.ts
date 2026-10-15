import { configureStore } from '@reduxjs/toolkit'
// Импортируй свои slice'ы здесь по мере их создания:
import skillsReducer from '@/entities/skill/model/skillsSlice'
// import authReducer from '@/features/auth/model/authSlice'
import userReducer from '@/entities/user/model/userSlice'
import cityReducer from '@/entities/city/citySlice'
import genderReducer from '@/entities/genders/genderSlice'

export const store = configureStore({
  reducer: {
    skill: skillsReducer,
    city: cityReducer,
    gender: genderReducer,
    // auth: authReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
