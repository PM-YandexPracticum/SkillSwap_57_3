import type { CSSProperties, ReactNode } from 'react'

export type RequiredFieldErrorProps = {
  children: (errorStyle: CSSProperties) => ReactNode
  hasError: boolean
}
