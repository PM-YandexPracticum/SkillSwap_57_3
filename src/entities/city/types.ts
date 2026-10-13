import { City } from '@/shared/types/apiTypes'

export type CitySliceState = {
  data: City[] | []
  loading: boolean
  error: string | null
}
