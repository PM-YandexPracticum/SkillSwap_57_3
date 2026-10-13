export type DatePickerProps = {
  value: Date | null
  onChange: (date: Date | null) => void
  onBlur?: () => void
  error?: string
}
