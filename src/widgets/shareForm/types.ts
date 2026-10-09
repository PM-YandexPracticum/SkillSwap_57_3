export type ShareFormData = {
  name: string
  category: string
  subcategory: string
  description: string
  images: File[]
}

export type ShareFormProps = {
  onSubmit?: (data: ShareFormData) => void
  onBack?: () => void
}
