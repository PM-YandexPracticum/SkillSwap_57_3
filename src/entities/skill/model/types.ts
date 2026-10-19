// Переэкспортируем типы из shared — используй именно этот импорт внутри entities/skill
import type { Skill } from '@/shared/types/apiTypes'
export type { Skill, SkillType } from '@/shared/types'

export type SkillsSliceState = {
  data: Skill[] | null
  loading: boolean
  error: string | null
}
