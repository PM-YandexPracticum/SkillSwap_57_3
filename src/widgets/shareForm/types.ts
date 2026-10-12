import { Skill } from '@/entities/skill/model/types'

export type ShareFormData = {
  name: string
  category: string
  subcategory: string
  description: string
  images: File[]
}

export type SkillSubskill = {
  id: number
  title: string
}

export type SkillWithSubskills = Skill & {
  subskills: SkillSubskill[]
}

export type ShareFormProps = {
  onSubmit?: (data: ShareFormData) => void
  onBack?: () => void
}

export type FormErrors = {
  name?: string
  category?: string
  subcategory?: string
  description?: string
  images?: string
}
