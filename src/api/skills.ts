import type { Skill } from '@/shared/types'
import { api } from '@/shared/config/api'

export async function fetchSkills(): Promise<Skill[]> {
  const response = await api.get<Skill[]>(`/api/skills.json`)
  return response.data
}

export async function fetchSkillById(id: string): Promise<Skill | undefined> {
  const skills = await fetchSkills()
  return skills.find((skill) => skill.id === id)
}
