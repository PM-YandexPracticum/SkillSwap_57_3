import { Genders } from '@/shared/types/apiTypes'

export type GenderSliceState = {
  data: Genders[] | []
  loading: boolean
  error: string | null
}
