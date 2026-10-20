import { ExchangeItem } from '@/entities/exchange/types'

export type Skill = {
  id: number
  title: string
  color:
    | 'light_lavender'
    | 'light_beige'
    | 'light_peach'
    | 'light_pink'
    | 'pale_blue'
    | 'pale_green'
  icon_src: string
  subskills: Subskill[]
}

export type Subskill = {
  id: number
  title: string
}

export type City = {
  id: number
  title: string
}

export type Genders = {
  id: number
  title: string
}

export type CatalogUserResponse = {
  topByLikes: User[]
  newest: User[]
  byName: User[]
}

export type User = {
  id: number
  name: string
  image_path: string
  likes_count: number
  creation_date: string
  age: number
  isLiked: boolean
  city: City
  canTeach: CanTeachItem[]
  wantsToLearn: WantsToLearnItem[]
  gender: Genders
}

export type CanTeachItem = {
  id: number
  title: string
  description: string
  image_1: string | null
  image_2: string | null
  image_3: string | null
  image_4: string | null
  subskill: {
    id: number
    title: string
    skill: Omit<Skill, 'subskills'>
  }
}

export type WantsToLearnItem = {
  subskill: {
    id: string
    title: string
    skill: Omit<Skill, 'subskills'>
  }
}

export type AuthUserResponse = {
  accessToken: string
  user: {
    bio: string
    birth_date: string
    city_id: number
    creation_date: string
    email: string
    gender_id: number
    id: number
    image_path: string
    likes_count: number
    name: string
  }
  exchanges: ExchangeItem[]
}

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

export type SkillStandalone = {
  id: number
  title: string
}

export type SingleUser = {
  id: number
  name: string
  image_path: string | null
  bio: string
  age: number
  city: City
  canTeach: CanTeachItem[]
  wantsToLearn: WantsToLearnItem[]
}

export type ExchangeRequest = {
  initiator_id: number
  receiver_id: number
}

export type ExchangeResponse = {
  data: ExchangeItem[]
}
