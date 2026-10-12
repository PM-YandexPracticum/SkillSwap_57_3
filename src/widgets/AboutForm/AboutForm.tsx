import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { aboutFormSchema } from './AboutForm.validation'
import { AboutFormProps } from './types'
import styles from './AboutForm.module.css'
import { Skill, City, Genders } from '@/shared/types/apiTypes'

import { AvatarInput } from '@/shared/ui/AvatarInput'
import { TextInput } from '@/shared/ui/TextInput'
import { Buttons } from '@/shared/ui/Buttons'
import { Select } from '@/shared/ui/Select'
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker'

export function AboutForm({
  avatar,
  name,
  birthDate,
  gender,
  city,
  skill,
  subskill,
  onAvatarChange,
  onNameChange,
  onBirthDateChange,
  onGenderChange,
  onCityChange,
  onSkillChange,
  onSubskillChange,
  onBack,
  onContinue,
}: AboutFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  // TODO: получать данные из store
  const [skills, setSkills] = useState<Skill[]>()
  const [genders, setGenders] = useState<Genders[]>()
  const [cities, setCities] = useState<City[]>()
  // TODO: перенести загрузку в slice
  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsData = await fetch('http://localhost:5000/api/skills/').then((data) => data)
        setSkills(await skillsData.json())

        const gendersData = await fetch('http://localhost:5000/api/genders/').then((data) => data)
        setGenders(await gendersData.json())

        const citiesData = await fetch('http://localhost:5000/api/cities/').then((data) => data)
        setCities(await citiesData.json())
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  // сохраняем выбранную категорию для последующей фильтрации опций подкатегорий
  const selectedSkill = skills?.find((item) => String(item.id) === skill)

  // подготавлияваем опции для селектов
  const gendersOptions =
    genders?.map((gender) => ({
      value: String(gender.id),
      label:
        gender.title === 'male' ? 'Мужской' : gender.title === 'female' ? 'Женский' : 'Не указан',
    })) ?? []

  const citiesOptions = cities?.map((city) => ({ value: String(city.id), label: city.title })) ?? []

  const skillsOptions =
    skills?.map((skill) => ({ value: String(skill.id), label: skill.title })) ?? []

  const subskillsOptions = selectedSkill
    ? selectedSkill.subskills.map((subskill) => ({
        value: String(subskill.id),
        label: subskill.title,
      }))
    : (skills?.reduce<{ value: string; label: string }[]>((options, skill) => {
        skill.subskills.forEach((subskill) => {
          options.push({
            value: String(subskill.id),
            label: subskill.title,
          })
        })
        return options
      }, []) ?? [])

  // для сброса подкатегории при выборе категории
  const handleSkillChange = (value: string) => {
    onSkillChange(value)
    onSubskillChange('')
  }

  // для выбора категории при выборе подкатегории
  const handleSubskillChange = (value: string) => {
    onSubskillChange(value)
    const category = skills?.find((item) =>
      item.subskills.some((subitem) => String(subitem.id) === value),
    )
    if (category && String(category.id) !== skill) {
      onSkillChange(String(category.id))
    }
  }
  // валидация перед продолжением
  const handleSubmit = async () => {
    try {
      await aboutFormSchema.validate(
        {
          avatar,
          name,
          birthDate,
          gender,
          city,
          skill,
          subskill,
        },
        { abortEarly: false }, //собрать ошибки сразу по всем полям
      )
      setErrors({})
      onContinue()
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        const formErrors: Record<string, string> = {}
        e.inner.forEach((error) => {
          if (error.path && !formErrors[error.path]) {
            formErrors[error.path] = error.message
          }
        })
        setErrors(formErrors)
      }
    }
  }

  return (
    <section className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          handleSubmit().catch(console.error)
        }}
      >
        <AvatarInput onChange={onAvatarChange} error={errors.avatar}/>
        <TextInput
          labelName="Имя"
          placeholder="Введите ваше имя"
          onChange={onNameChange}
          value={name}
        />
        <div className={styles['personal-info-row']}>
          <label className={styles['date-picker-label']}>
            Дата рождения
            <DatePicker value={birthDate} onChange={onBirthDateChange} />
          </label>
          <Select
            labelName="Пол"
            placeholder="Не указан"
            options={gendersOptions}
            onChange={onGenderChange}
            value={gender}
          />
        </div>
        <Select
          labelName="Город"
          placeholder="Не указан"
          options={citiesOptions}
          onChange={onCityChange}
          value={city}
        />
        <Select
          labelName="Категория навыка, которому хотите научиться"
          placeholder="Выберите категорию"
          options={skillsOptions}
          onChange={handleSkillChange}
          value={skill}
        />
        <Select
          labelName="Подкатегория навыка, которому хотите научиться"
          placeholder="Выберите подкатегорию"
          options={subskillsOptions}
          onChange={handleSubskillChange}
          value={subskill}
        />
        <div className={styles.actions}>
          <Buttons text="Назад" onClick={onBack} variant="whiteButton" size="semi-medium" />
          <Buttons
            text="Продолжить"
            onClick={handleSubmit}
            variant="greenButton"
            size="semi-medium"
          />
        </div>
      </form>
    </section>
  )
}
