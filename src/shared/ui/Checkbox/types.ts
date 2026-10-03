import type { ChangeEvent } from 'react'

export type CheckboxProps = {
  checked: boolean
  variant: 'category' | 'subcategory'
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  labelName: string
  name: string
  value: string
}
