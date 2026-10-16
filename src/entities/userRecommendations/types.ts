import { Skill } from '@/shared/types/apiTypes'

export type RecommendationItem = {
  id: number
  name: string
  image_path: string
  city: string
  age: number
  canTeach: Pick<Skill, 'title' | 'color'>[]
  wantsToLearn: Pick<Skill, 'title' | 'color'>[]
  isLiked: boolean
}

export type RecommendationsSliceState = {
  data: RecommendationItem[] | null
  loading: boolean
  error: string | null
}
