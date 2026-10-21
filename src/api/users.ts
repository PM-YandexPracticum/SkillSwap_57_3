import type { User } from '@/shared/types'
import { api } from '@/shared/config/api'

export async function fetchUsers(): Promise<User[]> {
  const response = await api.get<User[]>(`/api/users.json`)
  return response.data
}

export async function fetchUserById(id: string): Promise<User | undefined> {
  const users = await fetchUsers()
  return users.find((user) => user.id === id)
}
