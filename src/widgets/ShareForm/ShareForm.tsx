import { useEffect } from 'react'
import { TextInput } from '@ui/TextInput'
import { Select } from '@ui/Select'
import { TextArea } from '@ui/TextArea'
import { FileInput } from '@ui/FileInput'
import { Buttons } from '@ui/Buttons'
import styles from './shareForm.module.css'
import type { ShareFormProps } from './types'

import { schema, Values } from './schema'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Skill } from '@/shared/types/apiTypes'
import { splitSkills } from '@/shared/lib/helpers'
import { useAppSelector } from '@/store/hooks'

export function ShareForm({ setStepFn, setPreviousStep, registerData }: ShareFormProps) {
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
      canTeachSkillName: registerData?.canTeachSkillName ?? '',
      canTeachSkill: registerData?.canTeachSkill ?? '',
      canTeachSubskill: registerData?.canTeachSubskill ?? '',
      canTeachDescription: registerData?.canTeachDescription ?? '',
      skillFile: registerData?.skillFile ?? [],
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const selectedSkill = watch('canTeachSkill')
  const selectedSubskill = watch('canTeachSubskill')

  const filteredSubskills = selectedSkill
    ? subskills.filter((sub) => sub.title === selectedSkill)
    : subskills

  useEffect(() => {
    if (selectedSkill && selectedSubskill) {
      const sub = subskills.find((s) => s.title === selectedSubskill)
      if (sub?.title !== selectedSkill) {
        setValue('canTeachSubskill', '', { shouldValidate: false })
      }
    }
  }, [selectedSkill, selectedSubskill, subskills, setValue])

  useEffect(() => {
    if (selectedSubskill && !selectedSkill) {
      const sub = subskills.find((s) => s.title === selectedSubskill)
      if (sub) {
        setValue('canTeachSkill', sub.title, { shouldValidate: false })
      }
    }
  }, [selectedSubskill, selectedSkill, subskills, setValue])

  const onSubmit = async (data: Values) => {
    try {
      if (setStepFn) setStepFn(data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register('canTeachSkillName')}
        labelName="Название навыка"
        placeholder="Введите название вашего навыка"
        error={errors.canTeachSkillName?.message}
      />

      <Controller
        name="canTeachSkill"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            labelName="Категория навыка"
            placeholder="Выберите категорию навыка"
            options={skills}
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="canTeachSubskill"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            labelName="Подкатегория навыка"
            placeholder="Выберите подкатегорию навыка"
            options={filteredSubskills}
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="canTeachDescription"
        control={control}
        render={({ field, fieldState }) => (
          <TextArea
            labelName="Описание"
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="skillFile"
        control={control}
        render={({ field: { onChange, value }, fieldState }) => {
          return (
            <FileInput
              value={value}
              onChange={onChange}
              error={fieldState.error?.message}
              maxFiles={4}
            />
          )
        }}
      />

      <div className={styles.buttons}>
        <Buttons
          type="button"
          text="Назад"
          variant="whiteButton"
          size="medium"
          onClick={() => setPreviousStep(2)}
        />
        <Buttons
          type="submit"
          text="Продолжить"
          variant="greenButton"
          size="medium"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  )
}
