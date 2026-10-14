export type RegisterData = {
  email: string
  password: string
  name: string
  avatar: File | null
  birthDate: Date
  gender: string
  city: string
  skill: string
  subskill: string
  nameSkill: string
  canTeachSkillName: string
  canTeachSkill: string
  canTeachSubskill: string
  canTeachdescription: string
  skillFile: File[]
}
