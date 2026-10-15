import { RegisterData } from '@/pages/RegisterPage/types'
import { Dispatch } from 'react'

export type AboutFormProps = {
  setStepFn: (data: Omit<RegisterData, 'email' | 'password'>) => void
  setPreviousStep: Dispatch<React.SetStateAction<number>>
}
