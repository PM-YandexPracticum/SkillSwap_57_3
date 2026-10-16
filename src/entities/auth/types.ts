import { City, Genders } from '@/shared/types/apiTypes'

export type AuthUser = {
  name: string
  email: string
  password: string
  date_birth: Date
  gender: Genders
  city: City
  bio: string
  image_path: string
  likedUsers: Array<string>
  refreshToken: string
}

export type RegisterUserData = {
  name: string
  email: string
  password: string
  date_birth: Date
  gender: Genders
  city: City
  bio: string
  image_path: string
  wantsToLearnSubskillId: string
  wantsToLearnSkillId: string
  skillTitle: string
  canTeachSkillId: string
  canTeachSubskillId: string
  image_1: string
  image_2: string
  image_3: string
  image_4: string
}

export type AuthUserState = {
  data: AuthUser | null
  loading: boolean
  error: string | null
}
