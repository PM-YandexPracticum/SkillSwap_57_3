import styles from './Confirm.module.css'
import { ConfirmProps } from './types'
import { Carousel } from '@/shared/ui/Carousel'
import { Buttons } from '@/shared/ui/Buttons'
import { ButtonsWithIcon } from '@/shared/ui/ButtonsWithIcon'
import { useEffect, useState } from 'react'

export const Confirm = ({
  title,
  category,
  description,
  images,
  onEdit,
  onConfirm,
}: ConfirmProps) => {
  const [previewImages, setPreivewImages] = useState<Array<string> | null>(null)

  useEffect(() => {
    if (!images) {
      setPreivewImages(null)
      return
    }

    const urls = images.map((image) => URL.createObjectURL(image))
    setPreivewImages(urls)

    return () => {
      if (previewImages) {
        previewImages.forEach((url) => URL.revokeObjectURL(url))
      }
    }
  }, [images])

  return (
    <div className={styles.overlay}>
      <div className={styles.confirm}>
        <div className={styles.caption}>
          <h3 className={styles.captionTitle}>Ваше предложение</h3>
          <p className={styles.captionDesc}>
            Пожалуйста, проверьте и подтвердите правильность данных
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.info}>
            <h2 className={styles.title}>{title}</h2>
            <span className={styles.category}>{category}</span>
            <p className={styles.description}>{description}</p>
            <div className={styles.actions}>
              <ButtonsWithIcon
                text="Редактировать"
                iconSrc="/src/assets/icon/edit.svg"
                onClick={onEdit}
                size="semi-medium"
                gap="gapSmall"
                position="right"
                border={false}
                greenBorder={true}
              />
              <Buttons
                type="button"
                text="Готово"
                onClick={onConfirm}
                variant="greenButton"
                size="semi-medium"
              />
            </div>
          </div>
          {previewImages && (
            <Carousel>
              {previewImages.map((image, index) => (
                <img key={index} src={image} alt="Фотография навыка" />
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  )
}
