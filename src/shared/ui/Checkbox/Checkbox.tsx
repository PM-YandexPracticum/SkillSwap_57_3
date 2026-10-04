import styles from './Checkbox.module.css'
import { CheckboxProps } from './types'

export const Checkbox = ({ checked, variant, onChange, labelName, name }: CheckboxProps) => {
  return (
    <label className={styles.label}>
      <input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.visuallyHidden}
      />
      <span className={styles.checkbox} data-variant={variant}></span>
      {labelName}
    </label>
  )
}
