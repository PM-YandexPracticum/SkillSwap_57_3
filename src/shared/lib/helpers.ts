import { Skill, SkillStandalone, Subskill } from '../types/apiTypes'

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
        skill: skill,
      })
    }
  }

  return { skills, subskills }
}
