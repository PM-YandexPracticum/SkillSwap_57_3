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
  const filters = useAppSelector((state) => state.filter.users)

  return useMemo(() => {
    let result = [...users]

    const search = filters.search.trim().toLowerCase()
    if (search) {
      result = result.filter((u) => u.name.toLowerCase().includes(search))
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

        if (
          filters.skillIds.length > 0 &&
          !skills.some((s) => filters.skillIds.includes(s.skillId))
        ) {
          return false
        }

        if (
          filters.subskillIds.length > 0 &&
          !skills.some((s) => filters.subskillIds.includes(s.subskillId))
        ) {
          return false
        }

        return true
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
  }, [users, filters])
}
