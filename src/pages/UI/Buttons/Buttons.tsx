import styles from './Buttons.module.css';

type ButtonsProps = {
  text: string;
  onClick: () => void;
  variant: 'whiteButton' | 'greenButton';
  size: 'small' | 'medium' | 'large'


}

export function Buttons({ text, onClick, variant, size }: ButtonsProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
