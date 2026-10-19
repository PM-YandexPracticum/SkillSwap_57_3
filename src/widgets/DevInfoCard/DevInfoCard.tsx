import githubIcon from '@assets/icon/GitHub.svg';
import type { DevInfoCardProps } from './types';
import styles from './devInfoCard.module.css';

export function DevInfoCard({
  avatarUrl,
  name,
  role,
  about,
  githubUrl,
}: DevInfoCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <img className={styles.avatar} src={avatarUrl} alt={name} />
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.role}>Роль в проекте: {role}</p>
        </div>
      </div>
      <div className={styles.section}>
        <p className={styles.label}>Обо мне:</p>
        <p className={styles.text}>{about}</p>
      </div>
      <div className={styles.section}>
        <p className={styles.label}>Связаться со мной:</p>
        <a
          className={styles.link}
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={styles.githubIcon} src={githubIcon} alt="GitHub" />
          <span>{githubUrl.replace('https://', '')}</span>
        </a>
      </div>
    </article>
  );
}