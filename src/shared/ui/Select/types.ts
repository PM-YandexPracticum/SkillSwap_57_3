export type SelectProps = {
  labelName: string
  placeholder: string
  options: {
    value: string
    label: string
  }[]
  value: string
  onChange: (value: string) => void
}
