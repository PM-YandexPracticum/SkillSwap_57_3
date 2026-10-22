import { UserCardSkill } from '@/widgets/UserCard/types'
import { CanTeachItem, Skill, Subskill, WantsToLearnItem } from '../types/apiTypes'
import { STORAGE_KEY } from './constants'

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
  const skills: Pick<Skill, 'title' | 'id' | 'subskills'>[] = []
  const subskills: Subskill[] = []

  for (const skill of data) {
    skills.push({
      id: skill.id,
      title: skill.title,
      subskills: skill.subskills,
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

export function formatRelativeDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  const now = new Date()

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  const diffDays = Math.floor((today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'сегодня'
  if (diffDays === 1) return 'вчера'

  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    })
  }

  // другой год — "20.10.2023"
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function getReadIds(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const ids = JSON.parse(raw) as number[]
    return new Set(ids)
  } catch {
    return new Set()
  }
}

export function saveReadIds(ids: Iterable<number>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
  } catch {
    console.log('Что-то пошло не так((')
  }
}

export function markAsRead(id: number) {
  const ids = getReadIds()
  ids.add(id)
  saveReadIds(ids)
}

export function markAllAsRead(ids: number[]) {
  const current = getReadIds()
  ids.forEach((id) => current.add(id))
  saveReadIds(current)
}
