import { configureStore } from '@reduxjs/toolkit'
// Импортируй свои slice'ы здесь по мере их создания:
import skillsReducer from '@/entities/skill/model/skillsSlice'
// import authReducer from '@/features/auth/model/authSlice'
import userReducer from '@/entities/user/model/userSlice'
import searchReducer from '@/entities/search/model/searchSlice'

export const store = configureStore({
  reducer: {
    skills: skillsReducer,
    // auth: authReducer,
    user: userReducer,
    search: searchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
