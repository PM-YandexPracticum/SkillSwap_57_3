import { forwardRef } from 'react';
import clsx from 'clsx';

import type { TextAreaProps } from './types';

import styles from './TextArea.module.css';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, id, ...props }, ref) => (
    <div className={clsx(styles.wrapper, className)}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        aria-invalid={Boolean(error)}
        className={clsx(styles.textarea, error && styles.error)}
        {...props}
      />
      {error && (
        <span className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  ),
);

TextArea.displayName = 'TextArea';