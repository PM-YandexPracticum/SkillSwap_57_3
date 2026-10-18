import { configureStore } from '@reduxjs/toolkit'
// Импортируй свои slice'ы здесь по мере их создания:
import skillsReducer from '@/entities/skill/model/skillsSlice'
// import authReducer from '@/features/auth/model/authSlice'
import userReducer from '@/entities/user/model/userSlice'
import cityReducer from '@/entities/city/citySlice'
import genderReducer from '@/entities/genders/genderSlice'
import recommendationReducer from '@/entities/userRecommendations/userRecommendationsSlice'
import authReducer from '@/entities/auth/authSlice'

export const store = configureStore({
  reducer: {
    skill: skillsReducer,
    city: cityReducer,
    gender: genderReducer,
    recommendations: recommendationReducer,
    // auth: authReducer,
    user: userReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
