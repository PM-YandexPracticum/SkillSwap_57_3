import styles from './TextArea.module.css';
import { TextAreaProps } from './types';

export function TextArea({ labelName, value, onChange, error }: TextAreaProps) {
  return (
    <label className={styles.label}>
      {labelName}
      <textarea
        className={error ? `${styles.textarea} ${styles.error}` : styles.textarea}
        placeholder="Коротко опишите, чему можете научить"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </label>
  );
}