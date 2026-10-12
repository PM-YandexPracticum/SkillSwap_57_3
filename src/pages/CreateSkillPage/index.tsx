import { Banner } from '@/widgets/Banner/Banner'
import { ShareForm } from '@/widgets/ShareForm'
import styles from './CreateSkillPage.module.css'

export default function CreateSkillPage() {
  return (
    <main className={styles.conteiner}>
      <ShareForm />
      <Banner type="about"></Banner>
    </main>
  )
}
