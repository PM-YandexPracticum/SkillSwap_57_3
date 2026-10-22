import { configureStore } from '@reduxjs/toolkit'
import skillsReducer from '@/entities/skill/model/skillsSlice'
import userReducer from '@/entities/user/model/userSlice'
import cityReducer from '@/entities/city/citySlice'
import genderReducer from '@/entities/genders/genderSlice'
import recommendationReducer from '@/entities/userRecommendations/userRecommendationsSlice'
import authReducer from '@/entities/auth/authSlice'
import favoriteReducer from '@/entities/favorites/favoriteSlice'
import filterReducer from '@/entities/filters/filterSlice'
import exchangeReducer from '@/entities/exchange/exchangeSlice'

export const store = configureStore({
  reducer: {
    skill: skillsReducer,
    city: cityReducer,
    gender: genderReducer,
    recommendations: recommendationReducer,
    user: userReducer,
    auth: authReducer,
    favorite: favoriteReducer,
    exchange: exchangeReducer,
    filters: filterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
