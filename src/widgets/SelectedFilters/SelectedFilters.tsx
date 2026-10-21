import { useAppSelector, useAppDispatch } from '@/store/hooks'
import styles from './SelectedFilters.module.css'
import cross from '@assets/icon/cross.svg'

import {
  setMode,
  setSearch,
  toggleSkill,
  toggleSubskill,
  toggleCity,
  toggleGender,
} from '@/entities/filters/filterSlice'

export function SelectedFilters() {
  const dispatch = useAppDispatch()
  // текущие фильтры
  const filters = useAppSelector((state) => state.filters.users)
  // категории фильтров
  const cities = useAppSelector((state) => state.city.data)
  const genders = useAppSelector((state) => state.gender.data)
  const skills = useAppSelector((state) => state.skill.data)

  const modeFilter =
    filters.mode !== 'all'
      ? [
          {
            id: 'mode',
            label: filters.mode === 'canTeach' ? 'Могу научить' : 'Хочу научиться',
            onRemove: () => dispatch(setMode('all')),
          },
        ]
      : []

  const searchFilter = filters.search.trim()
    ? [
        {
          id: 'search',
          label: `Поиск: ${filters.search}`,
          onRemove: () => dispatch(setSearch('')),
        },
      ]
    : []

  const skillsWithSelectedSubskills = new Set(
    skills
      ?.filter((skill) =>
        skill.subskills.some((subskill) => filters.subskillIds.includes(subskill.id)),
      )
      .map((skill) => skill.id),
  )

  const skillFilters = filters.skillIds
    .filter((id) => !skillsWithSelectedSubskills.has(id))
    .map((id) => {
      const skill = skills?.find((skill) => skill.id === id)

      return {
        id: `skill-${id}`,
        label: skills?.find((skill) => skill.id === id)?.title,
        onRemove: () =>
          dispatch(
            toggleSkill({
              id,
              subskillIds: skill?.subskills.map((subskill) => subskill.id) ?? [],
            }),
          ),
      }
    })

  const subskillFilters = filters.subskillIds.map((id) => {
    const skill = skills?.find((skill) => skill.subskills.some((subskill) => subskill.id === id))

    return {
      id: `subskill-${id}`,
      label: skill?.subskills.find((subskill) => subskill.id === id)?.title,
      onRemove: () => dispatch(toggleSubskill(id)),
    }
  })

  const cityFilters = filters.cityIds.map((id) => ({
    id: `city-${id}`,
    label: cities.find((city) => city.id === id)?.title,
    onRemove: () => dispatch(toggleCity(id)),
  }))

  const genderFilters = filters.genderIds.map((id) => ({
    id: `gender-${id}`,
    label: genders.find((gender) => gender.id === id)?.title,
    onRemove: () => dispatch(toggleGender(id)),
  }))

  const selectedFilters = [
    ...modeFilter,
    ...searchFilter,
    ...skillFilters,
    ...subskillFilters,
    ...cityFilters,
    ...genderFilters,
  ]

  return (
    <div className={styles.filters}>
      {selectedFilters.map((filter) => (
        <div key={filter.id} className={styles.selectedFilter}>
          <span className={styles.filterName}>{filter.label}</span>
          <button
            type="button"
            onClick={filter.onRemove}
            aria-label={`Удалить фильтр ${filter.label}`}
          >
            <img src={cross} alt="Крестик" />
          </button>
        </div>
      ))}
    </div>
  )
}
