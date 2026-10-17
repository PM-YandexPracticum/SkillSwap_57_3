import { useAppSelector } from '@/store/hooks'
import styles from './ModalSkills.module.css'

import { Skill } from '@/shared/types/apiTypes'
import { ModalSkillsProps } from './types'
import { useEffect, useRef } from 'react'

export const ModalSkills = ({ onClose, triggerRef }: ModalSkillsProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const skillState = useAppSelector((state) => state.skill)
  const skillsData = skillState.data as Skill[]

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      const target = e.target as Node

      if (modalRef.current?.contains(target)) return
      if (triggerRef?.current?.contains(target)) return

      onClose()
    }
    document.addEventListener('mousedown', handleClose)
    return () => {
      document.removeEventListener('mousedown', handleClose)
    }
  }, [onClose])

  return (
    <div ref={modalRef} className={styles.modal}>
      {skillsData.map((skill) => (
        <div key={skill.id} className={styles.skillWrap}>
          <div className={styles.titleWrap}>
            <img src={skill.icon_src} className={styles.iconSkill} alt={skill.title} />
            <h2 className={styles.titleSkill}>{skill.title}</h2>
          </div>
          <ul className={styles.subskillsList}>
            {skill.subskills.map((subskill) => (
              <li key={subskill.id} className={styles.subskill}>
                {subskill.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
