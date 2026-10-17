import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { ROUTES } from '@/shared/lib/constants'
import { MainLayout, AuthLayout } from '@/app/Layouts'
import { useAppDispatch } from '@/store/hooks'
import { fetchSkills } from '@/entities/skill/model/skillsSlice'
import { fetchCities } from '@/entities/city/citySlice'
import { fetchGenders } from '@/entities/genders/genderSlice'
import { fetchUsers } from '@/entities/user/model/userSlice'
import { PrivateRoute } from '@/app/routes'

// Lazy-загрузка страниц — каждая страница грузится только при переходе на неё
const CatalogPage = lazy(() => import('@/pages/CatalogPage'))
const SkillPage = lazy(() => import('@/pages/SkillPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'))
const CreateSkillPage = lazy(() => import('@/pages/CreateSkillPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const NotServerPage = lazy(() =>
  import('@/pages/NotServerPage').then((module) => ({ default: module.NotServerPage })),
)
const AboutPage = lazy(() => import('@/pages/aboutPage'))

export function AppRouter() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchSkills())
    dispatch(fetchCities())
    dispatch(fetchGenders())
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path={ROUTES.HOME} element={<CatalogPage />} />
              <Route path={ROUTES.SKILL} element={<SkillPage />} />
              <Route
                path={ROUTES.FAVORITES}
                element={
                  <PrivateRoute>
                    <FavoritesPage />
                  </PrivateRoute>
                }
              />
              <Route path={ROUTES.ABOUT} element={<AboutPage />} />

              <Route
                path={ROUTES.PROFILE}
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path={ROUTES.CREATE}
                element={
                  <PrivateRoute>
                    <CreateSkillPage />
                  </PrivateRoute>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
              <Route path="/500" element={<NotServerPage />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route
                path={ROUTES.LOGIN}
                element={
                  <PrivateRoute onlyUnAuth>
                    <LoginPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={ROUTES.REGISTER}
                element={
                  <PrivateRoute onlyUnAuth>
                    <RegisterPage />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}
