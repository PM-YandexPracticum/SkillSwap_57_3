import { schema, Values } from './schema'
import { AboutFormProps } from './types'
import styles from './AboutForm.module.css'

import { AvatarInput } from '@/shared/ui/AvatarInput'
import { TextInput } from '@/shared/ui/TextInput'
import { Buttons } from '@/shared/ui/Buttons'
import { Select } from '@/shared/ui/Select'
import { DatePicker } from '@/shared/ui/Datepicker/DatePicker'
import { useAppSelector } from '@/store/hooks'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Skill } from '@/shared/types/apiTypes'
import { splitSkills } from '@/shared/lib/helpers'
import { useEffect } from 'react'

export function AboutForm({ setStepFn, setPreviousStep }: AboutFormProps) {
  const cities = useAppSelector((state) => state.city.data)
  const genders = useAppSelector((state) => state.gender.data)
  const skillsFromSelector = useAppSelector((state) => state.skill.data)

  const { skills, subskills } = splitSkills(skillsFromSelector as Skill[])

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(schema),
    defaultValues: {
      birthDate: new Date(),
      city: '',
      gender: '',
      name: '',
      skill: '',
      subskill: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const selectedSkill = watch('skill')
  const selectedSubskill = watch('subskill')

  const filteredSubskills = selectedSkill
    ? subskills.filter((sub) => sub.skill.title === selectedSkill)
    : subskills

  useEffect(() => {
    if (selectedSkill && selectedSubskill) {
      const sub = subskills.find((s) => s.title === selectedSubskill)
      if (sub?.skill.title !== selectedSkill) {
        setValue('subskill', '', { shouldValidate: false })
      }
    }
  }, [selectedSkill, selectedSubskill, subskills, setValue])

  useEffect(() => {
    if (selectedSubskill && !selectedSkill) {
      const sub = subskills.find((s) => s.title === selectedSubskill)
      if (sub) {
        setValue('skill', sub.skill.title, { shouldValidate: false })
      }
    }
  }, [selectedSubskill, selectedSkill, subskills, setValue])

  const onSubmit = async (data: Values) => {
    try {
      console.log(data)
      if (setStepFn) setStepFn(data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="avatar"
          control={control}
          render={({ field: { onChange }, fieldState }) => {
            return <AvatarInput onChange={onChange} error={fieldState.error?.message} />
          }}
        />
        <TextInput
          {...register('name')}
          labelName="Имя"
          placeholder="Введите ваше имя"
          error={errors.name?.message}
        />
        <div className={styles['personal-info-row']}>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <label className={styles['date-picker-label']}>
                Дата рождения
                <DatePicker value={field.value} onChange={field.onChange} />
              </label>
            )}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                labelName="Пол"
                placeholder="Не указан"
                options={genders}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </div>
        <Controller
          name="city"
          control={control}
          render={({ field, fieldState }) => (
            <Select
              labelName="Город"
              placeholder="Не указан"
              options={cities}
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="skill"
          control={control}
          render={({ field, fieldState }) => (
            <Select
              labelName="Категория навыка, которому хотите научиться"
              placeholder="Выберите категорию"
              options={skills}
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="subskill"
          control={control}
          render={({ field, fieldState }) => (
            <Select
              labelName="Подкатегория навыка, которому хотите научиться"
              placeholder="Выберите подкатегорию"
              options={filteredSubskills}
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <div className={styles.actions}>
          <Buttons
            type="button"
            onClick={() => setPreviousStep(1)}
            text="Назад"
            variant="whiteButton"
            size="semi-medium"
          />
          <Buttons type="submit" text="Продолжить" variant="greenButton" size="semi-medium" />
        </div>
      </form>
    </section>
  )
}
