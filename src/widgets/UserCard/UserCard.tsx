import { useState } from 'react';
import { IconButton } from '@ui/IconButton';
import { Buttons } from '@ui/Buttons';
import { SkillItem } from '@ui/SkillItem';
import likeDefault from '@assets/icon/LikeDefault.svg';
import likeActive from '@assets/icon/LikeActive.svg';
import style from './UserCard.module.css';
import type { UserCardProps } from './types';

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
  onDetails,
}: UserCardProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    onLike?.();
  };

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

      {variant === 'author' && about && (
        <p className={style.about}>{about}</p>
      )}

      <div className={style.skills}>
        <h4>Может научить:</h4>
        <div className={style.skillsList}>
          {canTeach.slice(0, 2).map((skill, index) => (
            <SkillItem key={index} title={skill} color="light_beige" />
          ))}
          {canTeach.length > 2 && (
            <SkillItem
              title={`+${canTeach.length - 2}`}
              color="light_beige"
            />
          )}
        </div>
      </div>

      <div className={style.skills}>
        <h4>Хочет научиться:</h4>
        <div className={style.skillsList}>
          {wantsToLearn.slice(0, 2).map((skill, index) => (
            <SkillItem key={index} title={skill} color="light_pink" />
          ))}
          {wantsToLearn.length > 2 && (
            <SkillItem
              title={`+${wantsToLearn.length - 2}`}
              color="light_pink"
            />
          )}
        </div>
      </div>

      {variant === 'catalog' && (
        <Buttons
          size="large"
          text="Подробнее"
          onClick={onDetails ?? (() => {})}
          variant="greenButton"
        />
      )}
    </div>
  );
}