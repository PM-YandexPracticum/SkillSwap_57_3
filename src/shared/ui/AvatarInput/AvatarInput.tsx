import { ChangeEvent, useState, useEffect } from 'react'
import { AvatarInputProps } from './types'
import styles from './AvatarInput.module.css'
import avatarUpload from './Icon+Add.svg'

export const AvatarInput = ({ onChange }: AvatarInputProps) => {
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setPreviewUrl(URL.createObjectURL(file))
    onChange(file)
    localStorage.setItem('avatar', file.name)
  }

  return (
    <label className={styles.avatarInput} title={previewUrl ? undefined : 'Загрузить аватар'}>
      <input className={styles.input} type="file" accept="image/*" onChange={handleFileChange} />

      {previewUrl ? (
        <img className={styles.preview} src={previewUrl} alt="Аватар пользователя" />
      ) : (
        <img className={styles.icon} src={avatarUpload} alt="Загрузить аватар" />
      )}
    </label>
  )
}
