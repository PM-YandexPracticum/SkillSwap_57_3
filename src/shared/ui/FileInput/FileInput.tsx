import { ChangeEvent, DragEvent } from 'react'
import { FileInputProps } from './types'
import FileInputIcon from '@assets/icon/FileInputIcon.svg'
import styles from './FileInput.module.css'

export function FileInput({ onChange }: FileInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }

    onChange(Array.from(e.target.files))
  }

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()

    if (!e.dataTransfer.files) {
      return
    }

    onChange(Array.from(e.dataTransfer.files))
  }

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
  }

  return (
    <label className={styles.label} onDragOver={handleDragOver} onDrop={handleDrop}>
      <p>Перетащите или выберите изображения навыка</p>

      <div className={styles.secondLine}>
        <img className={styles.icon} src={FileInputIcon} alt="file input icon" />
        <p>Выбрать изображения</p>
      </div>

      <input className={styles.input} type="file" multiple onChange={handleChange} />
    </label>
  )
}
