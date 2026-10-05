import { useState } from 'react'
import { UserCard } from '@widgets/UserCard'
import styles from './styles.module.css'
import { ButtonsWithIcon } from '@ui/ButtonsWithIcon'
import { Filters } from '@widgets/Filters'

const interactionModes = [
  { id: 'all', label: 'Всё' },
  { id: 'learn', label: 'Хочу научиться' },
  { id: 'teach', label: 'Могу научить' },
] as const

const genderOptions = [
  { value: 'any', label: 'Не имеет значения' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
] as const

const citiesList = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань'] as const

const skillCategories = [
  'Бизнес и карьера',
  'Творчество и искусство',
  'Иностранные языки',
  'Образование и развитие',
  'Здоровье и лайфстайл',
  'Дом и уют',
] as const

const skillsData: Record<string, string[]> = {
  'Творчество и искусство': [
    'Рисование и иллюстрация',
    'Фотография',
    'Видеомонтаж',
    'Музыка и звук',
    'Актёрское мастерство',
    'Креативное письмо',
    'Арт-терапия',
    'Декор и DIY',
  ],
  'Бизнес и карьера': [
    'Управление командой',
    'Маркетинг и реклама',
    'Продажи и переговоры',
    'Личный бренд',
    'Резюме и собеседование',
    'Тайм-менеджмент',
    'Проектное управление',
    'Предпринимательство',
  ],
  'Иностранные языки': [
    'Английский',
    'Французский',
    'Испанский',
    'Немецкий',
    'Китайский',
    'Японский',
    'Подготовка к экзаменам (IELTS, TOEFL)',
  ],
  'Образование и развитие': [
    'Личностное развитие',
    'Навыки обучения',
    'Когнитивные техники',
    'Скорочтение',
    'Навыки преподавания',
    'Коучинг',
  ],
  'Здоровье и лайфстайл': [
    'Йога и медитация',
    'Питание и ЗОЖ',
    'Ментальное здоровье',
    'Осознанность',
    'Физические тренировки',
    'Сон и восстановление',
    'Баланс жизни и работы',
  ],
  'Дом и уют': [
    'Уборка и организация',
    'Домашние финансы',
    'Приготовление еды',
    'Домашние растения',
    'Ремонт',
    'Хранение вещей',
  ],
}

export default function CatalogPage() {
  const [gender, setGender] = useState<'any' | 'male' | 'female'>('any')
  const [mode, setMode] = useState<'all' | 'learn' | 'teach'>('all')
  const [selectedCities, setSelectedCities] = useState<Record<string, boolean>>({})
  const [selectedSkills, setSelectedSkills] = useState<Record<string, boolean>>({})
  const [openCategories, setOpenCategories] = useState<string[]>([])
  const [isCitiesOpen, setIsCitiesOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

  const handleCityChange = (city: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCities((prev) => ({ ...prev, [city]: e.target.checked }))
  }

  const handleSkillChange = (skill: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSkills((prev) => ({ ...prev, [skill]: e.target.checked }))
  }

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    )
  }

  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <Filters
          gender={gender}
          setGender={setGender}
          mode={mode}
          setMode={setMode}
          selectedCities={selectedCities}
          selectedSkills={selectedSkills}
          openCategories={openCategories}
          isCitiesOpen={isCitiesOpen}
          setIsCitiesOpen={setIsCitiesOpen}
          isCategoriesOpen={isCategoriesOpen}
          setIsCategoriesOpen={setIsCategoriesOpen}
          handleCityChange={handleCityChange}
          handleSkillChange={handleSkillChange}
          toggleCategory={toggleCategory}
          interactionModes={interactionModes}
          genderOptions={genderOptions}
          citiesList={citiesList}
          skillCategories={skillCategories}
          skillsData={skillsData}
        />
      </aside>

      <div className={styles.categories}>
        <section className={styles.spotlight}>
          <div className={styles.section_header}>
            <h2>Популярное</h2>
            <ButtonsWithIcon
              gap="gapSmall"
              iconSrc="./src/assets/ButtonSvg/chevron-right.svg"
              onClick={() => {}}
              text="Смотреть все"
              size="small"
              position="right"
            />
          </div>
          <div className={styles.user_cards}>
            <UserCard />
            <UserCard />
            <UserCard />
          </div>
        </section>

        <section className={styles.spotlight}>
          <div className={styles.section_header}>
            <h2>Новое</h2>
            <ButtonsWithIcon
              gap="gapSmall"
              iconSrc="./src/assets/ButtonSvg/chevron-right.svg"
              onClick={() => {}}
              text="Смотреть все"
              size="small"
              position="right"
            />
          </div>
          <div className={styles.user_cards}>
            <UserCard />
            <UserCard />
            <UserCard />
          </div>
        </section>

        <section className={styles.spotlight}>
          <div className={styles.section_header}>
            <h2>Рекомендуем</h2>
          </div>
          <div className={styles.user_cards}>
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
          </div>
        </section>
      </div>
    </main>
  )
}
