export type SkillCategory = {
  id: number
  title: string
  icon_src: string
  color: string
  subskills: Subskill[]
}

export type Subskill = {
  id: number
  title: string
}

export type ModalSkillsProps = {
  triggerRef?: React.RefObject<HTMLButtonElement | null>
  onClose: () => void
}
