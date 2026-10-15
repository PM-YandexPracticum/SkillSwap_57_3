export type WelcomeFormProps = {
  isRegistry: boolean
  setStepFn?: (data: { email: string; password: string }) => void
}
