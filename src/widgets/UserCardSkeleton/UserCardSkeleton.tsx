
import style from './UserCardSkeleton.module.css'

export const UserCardSkeleton = () => {
  return (
    <div className={style.card} aria-hidden="true">
      <div className={style.header}>
        <div className={`${style.skeleton} ${style.avatar}`} />

        <div className={style.userInfo}>
          <div className={`${style.skeleton} ${style.name}`} />
          <div className={`${style.skeleton} ${style.location}`} />
        </div>

        <div className={`${style.skeleton} ${style.like}`} />
      </div>

      <div className={style.skills}>
        <h4 className={style.skillsTitle}>Может научить:</h4>

        <div className={style.skillsList}>
          <div
            className={`${style.skeleton} ${style.skill} ${style.skillLong}`}
          />
        </div>
      </div>

      <div className={`${style.skills} ${style.lastSkills}`}>
        <h4 className={style.skillsTitle}>Хочет научиться:</h4>

        <div className={style.skillsList}>
          <div className={`${style.skeleton} ${style.skill} ${style.skillShort}`} />
          <div className={`${style.skeleton} ${style.skill} ${style.skillLong}`} />
        </div>
      </div>

      <div className={`${style.skeleton} ${style.button}`} />
    </div>
  )
}
