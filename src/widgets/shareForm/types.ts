import { RegisterData } from '@/pages/RegisterPage/types'
import { Dispatch } from 'react'

export type ShareFormValues = Pick<
  RegisterData,
  'canTeachSkillName' | 'canTeachSkill' | 'canTeachSubskill' | 'canTeachDescription' | 'skillFile'
>

export type ShareFormProps = {
  setStepFn?: (data: ShareFormValues) => void
  setPreviousStep?: Dispatch<React.SetStateAction<number>>
  registerData?: RegisterData | null
}
