import { useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import type { User } from '@/shared/types/apiTypes'
import type { UserFilters } from '@/entities/filters/types'

// получает навыки пользователя в зависимости от mode
function getUserSkills(
  user: User,
  mode: UserFilters['mode'],
): Array<{
  skillId: number
  subskillId: number
}> {
  const result: Array<{ skillId: number; subskillId: number }> = []

  if (mode === 'all' || mode === 'canTeach') {
    user.canTeach.forEach((item) => {
      result.push({
        skillId: item.subskill.skill.id,
        subskillId: item.subskill.id,
      })
    })
  }

  if (mode === 'all' || mode === 'wantsToLearn') {
    user.wantsToLearn.forEach((item) => {
      result.push({
        skillId: item.subskill.skill.id,
        subskillId: Number(item.subskill.id),
      })
    })
  }

  return result
}

export function useFilter(users: User[]): User[] {
  const filters = useAppSelector((state) => state.filters.users)

  const allSkills = useAppSelector((state) => state.skill.data)

  return useMemo(() => {
    let result = [...users]

    const search = filters.search.trim().toLowerCase()
    if (search) {
      result = result.filter((u) => {
        const searchableParts = [u.name]

        if (filters.mode === 'all' || filters.mode === 'canTeach') {
          u.canTeach.forEach((item) => {
            searchableParts.push(item.title, item.subskill.skill.title, item.subskill.title)
          })
        }

        if (filters.mode === 'all' || filters.mode === 'wantsToLearn') {
          u.wantsToLearn.forEach((item) => {
            searchableParts.push(item.subskill.skill.title, item.subskill.title)
          })
        }

        return searchableParts.some((value) => value.toLowerCase().includes(search))
      })
    }

    if (filters.cityIds.length > 0) {
      result = result.filter((u) => filters.cityIds.includes(u.city.id))
    }

    if (filters.genderIds.length > 0) {
      result = result.filter((u) => u.gender && filters.genderIds.includes(u.gender.id))
    }

    if (filters.skillIds.length > 0 || filters.subskillIds.length > 0) {
      result = result.filter((u) => {
        const skills = getUserSkills(u, filters.mode)

        const skillsWithSelectedSubskills = new Set(
          allSkills
            ?.filter((skill) =>
              // проверям, что навык содержит хотя бы один поднавык выбранный в фильтрах
              skill.subskills.some((subskill) => filters.subskillIds.includes(subskill.id)),
            )
            .map((skill) => skill.id),
        )

        const matchesSkills = filters.skillIds.some(
          (skillId) =>
            !skillsWithSelectedSubskills.has(skillId) && skills.some((s) => s.skillId === skillId),
        )

        const matchesSubskill = skills.some((s) => filters.subskillIds.includes(s.subskillId))

        return matchesSkills || matchesSubskill
      })
    }

    const { sortBy, sortOrder } = filters
    result.sort((a, b) => {
      let cmp = 0

      if (sortBy === 'name') {
        cmp = a.name.localeCompare(b.name, 'ru')
      } else if (sortBy === 'age') {
        cmp = a.age - b.age
      } else if (sortBy === 'likes_count') {
        cmp = a.likes_count - b.likes_count
      } else if (sortBy === 'creation_date') {
        cmp = new Date(a.creation_date).getTime() - new Date(b.creation_date).getTime()
      }

      return sortOrder === 'asc' ? cmp : -cmp
    })

    return result
  }, [users, filters, allSkills])
}
