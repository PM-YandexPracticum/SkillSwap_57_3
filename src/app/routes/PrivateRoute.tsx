import { useAppSelector } from '@/store/hooks'
import { Navigate, useLocation } from 'react-router'
import { ROUTES } from '@/shared/lib/constants'
import { getUserSelector /*getIsAuthCheckedSelector*/ } from '@/entities/auth/authSlice'
import { PrivateRouteProps } from './types'

export const PrivateRoute = ({ onlyUnAuth, children }: PrivateRouteProps) => {
  const location = useLocation()

  // получение пользователя
  const user = useAppSelector(getUserSelector)

  // получениe состояния загрузки пользователя
  // const isAuthChecked = useAppSelector(getIsAuthCheckedSelector)

  // пока идёт чекаут пользователя, показываем прелоадер
  // if (!isAuthChecked) {
  //   return <div>Загрузка...</div>
  // }

  // если маршрут для авторизованного пользователя, но пользователь не авторизован, то делаем редирект
  if (!onlyUnAuth && !user) {
    return <Navigate replace to={ROUTES.LOGIN} state={{ from: location }} />
  }

  // если маршрут для неавторизованного пользователя, но пользователь авторизован
  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: ROUTES.HOME }
    return <Navigate replace to={from} />
  }

  return children
}
