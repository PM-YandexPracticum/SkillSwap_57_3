export type FilterMode = 'all' | 'canTeach' | 'wantsToLearn'

export type UserFilters = {
  mode: FilterMode

  search: string

  skillIds: number[]

  subskillIds: number[]

  cityIds: number[]

  genderIds: number[]

  // сортировка
  sortBy: 'name' | 'age' | 'likes_count' | 'creation_date'
  sortOrder: 'asc' | 'desc'
}

export const initialUserFilters: UserFilters = {
  mode: 'all',
  search: '',
  skillIds: [],
  subskillIds: [],
  cityIds: [],
  genderIds: [],
  sortBy: 'name',
  sortOrder: 'asc',
}
