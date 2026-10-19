import { useState } from 'react'
import { IconButton } from '@ui/IconButton'
import { Buttons } from '@ui/Buttons'
import { SkillItem } from '@ui/SkillItem'
import likeDefault from '@assets/icon/LikeDefault.svg'
import likeActive from '@assets/icon/LikeActive.svg'
import style from './UserCard.module.css'
import type { UserCardProps } from './types'

export function UserCard({
  variant = 'catalog',
  avatarUrl,
  name,
  location,
  about,
  canTeach,
  wantsToLearn,
  isLiked: initialLiked = false,
  onLike,
  onDislike,
  onDetails,
  id,
}: UserCardProps) {
  const [isLiked, setIsLiked] = useState(initialLiked)

  const handleLike = () => {
    const next = !isLiked
    setIsLiked((prev) => !prev)

    if (next) {
      onLike?.(id)
    } else {
      onDislike?.(id)
    }
  }

  return (
    <div className={style.card}>
      <div className={style.card_spotlight}>
        <img className={style.photo} src={avatarUrl} alt={name} />

        <div className={style.user_info}>
          <h3 className={style.name}>{name}</h3>
          <p className={style.additional_info}>{location}</p>
        </div>

        {variant === 'catalog' && (
          <IconButton
            className={style.like}
            icon={isLiked ? likeActive : likeDefault}
            onClick={handleLike}
          />
        )}
      </div>

      {variant === 'author' && about && <p className={style.about}>{about}</p>}

      <div className={style.skills}>
        <h4>Может научить:</h4>
        <div className={style.skillsList}>
          {canTeach.slice(0, 2).map((skill, index) => (
            <SkillItem key={index} title={skill.title} color={skill.color} />
          ))}
          {canTeach.length > 2 && (
            <SkillItem title={`+${canTeach.length - 2}`} color={canTeach[1].color} />
          )}
        </div>
      </div>

      <div className={style.skills}>
        <h4>Хочет научиться:</h4>
        <div className={style.skillsList}>
          {wantsToLearn.slice(0, 2).map((skill, index) => (
            <SkillItem key={index} title={skill.title} color={skill.color} />
          ))}
          {wantsToLearn.length > 2 && (
            <SkillItem title={`+${wantsToLearn.length - 2}`} color={wantsToLearn[1].color} />
          )}
        </div>
      </div>

      {variant === 'catalog' && (
        <Buttons
          type="button"
          size="large"
          text="Подробнее"
          onClick={onDetails ?? (() => {})}
          variant="greenButton"
        />
      )}
    </div>
  )
}
