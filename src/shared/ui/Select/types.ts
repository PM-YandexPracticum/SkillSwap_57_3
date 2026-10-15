export type SelectProps = {
  labelName: string
  placeholder: string
  options: {
    id: number
    title: string
  }[]
  value: string | null
  onChange: (value: string | null) => void
  error?: string
}
