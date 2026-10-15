import { CatalogUserResponse, SingleUser } from '@/shared/types/apiTypes'
export type { User, AuthUser } from '@/shared/types'

export type UserSliceState = {
  data: CatalogUserResponse | null
  loading: boolean
  error: string | null
  currentUser: SingleUser | null
}
