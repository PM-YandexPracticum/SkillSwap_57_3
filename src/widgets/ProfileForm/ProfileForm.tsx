import { useState, ChangeEvent, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { TextInput } from '@ui/TextInput'
import { PasswordInput } from '@ui/PasswordInput'
import { Select } from '@ui/Select'
import { Buttons } from '@ui/Buttons'
import { IconButton } from '@ui/IconButton'
import { DatePicker } from '@ui/DatePicker/DatePicker'
import { useAppSelector } from '@/store/hooks'

import userIcon from '@assets/icon/User.svg'
import calendarIcon from '@assets/ButtonSvg/calendar.svg'
import editIcon from '@assets/icon/edit.svg'
import chevronIcon from '@ui/Select/chevron-down.svg'
import galleryEditIcon from './icons/gallery-edit.svg'
import { schema, schemaWithPassword, Values } from './schema'
import { ProfileFormProps } from './types'
import styles from './ProfileForm.module.css'

export function ProfileForm({ initialValues, onSave }: ProfileFormProps) {
  const cities = useAppSelector((state) => state.city.data)
  const genders = useAppSelector((state) => state.gender.data)

  const [isEditing, setIsEditing] = useState({
    email: false,
    name: false,
    birthDate: false,
    gender: false,
    city: false,
    about: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const {
    register,
    control,
    watch,
    handleSubmit,
    reset,
    resetField,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: yupResolver(showPassword ? schemaWithPassword : schema),
    defaultValues: {
      email: '',
      name: '',
      gender: '',
      city: '',
      about: '',
      password: '',
      ...initialValues,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview)
      }
    }
  }, [avatarPreview])

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarPreview(URL.createObjectURL(file))
      setSaveMessage('')
    }
  }

  const enableEditing = (field: keyof typeof isEditing) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }))
    setSaveMessage('')
  }

  const togglePassword = () => {
    if (showPassword) {
      resetField('password')
      clearErrors('password')
    }
    setShowPassword((prev) => !prev)
    setSaveMessage('')
  }

  const onSubmit = async (values: Values) => {
    if (!onSave) {
      setSaveMessage('Сохранения профиля пока нет')
      return
    }

    try {
      await onSave({
        ...values,
        password: showPassword ? values.password : undefined,
      })
      reset({ ...values, password: '' })
      setIsEditing({
        email: false,
        name: false,
        birthDate: false,
        gender: false,
        city: false,
        about: false,
      })
      setShowPassword(false)
      setSaveMessage('Изменения сохранены')
    } catch {
      setSaveMessage('Не удалось сохранить изменения')
    }
  }

  const birthDate = watch('birthDate')
  const gender = watch('gender')
  const city = watch('city')

  const formattedBirthDate = birthDate
    ? new Date(birthDate).toLocaleDateString('ru-RU')
    : 'Не указана'

  return (
    <section className={styles.container}>
      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.emailGroup}>
            <div className={styles.fieldRow}>
              <fieldset className={styles.fieldset} disabled={!isEditing.email}>
                <TextInput
                  {...register('email')}
                  labelName="Почта"
                  placeholder="Введите почту"
                  error={errors.email?.message}
                />
              </fieldset>
              {!isEditing.email && (
                <IconButton
                  icon={editIcon}
                  ariaLabel="Редактировать почту"
                  onClick={() => enableEditing('email')}
                  className={styles.editButton}
                />
              )}
            </div>

            <div className={styles.passwordSection}>
              <button type="button" className={styles.passwordButton} onClick={togglePassword}>
                {showPassword ? 'Отменить изменение пароля' : 'Изменить пароль'}
              </button>
              {showPassword && (
                <div className={styles.passwordInput}>
                  <PasswordInput
                    {...register('password')}
                    labelName="Новый пароль"
                    placeholder="Введите новый пароль"
                    error={errors.password?.message}
                  />
                </div>
              )}
            </div>
          </div>

          <div className={styles.fieldRow}>
            <fieldset className={styles.fieldset} disabled={!isEditing.name}>
              <TextInput
                {...register('name')}
                labelName="Имя"
                placeholder="Введите имя"
                error={errors.name?.message}
              />
            </fieldset>
            {!isEditing.name && (
              <IconButton
                icon={editIcon}
                ariaLabel="Редактировать имя"
                onClick={() => enableEditing('name')}
                className={styles.editButton}
              />
            )}
          </div>

          <div className={styles.personalInfoRow}>
            <div className={styles.profileField}>
              <div className={styles.fieldHeading}>
                <span className={styles.fieldLabel}>Дата рождения</span>
                {!isEditing.birthDate && (
                  <IconButton
                    icon={editIcon}
                    ariaLabel="Редактировать дату рождения"
                    onClick={() => enableEditing('birthDate')}
                  />
                )}
              </div>
              {isEditing.birthDate ? (
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field, fieldState }) => (
                    <DatePicker
                      value={field.value ?? null}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              ) : (
                <div className={styles.readonlyField}>
                  <span>{formattedBirthDate}</span>
                  <img src={calendarIcon} alt="" className={styles.fieldIcon} />
                </div>
              )}
            </div>

            <div className={styles.profileField}>
              {isEditing.gender ? (
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
              ) : (
                <>
                  <div className={styles.fieldHeading}>
                    <span className={styles.fieldLabel}>Пол</span>
                    <IconButton
                      icon={editIcon}
                      ariaLabel="Редактировать пол"
                      onClick={() => enableEditing('gender')}
                    />
                  </div>
                  <div className={styles.readonlyField}>
                    <span>{gender || 'Не указан'}</span>
                    <img src={chevronIcon} alt="" className={styles.fieldIcon} />
                  </div>
                  {errors.gender && <span className={styles.error}>{errors.gender.message}</span>}
                </>
              )}
            </div>
          </div>

          <div className={styles.profileField}>
            {isEditing.city ? (
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
            ) : (
              <>
                <div className={styles.fieldHeading}>
                  <span className={styles.fieldLabel}>Город</span>
                  <IconButton
                    icon={editIcon}
                    ariaLabel="Редактировать город"
                    onClick={() => enableEditing('city')}
                  />
                </div>
                <div className={styles.readonlyField}>
                  <span>{city || 'Не указан'}</span>
                  <img src={chevronIcon} alt="" className={styles.fieldIcon} />
                </div>
                {errors.city && <span className={styles.error}>{errors.city.message}</span>}
              </>
            )}
          </div>

          <div className={styles.fieldRow}>
            <label className={styles.aboutLabel} htmlFor="profile-about">
              О себе
            </label>
            <textarea
              {...register('about')}
              id="profile-about"
              className={`${styles.aboutTextarea} ${errors.about ? styles.inputError : ''}`}
              placeholder="Расскажите о себе"
              disabled={!isEditing.about}
            />
            {!isEditing.about && (
              <IconButton
                icon={editIcon}
                ariaLabel="Редактировать информацию о себе"
                onClick={() => enableEditing('about')}
                className={styles.aboutEditButton}
              />
            )}
            {errors.about && <span className={styles.error}>{errors.about.message}</span>}
          </div>

          <div className={styles.saveButton}>
            <Buttons
              type="submit"
              text={isSubmitting ? 'Сохранение...' : 'Сохранить'}
              variant="greenButton"
              size="full-width"
            />
          </div>
          {saveMessage && <p className={styles.saveMessage} role="status">{saveMessage}</p>}
        </form>

        <label className={styles.avatarLabel}>
          <input
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleAvatarChange}
          />
          <div className={styles.avatar}>
            {avatarPreview ? (
              <img src={avatarPreview} alt="Аватар пользователя" className={styles.avatarPreview} />
            ) : (
              <img src={userIcon} alt="Аватар пользователя" className={styles.avatarIcon} />
            )}
          </div>
          <div className={styles.avatarBadge}>
            <img src={galleryEditIcon} alt="" />
          </div>
        </label>
      </div>
    </section>
  )
}
