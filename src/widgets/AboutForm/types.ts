import { RegisterData } from '@/pages/RegisterPage/types'
import { Dispatch } from 'react'

export type AboutFormValues = Pick<
  RegisterData,
  'name' | 'avatar' | 'birthDate' | 'gender' | 'city' | 'skill' | 'subskill'
>

export type AboutFormProps = {
  setStepFn: (data: AboutFormValues) => void
  setPreviousStep: Dispatch<React.SetStateAction<number>>
}
