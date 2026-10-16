import { ChangeEvent, useEffect, useMemo } from 'react'
import { AvatarInputProps } from './types'
import styles from './AvatarInput.module.css'
import avatarUpload from './Icon+Add.svg'

export const AvatarInput = ({ value, onChange, error = '' }: AvatarInputProps) => {
  const previewUrl = useMemo(() => (value ? URL.createObjectURL(value) : ''), [value])

  // useEffect(() => {
  //   return () => {
  //     if (previewUrl) {
  //       URL.revokeObjectURL(previewUrl)
  //     }
  //   }
  // }, [previewUrl])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    onChange(file)
    event.target.value = ''
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.avatarInput} title={previewUrl ? undefined : 'Загрузить аватар'}>
        <input className={styles.input} type="file" accept="image/*" onChange={handleFileChange} />

        {previewUrl ? (
          <img className={styles.preview} src={previewUrl} alt="Аватар пользователя" />
        ) : (
          <img className={styles.icon} src={avatarUpload} alt="Загрузить аватар" />
        )}
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
