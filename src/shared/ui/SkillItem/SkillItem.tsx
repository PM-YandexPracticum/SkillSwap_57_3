import { SkillItemProps } from './types'
import styles from './SkillItem.module.css'

export function SkillItem({ title, color }: SkillItemProps) {
  return <span className={`${styles.general} ${styles[color]}`}>{title}</span>
}
