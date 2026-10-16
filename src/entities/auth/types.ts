import { City, Genders } from '@/shared/types/apiTypes'

export type AuthUser = {
  id: number
  name: string
  email: string
  date_birth: Date
  gender: Genders
  city: City
  bio: string
  image_path: string
  likesCount: number
  likedUsers: Array<string>
  refreshToken: string
  accessToken: string
}

export type RegisterUserData = {
  name: string
  email: string
  password: string
  date_birth: Date
  gender: Genders
  city: City
  bio: string
  image_path: File
  wantsToLearnSubskillId: string
  wantsToLearnSkillId: string
  skillTitle: string
  skillDescription: string
  canTeachSkillId: string
  canTeachSubskillId: string
  image_1: File
  image_2: File
  image_3: File
  image_4: File
}

export type AuthUserState = {
  data: AuthUser | null
  loading: boolean
  error: string | null
  isAuth: boolean
}
