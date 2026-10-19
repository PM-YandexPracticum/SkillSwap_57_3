import { useState, useEffect } from 'react'
import styles from './SkillCardCarousel.module.css'
import { UserCard } from '@widgets/UserCard/index'
import { UserCarouselProps } from './types'
import { pluralizeYears } from '@/shared/lib/helpers'
import { API_URL } from '@/shared/config/api'
import arrow from '@assets/ButtonSvg/chevron-right.svg'

export function SkillCardCarousel({ recommendations }: UserCarouselProps) {
  const cardsPerPage = 4
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const totalPages = Math.ceil((recommendations?.length || 0) / cardsPerPage)

  useEffect(() => {
    setCurrentPage(0)
  }, [recommendations])

  if (!recommendations) return <div className={styles.loader}></div>
  if (recommendations.length === 0) return null

  const startIdx = currentPage * cardsPerPage
  const visibleCards = recommendations.slice(startIdx, startIdx + cardsPerPage)

  const goBack = () => {
    setDirection('left')
    setCurrentPage((p) => Math.max(0, p - 1))
  }
  const goForward = () => {
    setDirection('right')
    setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Похожие предложения</h2>

      <div className={styles.carousel}>
        <button
          type="button"
          className={`${styles.button} ${styles.back} ${currentPage === 0 ? styles.disable : ''}`}
          onClick={goBack}
          aria-label="Назад"
        >
          <img src={arrow} className={styles.icon} alt="Стрелка назад" />
        </button>

        <div
          className={`${styles.cards} ${visibleCards.length < 4 ? styles.fewСards : styles.fullCards} ${direction === 'left' ? styles.slideleft : styles.slideRight}`}
          key={currentPage}
        >
          {visibleCards.map((rec, index) => (
            <UserCard
              id={rec.id}
              key={index}
              variant="catalog"
              avatarUrl={`${API_URL}/images/users/${rec.image_path}`}
              name={rec.name}
              location={`${rec.city}, ${pluralizeYears(rec.age)}`}
              canTeach={rec.canTeach}
              wantsToLearn={rec.wantsToLearn}
              isLiked={false}
              onLike={() => {}}
              onDetails={() => {}}
            />
          ))}
        </div>

        <button
          type="button"
          className={`${styles.button} ${styles.forward} ${currentPage >= totalPages - 1 ? styles.disable : ''}`}
          onClick={goForward}
          aria-label="Вперёд"
        >
          <img src={arrow} className={styles.icon} alt="Стрелка вперед" />
        </button>
      </div>
    </section>
  )
}
