import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import styles from './Filters.module.css'

import {
  setMode,
  toggleSkill,
  toggleSubskill,
  selectParentCategory,
  toggleCity,
  toggleGender,
  resetFilters,
} from '@/entities/filters/filterSlice'
import type { FilterMode } from '@/entities/filters/types'

import { Skill } from '@/shared/types/apiTypes'
import { splitSkills } from '@/shared/lib/helpers'
import { Radio } from '@/shared/ui/Radio'
import { Checkbox } from '@/shared/ui/Checkbox'
import chevronDown from '@assets/icon/ChevronDown.svg'

export function Filters() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.filters.users)
  const cities = useAppSelector((state) => state.city.data)
  const genders = useAppSelector((state) => state.gender.data)
  const skillsFromSelector = useAppSelector((state) => state.skill.data ?? [])
  const { skills, subskills } = splitSkills(skillsFromSelector as Skill[])

  const [showAllSkills, setShowAllSkills] = useState(false)
  const [showAllCities, setShowAllCities] = useState(false)

  const visibleSkills = showAllSkills ? skills : skills.slice(0, 5)
  const visibleCities = showAllCities ? cities : cities.slice(0, 5)

  const [openedSkills, setOpenedSkills] = useState<number[]>([])

  const toggleOpenedSkill = (id: number) => {
    setOpenedSkills((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const selectedCount =
    filters.skillIds.length +
    filters.subskillIds.length +
    filters.cityIds.length +
    filters.genderIds.length +
    (filters.mode !== 'all' ? 1 : 0)

  const modeOptions = [
    { value: 'all', label: 'Всё' },
    { value: 'wantsToLearn', label: 'Хочу научиться' },
    { value: 'canTeach', label: 'Могу научить' },
  ]

  return (
    <aside className={styles.sidebar}>
      <div className={styles.head}>
        <h2 className={styles.title}>Фильтры ({selectedCount})</h2>
        <button
          type="button"
          className={styles.resetButton}
          onClick={() => dispatch(resetFilters())}
        >
          Сбросить
          <svg
            className={styles.cross}
            aria-label="Крестик"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7442 8.28748L8.25896 16.7728C7.96905 17.0627 7.48821 17.0627 7.1983 16.7728C6.90839 16.4828 6.90839 16.002 7.1983 15.7121L15.6836 7.22682C15.9735 6.93691 16.4543 6.93691 16.7442 7.22682C17.0342 7.51673 17.0342 7.99757 16.7442 8.28748Z"
              fill="currentColor"
            />
            <path
              d="M16.7442 16.7728C16.4543 17.0627 15.9735 17.0627 15.6836 16.7728L7.1983 8.28753C6.90839 7.99762 6.90839 7.51679 7.1983 7.22687C7.48821 6.93696 7.96905 6.93696 8.25896 7.22687L16.7442 15.7122C17.0342 16.0021 17.0342 16.4829 16.7442 16.7728Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <section className={styles.section}>
        <Radio
          name="mode"
          value={filters.mode}
          options={modeOptions}
          onChange={(value) => dispatch(setMode(value as FilterMode))}
        />
      </section>

      <section className={styles.section}>
        <h3 className={styles.subtitle}>Навыки</h3>
        <div className={styles.options}>
          {visibleSkills.map((skill) => {
            const isOpened = openedSkills.includes(skill.id)
            const skillSubskills = subskills.filter((subskill) => subskill.skillId === skill.id)
            const isSkillChecked = filters.skillIds.includes(skill.id)

            return (
              <div key={skill.id}>
                <div className={styles.skillRow}>
                  <Checkbox
                    name="skills"
                    value={String(skill.id)}
                    labelName={skill.title}
                    checked={isSkillChecked}
                    onChange={() =>
                      dispatch(
                        toggleSkill({
                          id: skill.id,
                          subskillIds: skillSubskills.map((subskill) => subskill.id),
                        }),
                      )
                    }
                    variant="category"
                  />

                  {skillSubskills.length > 0 && (
                    <button
                      type="button"
                      aria-label={
                        isOpened ? `Свернуть ${skill.title}` : `Развернуть ${skill.title}`
                      }
                      onClick={() => toggleOpenedSkill(skill.id)}
                    >
                      <img
                        src={chevronDown}
                        alt="Стрелка"
                        className={`${styles.arrow} ${isOpened ? styles.arrowUp : ''}`}
                      />
                    </button>
                  )}
                </div>

                {isOpened && skillSubskills.length > 0 && (
                  <div className={styles.subskills}>
                    {skillSubskills.map((subskill) => {
                      const isSubskillChecked = filters.subskillIds.includes(subskill.id)
                      return (
                        <Checkbox
                          key={subskill.id}
                          name="subskills"
                          value={String(subskill.id)}
                          labelName={subskill.title}
                          checked={isSubskillChecked}
                          onChange={() => {
                            if (!isSubskillChecked) {
                              dispatch(selectParentCategory(subskill.skillId))
                            }
                            dispatch(toggleSubskill(subskill.id))
                          }}
                          variant="subcategory"
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <button
          type="button"
          className={styles.showMoreButton}
          onClick={() => setShowAllSkills((prev) => !prev)}
        >
          {showAllSkills ? 'Скрыть категории' : 'Все категории'}
          <img
            src={chevronDown}
            alt="Стрелка"
            className={`${styles.arrow} ${showAllSkills ? styles.arrowUp : ''}`}
          />
        </button>
      </section>

      <section className={styles.section}>
        <h3 className={styles.subtitle}>Пол</h3>
        <Radio
          name="gender"
          value={filters.genderIds.length === 0 ? 'any' : String(filters.genderIds[0])}
          options={[
            { value: 'any', label: 'Не имеет значения' },
            ...genders.map((gender) => ({
              value: String(gender.id),
              label: gender.title,
            })),
          ]}
          onChange={(value) => {
            if (value === 'any') {
              filters.genderIds.forEach((id) => dispatch(toggleGender(id)))
            } else {
              const id = Number(value)

              filters.genderIds
                .filter((selectedId) => selectedId !== id)
                .forEach((selectedId) => dispatch(toggleGender(selectedId)))

              if (!filters.genderIds.includes(id)) {
                dispatch(toggleGender(id))
              }
            }
          }}
        />
      </section>

      <section className={styles.section}>
        <h3 className={styles.subtitle}>Город</h3>
        <div className={styles.options}>
          {visibleCities.map((city) => {
            const isCityChecked = filters.cityIds.includes(city.id)
            return (
              <Checkbox
                key={city.id}
                name="cities"
                value={String(city.id)}
                labelName={city.title}
                checked={isCityChecked}
                onChange={() => dispatch(toggleCity(city.id))}
                variant="subcategory"
              />
            )
          })}
        </div>
        <button
          type="button"
          className={styles.showMoreButton}
          onClick={() => setShowAllCities((prev) => !prev)}
        >
          {showAllCities ? 'Скрыть города' : 'Все города'}
          <img
            src={chevronDown}
            alt="Стрелка"
            className={`${styles.arrow} ${showAllCities ? styles.arrowUp : ''}`}
          />
        </button>
      </section>
    </aside>
  )
}
