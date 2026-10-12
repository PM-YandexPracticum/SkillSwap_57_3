import { useEffect, useState } from 'react'
import { TextInput } from '@ui/TextInput'
import { Select } from '@ui/Select'
import { TextArea } from '@ui/TextArea'
import { FileInput } from '@ui/FileInput'
import { Buttons } from '@ui/Buttons'
import styles from './shareForm.module.css'
import type { ShareFormProps, ShareFormData, SkillWithSubskills, FormErrors } from './types'

export function ShareForm({ onSubmit, onBack }: ShareFormProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<File[]>([])

  const [skills, setSkills] = useState<SkillWithSubskills[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [errorsValidation, setErrorsValidation] = useState<FormErrors>({})
  const [touchedValidation, setTouchedValidation] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const responce = await fetch('http://localhost:5000/api/skills/')

        if (!responce.ok) {
          throw new Error(`Ошибка ${responce.status}: ${responce.statusText}`)
        }

        const data: SkillWithSubskills[] = await responce.json()
        setSkills(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Не удалось загрузить категории')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const CATEGORY_OPTIONS = skills.map((skill) => ({
    value: String(skill.id),
    label: skill.title,
  }))

  const selectedSkill = skills.find((s) => String(s.id) === category)

  const SUBCATEGORY_OPTIONS = (selectedSkill?.subskills ?? []).map((sub) => ({
    value: String(sub.id),
    label: sub.title,
  }))

  const validate = (): FormErrors => {
    const next: FormErrors = {}

    if (!name.trim()) {
      next.name = 'Введите название навыка'
    }

    if (!category) {
      next.category = 'Выберите категорию'
    }

    if (!subcategory) {
      next.subcategory = 'Выберите подкатегорию'
    }

    if (!description.trim()) {
      next.description = 'Введите описание'
    }

    if (images.length === 0) {
      next.images = 'Загрузите хотя бы одно изображение'
    }

    return next
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    setSubcategory('')

    if (touchedValidation) {
      setErrorsValidation((prev) => ({ ...prev, category: undefined, subcategory: undefined }))
    }
  }

  const handleSubmit = () => {
    setTouchedValidation(true)
    const nextErrors = validate()
    setErrorsValidation(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const data: ShareFormData = {
      name: name.trim(),
      category,
      subcategory,
      description: description.trim(),
      images,
    }
    onSubmit?.(data)
  }

  const handleBack = () => {
    onBack?.()
  }

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div>
        <TextInput
          labelName="Название навыка"
          placeholder="Введите название вашего навыка"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value)
            if (touchedValidation) setErrorsValidation((prev) => ({ ...prev, name: undefined }))
          }}
        />
        {touchedValidation && errorsValidation.name && (
          <p className={styles.error}>{errorsValidation.name}</p>
        )}
      </div>

      <div>
        <Select
          labelName="Категория навыка"
          placeholder={isLoading ? 'Загрузка...' : 'Выберите категорию'}
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={handleCategoryChange}
        />
        {touchedValidation && errorsValidation.category && (
          <p className={styles.error}>{errorsValidation.category}</p>
        )}
      </div>

      <div>
        <Select
          labelName="Подкатегория навыка"
          placeholder={!category ? 'Сначала выберите категорию' : 'Выберите подкатегорию'}
          options={SUBCATEGORY_OPTIONS}
          value={subcategory}
          onChange={(value: string) => {
            setSubcategory(value)
            if (touchedValidation)
              setErrorsValidation((prev) => ({ ...prev, subcategory: undefined }))
          }}
        />
        {touchedValidation && errorsValidation.subcategory && (
          <p className={styles.error}>{errorsValidation.subcategory}</p>
        )}
      </div>

      <div>
        <TextArea
          labelName="Описание"
          value={description}
          onChange={(value: string) => {
            setDescription(value)
            if (touchedValidation)
              setErrorsValidation((prev) => ({ ...prev, description: undefined }))
          }}
        />
        {touchedValidation && errorsValidation.description && (
          <p className={styles.error}>{errorsValidation.description}</p>
        )}
      </div>

      <div>
        <FileInput
          onChange={(files: File[]) => {
            setImages(files)
            if (touchedValidation) setErrorsValidation((prev) => ({ ...prev, images: undefined }))
          }}
        />
        {touchedValidation && errorsValidation.images && (
          <p className={styles.error}>{errorsValidation.images}</p>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.buttons}>
        <Buttons text="Назад" variant="whiteButton" size="medium" onClick={handleBack} />
        <Buttons text="Продолжить" variant="greenButton" size="medium" onClick={handleSubmit} />
      </div>
    </form>
  )
}
