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

export type SkillStandalone = {
  id: number
  title: string
}

export type Subskill = {
  id: number
  title: string
  skill: Skill
}

export type CanTeachItem = {
  id: number
  title: string
  description: string
  image_1: string | null
  image_2: string | null
  image_3: string | null
  image_4: string | null
  subskill: Subskill
}

export type WantsToLearnItem = {
  title: string
  subskill: Subskill
}

export type City = {
  id: number
  title: string
}

export type User = {
  id: number
  name: string
  image_path: string
  likes_count: number
  creation_date: string
  age: number
  city: City
  canTeach: CanTeachItem[]
  wantsToLearn: WantsToLearnItem[]
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

export type CatalogUserResponse = {
  topByLikes: User[]
  newest: User[]
  byName: User[]
}

export type Genders = {
  id: number
  title: string
}
