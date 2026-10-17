export type FileInputProps = {
  value?: File[]
  onChange: (files: File[]) => void
  error?: string
  maxFiles?: number
}
