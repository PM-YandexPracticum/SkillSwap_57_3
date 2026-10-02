import styles from './Banner.module.css'
import { BannerProps, BannerType } from './types'

const BANNER_CONTENT: Record<BannerType, { img: string; title: string; desc: string }> = {
  welcome: {
    img: './src/assets/Banners/light-bulb.svg',
    title: 'Добро пожаловать в SkillSwap!',
    desc: 'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми',
  },
  about: {
    img: './src/assets/Banners/user-info.svg',
    title: 'Расскажите немного о себе',
    desc: 'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена',
  },
  share: {
    img: './src/assets/Banners/school-board.svg',
    title: 'Укажите, чем вы готовы поделиться',
    desc: 'Так другие люди смогут увидеть ваши предложения и предложить вам обмен!',
  },
}

export function Banner({ type }: BannerProps) {
  const { img, title, desc } = BANNER_CONTENT[type]
  return (
    <section className={styles.banner}>
      <img src={img} alt="Иконочка" />
      <h2>{title}</h2>
      <p>{desc}</p>
    </section>
  )
}
