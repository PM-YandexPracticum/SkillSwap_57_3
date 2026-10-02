import { UserCard } from '@widgets/UserCard/index'
import styles from './styles.module.css'
import { ButtonsWithIcon } from '@ui/ButtonsWithIcon'

export default function CatalogPage() {
  return (
    <main className={styles.container}>
      <aside style={{ width: '324px', flexShrink: 0 }}>123</aside>
      <div className={styles.categories}>
        <section className={styles.spotlight}>
          <div className={styles.section_header}>
            <h2>Популярное</h2>
            <ButtonsWithIcon
              gap="gapSmall"
              iconSrc="./src/assets/ButtonSvg/chevron-right.svg"
              onClick={() => {}}
              text="Смотреть все"
              size="small"
              position="right"
            />
          </div>
          <div className={styles.user_cards}>
            <UserCard />
            <UserCard />
            <UserCard />
          </div>
        </section>
        <section className={styles.spotlight}>
          <div className={styles.section_header}>
            <h2>Новое</h2>
            <ButtonsWithIcon
              gap="gapSmall"
              iconSrc="./src/assets/ButtonSvg/chevron-right.svg"
              onClick={() => {}}
              text="Смотреть все"
              size="small"
              position="right"
            />
          </div>
          <div className={styles.user_cards}>
            <UserCard />
            <UserCard />
            <UserCard />
          </div>
        </section>
        <section className={styles.spotlight}>
          <div className={styles.section_header}>
            <h2>Рекомендуем</h2>
          </div>
          <div className={styles.user_cards}>
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
          </div>
        </section>
      </div>
    </main>
  )
}
