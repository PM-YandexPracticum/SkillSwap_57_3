import { useState } from 'react'
import styles from './ExchangeCard.module.css'
import { ExchangeCardProps } from './types'
import { Carousel } from '@/shared/ui/Carousel'
import { Buttons } from '@/shared/ui/Buttons'
import { ButtonsWithIcon } from '@/shared/ui/ButtonsWithIcon'
import { IconButton } from '@/shared/ui/IconButton'

import likeDefault from '@assets/icon/LikeDefault.svg'
import likeActive from '@assets/icon/LikeActive.svg'
import share from '@assets/icon/Share.svg'
import more from '@assets/icon/MoreSquare.svg'
import clock from '@assets/icon/Clock.svg'

export const ExchangeCard = ({
  title,
  category,
  description,
  images,
  isLiked: initialLiked = false,
  status,
  onExchange,
  onLike,
  onShare,
  onLearnMore,
}: ExchangeCardProps) => {
  const [isLiked, setIsLiked] = useState(initialLiked)

  const handleLike = () => {
    setIsLiked((prev) => !prev)
    onLike()
  }

  return (
    <div className={styles.exchange}>
      <div className={styles.actions}>
        <IconButton
          icon={likeDefault}
          activeIcon={likeActive}
          onClick={handleLike}
          isActive={isLiked}
          ariaLabel={isLiked ? 'Удалить из избранного' : 'Добавить в избранное'}
        />
        <IconButton icon={share} onClick={onShare} ariaLabel={'Поделиться'} />
        <IconButton icon={more} onClick={onLearnMore} ariaLabel={'Узнать больше'} />
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.category}>{category}</span>
          <p className={styles.description}>{description}</p>
          <div className={styles.button}>
            {status === 'PENDING' ? (
              <ButtonsWithIcon
                text="Обмен предложен"
                iconSrc={clock}
                onClick={() => {}}
                size="full-width"
                gap="gapSmall"
                position="left"
                border={false}
                greenBorder={true}
              />
            ) : (
              <Buttons
                type="button"
                text={
                  status === 'available'
                    ? 'Предложить обмен'
                    : status === 'ACCEPTED'
                      ? 'Обмен принят'
                      : 'Обмен отклонен'
                }
                onClick={status === 'available' ? onExchange : () => {}}
                variant={status === 'REJECTED' ? 'whiteButton' : 'greenButton'}
                size="full-width"
              />
            )}
          </div>
        </div>

        <Carousel>
          {images.map((image, index) => (
            <img key={index} src={image} alt="Фотография навыка" />
          ))}
        </Carousel>
      </div>
    </div>
  )
}
