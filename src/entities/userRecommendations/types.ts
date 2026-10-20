import { RecommendationItem } from '@/shared/types/apiTypes'
export { type RecommendationItem } from '@/shared/types/apiTypes'

export type RecommendationsSliceState = {
  data: RecommendationItem[] | null
  loading: boolean
  error: string | null
}
