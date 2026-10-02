import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ROUTES } from '@/shared/lib/constants'
import { MainLayout, AuthLayout } from '@/app/Layouts'

// Lazy-загрузка страниц — каждая страница грузится только при переходе на неё
const CatalogPage = lazy(() => import('@/pages/CatalogPage'))
const SkillPage = lazy(() => import('@/pages/SkillPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'))
const CreateSkillPage = lazy(() => import('@/pages/CreateSkillPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const NotServerPage = lazy(() =>
  import('@/pages/NotServerPage').then((module) => ({ default: module.NotServerPage })),
)

export function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path={ROUTES.HOME} element={<CatalogPage />} />
              <Route path={ROUTES.SKILL} element={<SkillPage />} />
              <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />

              {/* Защищённые маршруты — добавь PrivateRoute обёртку */}
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTES.CREATE} element={<CreateSkillPage />} />

              <Route path="*" element={<NotFoundPage />} />
              <Route path="/500" element={<NotServerPage />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path={ROUTES.LOGIN} element={<LoginPage isLogin />} />
              <Route path={ROUTES.REGISTER} element={<LoginPage isLogin />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}
