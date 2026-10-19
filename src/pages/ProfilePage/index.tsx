import { UserMenu } from '@/widgets/UserMenu';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <UserMenu />
      </aside>
      <div className={styles.content}>
        <h1>ProfilePage</h1>
        <p>Личные данные</p>
      </div>
    </main>
  );
}
