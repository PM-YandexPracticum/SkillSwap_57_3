import styles from './Auth-Buttons.module.css';

type AuthButtonsProps = {
  text: string;
  onClick: () => void;
  variant: 'loginButton' | 'registerButton';
}

export function AuthButtons({ text, onClick, variant }: AuthButtonsProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
