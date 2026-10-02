import { IconButton } from '@ui/IconButton'
import style from './UserCard.module.css'
import like from '@assets/icon/LikeDefault.svg'
import { Buttons } from '@ui/Buttons'
import { SkillItem } from '@ui/SkillItem'

export function UserCard() {
  return (
    <div className={style.card}>
      <div className={style.card_spotlight}>
        <img
          className={style.photo}
          src="https://img.magnific.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"
          alt="Аватарка"
        />
        <div className={style.user_info}>
          <h3 className={style.name}>Иван</h3>
          <p className={style.additional_info}>Санкт-Петербург, 34 года</p>
        </div>
        <IconButton className={style.like} icon={like} onClick={() => {}} />
      </div>
      <div className={style.skills}>
        <h4>Может научить</h4>
        <SkillItem title="Игра на барабанах" color="light_pink" />
      </div>
      <div className={style.skills}>
        <h4>Хочет научиться</h4>
        <SkillItem title="Тайм менеджмент" color="light_beige" />
      </div>
      <Buttons size="large" text="Подробнее" onClick={() => {}} variant="greenButton" />
    </div>
  )
}
