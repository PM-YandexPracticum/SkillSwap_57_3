
import type { Values } from './schema'

export type ProfileFormProps = {
  initialValues?: Partial<Values>
  onSave?: (values: Values) => void | Promise<void>
}

export type EditableField =
  | 'email'
  | 'name'
  | 'birthDate'
  | 'gender'
  | 'city'
  | 'about'
