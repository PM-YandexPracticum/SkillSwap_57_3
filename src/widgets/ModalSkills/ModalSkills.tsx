import styles from './ModalSkills.module.css'
import type { SkillCategory } from './types'

import { useEffect, useState } from 'react'

export const ModalSkills = () => {
  const [skills, setSkills] = useState<SkillCategory[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('http://localhost:5000/api/skills').then((data) => data)

        setSkills(await data.json())
      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
  }, [])

  const iconPathFixes: Record<string, string> = {
    '/assets/skills/BuisnessAndCareerIcon.svg': '/assets/skills/BuinessAndCareerIcon.svg',

    '/assets/skills/EducationIcon.svg': '/assets/skills/EdicationIcon.svg',
  }

  return (
    <div className={styles.modal}>
      {skills.map((skill) => (
        <div key={skill.id} className={styles.skillWrap}>
          <div className={styles.titleWrap}>
            <img
              src={iconPathFixes[skill.icon_src] ?? skill.icon_src}
              className={styles.iconSkill}
              alt={skill.title}
            />
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
