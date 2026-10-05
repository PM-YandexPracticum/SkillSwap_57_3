import styles from './Filters.module.css'
import { Radio } from '@/shared/ui/Radio'
import { Checkbox } from '@/shared/ui/Checkbox'

const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d={isOpen ? 'M1 8L8 1L15 8' : 'M1 1L8 8L15 1'}
      stroke="rgba(37, 48, 23, 1)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

interface FiltersProps {
  gender: 'any' | 'male' | 'female'
  setGender: (v: 'any' | 'male' | 'female') => void
  mode: 'all' | 'learn' | 'teach'
  setMode: (v: 'all' | 'learn' | 'teach') => void
  selectedCities: Record<string, boolean>
  selectedSkills: Record<string, boolean>
  openCategories: string[]
  isCitiesOpen: boolean
  setIsCitiesOpen: (v: boolean) => void
  isCategoriesOpen: boolean
  setIsCategoriesOpen: (v: boolean) => void
  handleCityChange: (city: string) => (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSkillChange: (skill: string) => (e: React.ChangeEvent<HTMLInputElement>) => void
  toggleCategory: (cat: string) => void
  interactionModes: readonly { id: string; label: string }[]
  genderOptions: readonly { value: string; label: string }[]
  citiesList: readonly string[]
  skillCategories: readonly string[]
  skillsData: Record<string, string[]>
}

export const Filters = ({
  gender,
  setGender,
  mode,
  setMode,
  selectedCities,
  selectedSkills,
  openCategories,
  isCitiesOpen,
  setIsCitiesOpen,
  isCategoriesOpen,
  setIsCategoriesOpen,
  handleCityChange,
  handleSkillChange,
  toggleCategory,
  interactionModes,
  genderOptions,
  citiesList,
  skillCategories,
  skillsData,
}: FiltersProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.title}>Фильтры</h3>
        <Radio
          name="mode"
          value={mode}
          onChange={(v) => setMode(v as 'all' | 'learn' | 'teach')}
          options={interactionModes.map((m) => ({ value: m.id, label: m.label }))}
        />
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>Навыки</h3>
        {skillCategories.map((cat) => {
          const isOpen = openCategories.includes(cat)
          const isSelected = !!selectedSkills[cat]
          const subSkills = skillsData[cat] || []

          return (
            <div key={cat}>
              <div
                className={`${styles.categoryHeader} ${isOpen ? styles.isOpen : ''}`}
                onClick={() => {
                  if (isSelected) toggleCategory(cat)
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && isSelected) {
                    toggleCategory(cat)
                  }
                }}
                style={{ cursor: isSelected ? 'pointer' : 'default' }}
              >
                <Checkbox
                  name={cat}
                  labelName={cat}
                  value={cat}
                  variant="category"
                  checked={isSelected}
                  onChange={handleSkillChange(cat)}
                />
                {isSelected && (
                  <span className={styles.categoryArrow}>
                    <ArrowIcon isOpen={isOpen} />
                  </span>
                )}
              </div>

              {isSelected && (
                <div className={styles.subCategoryList}>
                  {subSkills.map((skill) => (
                    <Checkbox
                      key={skill}
                      name={skill}
                      labelName={skill}
                      value={skill}
                      variant="subcategory"
                      checked={!!selectedSkills[skill]}
                      onChange={handleSkillChange(skill)}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}

        <button
          type="button"
          className={`${styles.showAllBtn} ${isCategoriesOpen ? styles.isOpen : ''}`}
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
        >
          <span className={styles.btnText}>Все категории</span>
          <span className={styles.btnArrow}>
            <ArrowIcon isOpen={isCategoriesOpen} />
          </span>
        </button>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>Пол автора</h3>
        <Radio
          name="gender"
          value={gender}
          onChange={(v) => setGender(v as 'any' | 'male' | 'female')}
          options={genderOptions.map((g) => ({ value: g.value, label: g.label }))}
        />
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>Город</h3>
        <div className={styles.checkboxList}>
          {citiesList.map((city) => (
            <Checkbox
              key={city}
              name={city}
              labelName={city}
              value={city}
              variant="category"
              checked={!!selectedCities[city]}
              onChange={handleCityChange(city)}
            />
          ))}
        </div>
        <button
          type="button"
          className={`${styles.showAllBtn} ${isCitiesOpen ? styles.isOpen : ''}`}
          onClick={() => setIsCitiesOpen(!isCitiesOpen)}
        >
          <span className={styles.btnText}>Все города</span>
          <span className={styles.btnArrow}>
            <ArrowIcon isOpen={isCitiesOpen} />
          </span>
        </button>
      </div>
    </div>
  )
}
