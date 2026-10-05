export type Skill = {
  id: number
  title: string
  color: string
  icon_src: string
}

export type Subskill = {
  id: number
  title: string
  skill: Skill
}

export type CanTeachItem = {
  title: string
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
  city: City
  canTeach: CanTeachItem[]
  wantsToLearn: WantsToLearnItem[]
}

export type CatalogUserResponse = {
  topByLikes: User[]
  newest: User[]
  byName: User[]
}
