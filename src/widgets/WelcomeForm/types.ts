import { RegisterData } from '@/pages/RegisterPage/types'

export type WelcomeFormProps = {
  isRegistry: boolean
  setStepFn?: (data: { email: string; password: string }) => void
  registerData: RegisterData | null
}
