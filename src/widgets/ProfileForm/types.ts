import { RegisterUserData } from '@/entities/auth/types'
import { Values } from './schema'

export type ProfileFormProps = {
  initialValues?: Partial<Values>
  onSave?: (
    values: Values & {
      password?: string
      image_path?: File | string
    },
  ) => void | Promise<void>
}
