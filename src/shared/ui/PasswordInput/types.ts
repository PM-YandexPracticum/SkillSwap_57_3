import type { ChangeEvent } from "react"

export type PasswordInputProps = {
  labelName: string
  placeholder: string
  value: string //значение инпута
  onChange: (e: ChangeEvent<HTMLInputElement>) => void// функция изменения значения состояния инпута
  isPasswordVisible: boolean // состояние видимости
  toggleVisibility: () => void // функция для переключения состояния видимости
}
