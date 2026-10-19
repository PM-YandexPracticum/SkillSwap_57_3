import { User } from '@/shared/types/apiTypes'

export type FavoritesSliceState = {
  data: User[] | null
  lastFetched: number | null
  loading: boolean
  error: string | null
}

export type AddFavoritesArgs = {
  userId: number
  likedUserId: number
}
