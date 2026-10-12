import type { ChangeEvent } from 'react'

export type AboutFormProps = {
  // value полей
  avatar: File | null
  name: string
  birthDate: Date | null
  gender: string
  city: string
  skill: string
  subskill: string

  // Обработчики onChange - функции обновления состояния/сеттеры
  onAvatarChange: (file: File | null) => void
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBirthDateChange: (date: Date | null) => void
  onGenderChange: (value: string) => void
  onCityChange: (value: string) => void
  onSkillChange: (value: string) => void
  onSubskillChange: (value: string) => void

  // Обработчики для кнопок формы
  onBack: () => void
  onContinue: () => void
}
