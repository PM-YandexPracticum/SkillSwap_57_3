import { Children, useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel'
import { CarouselProps } from './types'
import styles from './Carousel.module.css'
import navigationButton from '@assets/icon/NavigationButton.svg'

export const Carousel = ({ children }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  // хранит индекс, выбранного фото
  const [selectedItem, setSelectedItem] = useState(0)

  const items = Children.toArray(children)

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  // получает индекс для элементов маленьких превью по их месту
  const getPreviewIndex = (spot: number): number => {
    return (selectedItem + spot) % items.length
  }
  // количество фотографий для превью
  const previewCount = Math.min(items.length - 1, 3)
  // количество не показанныx фотографий
  const hiddenCount = Math.max(0, items.length - 4)

  const handleSelect = (emblaApi: EmblaCarouselType) => {
    setSelectedItem(emblaApi.selectedScrollSnap())
  }

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', handleSelect)

    return () => {
      emblaApi.off('select', handleSelect)
    }
  }, [emblaApi])

  return (
    <div className={styles.carousel}>
      <div
        className={`${styles.viewport} ${items.length === 1 ? styles.singleViewport : ''}`}
        ref={emblaRef}
      >
        <div className={styles.container}>
          {items.map((item, index) => (
            <div
              className={`${styles.slide} ${items.length === 1 ? styles.singleSlide : ''}`}
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {items.length > 1 && (
        <div className={styles.preview}>
          {Array.from({ length: previewCount }, (_, index) => index + 1).map((indexPreview) => {
            const index = getPreviewIndex(indexPreview)
            return (
              <div
                className={styles.previewSlide}
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
              >
                {items[index]}
                {indexPreview === 3 && hiddenCount > 0 && (
                  <div className={styles.overlay}>
                    <div className={styles.countSlide}>+{hiddenCount}</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
      {items.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.button} ${styles.buttonPrev}`}
            onClick={scrollPrev}
            aria-label="Предыдущее"
          >
            <img src={navigationButton} className={`${styles.imgButton} ${styles.prevImg}`} />
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.buttonNext}`}
            onClick={scrollNext}
            aria-label="Следующее"
          >
            <img src={navigationButton} className={styles.imgButton} />
          </button>
        </>
      )}
    </div>
  )
}
