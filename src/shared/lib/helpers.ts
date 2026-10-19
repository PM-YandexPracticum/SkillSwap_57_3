import { UserCardSkill } from '@/widgets/UserCard/types'
import { CanTeachItem, Skill, SkillStandalone, Subskill, WantsToLearnItem } from '../types/apiTypes'

/** Форматирует дату в читаемый вид */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

/** Обрезает строку до maxLength символов */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '...'
}

/** Генерирует уникальный id */
export function generateId(): string {
  return crypto.randomUUID()
}

export function splitSkills(data: Skill[]) {
  const skills: SkillStandalone[] = []
  const subskills: Subskill[] = []

  for (const skill of data) {
    skills.push({
      id: skill.id,
      title: skill.title,
    })

    for (const sub of skill.subskills) {
      subskills.push({
        id: sub.id,
        title: sub.title,
      })
    }
  }

  return { skills, subskills }
}

export function pluralizeYears(age: number): string {
  const mod10 = age % 10
  const mod100 = age % 100

  // 11–14 — всегда «лет»
  if (mod100 >= 11 && mod100 <= 14) {
    return `${age} лет`
  }

  if (mod10 === 1) return `${age} год`
  if (mod10 >= 2 && mod10 <= 4) return `${age} года`
  return `${age} лет`
}

export function mapCanTeachToCardSkills(items: CanTeachItem[]): UserCardSkill[] {
  return items.map((item) => ({
    title: item.title,
    color: item.subskill.skill.color as UserCardSkill['color'],
  }))
}

export function mapWantsToLearnToCardSkills(items: WantsToLearnItem[]): UserCardSkill[] {
  return items.map((item) => ({
    title: item.subskill.title,
    color: item.subskill.skill.color as UserCardSkill['color'],
  }))
}
