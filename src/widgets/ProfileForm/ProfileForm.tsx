
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { TextInput } from '@/shared/ui/TextInput'
import { IconButton } from '@/shared/ui/IconButton'

import type { Values } from './schema'
import type { EditableField } from './types'

import editIcon from './icons/edit.svg'
import styles from './ProfileForm.module.css'

export function ProfileForm() {
  const [isEditing, setIsEditing] = useState<
    Partial<Record<EditableField, boolean>>
  >({
    email: false,
    name: false,
  })

  const {
    register,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: {
      email: 'mariia@gmail.com',
      name: 'Мария',
    },
  })

  const enableEditing = (field: EditableField) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: true,
    }))
  }

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <div className={styles.fieldRow}>
          <fieldset
            className={styles.fieldset}
            disabled={!isEditing.email}
          >
            <TextInput
              {...register('email')}
              labelName="Почта"
              placeholder="Введите почту"
              error={errors.email?.message}
            />
          </fieldset>

          <IconButton
            icon={editIcon}
            ariaLabel="Редактировать почту"
            onClick={() => enableEditing('email')}
            className={styles.editButton}
          />
        </div>

        <div className={styles.fieldRow}>
          <fieldset
            className={styles.fieldset}
            disabled={!isEditing.name}
          >
            <TextInput
              {...register('name')}
              labelName="Имя"
              placeholder="Введите имя"
              error={errors.name?.message}
            />
          </fieldset>

          <IconButton
            icon={editIcon}
            ariaLabel="Редактировать имя"
            onClick={() => enableEditing('name')}
            className={styles.editButton}
          />
        </div>
      </form>
    </section>
  )
}
