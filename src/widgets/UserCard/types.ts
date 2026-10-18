export type UserCardSkill = {
  title: string
  color:
    | 'light_lavender'
    | 'light_beige'
    | 'light_peach'
    | 'light_pink'
    | 'pale_blue'
    | 'pale_green'
}

export type UserCardVariant = 'catalog' | 'author'

export type UserCardProps = {
  variant?: UserCardVariant
  avatarUrl: string
  name: string
  location: string
  about?: string
  canTeach: UserCardSkill[]
  wantsToLearn: UserCardSkill[]
  isLiked?: boolean
  onLike?: (id: number) => void
  onDislike?: (id: number) => void
  onDetails?: () => void
  id: number
}
