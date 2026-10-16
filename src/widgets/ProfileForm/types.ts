import { Values } from './schema'

export type ProfileFormProps = {
  initialValues?: Partial<Values>
  onSave?: (values: Values) => void | Promise<void>
}
