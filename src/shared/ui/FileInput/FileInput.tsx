import { ChangeEvent, DragEvent, useRef } from 'react'
import { FileInputProps } from './types'
import FileInputIcon from '@assets/icon/FileInputIcon.svg'
import styles from './FileInput.module.css'

export function FileInput({ value = [], onChange, error }: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const incoming = Array.from(files)
    // объединяем с уже выбранными + убираем дубликаты по name+size
    const merged = [...value, ...incoming].filter(
      (file, idx, arr) =>
        arr.findIndex((f) => f.name === file.name && f.size === file.size) === idx
    )
    onChange(merged)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files)

    if (inputRef.current) inputRef.current.value = ''
  }

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    addFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
  }

  const handleRemove = (fileToRemove: File) => {
    onChange(value.filter((f) => f !== fileToRemove))
  }

  return (
    <div className={styles.inputWrapper}>
      <label
        className={`${styles.label} ${error ? styles.error : ''}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p>Перетащите или выберите изображения навыка</p>

        <div className={styles.secondLine}>
          <img className={styles.icon} src={FileInputIcon} alt="file input icon" />
          <p>Выбрать изображения</p>
        </div>

        <input
          ref={inputRef}
          className={styles.input}
          type="file"
          multiple
          accept="image/jpeg,image/png"
          onChange={handleChange}
        />
      </label>

      {value.length > 0 && (
        <ul className={styles.preview}>
          {value.map((file) => (
            <li
              key={`${file.name}-${file.size}-${file.lastModified}`}
              className={styles.previewItem}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className={styles.previewImg}
                onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
              />
              <span className={styles.previewName} title={file.name}>
                {file.name}
              </span>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => handleRemove(file)}
                aria-label={`Удалить ${file.name}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  )
}
