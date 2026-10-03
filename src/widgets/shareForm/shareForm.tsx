import { useState } from 'react';
import { TextArea } from '@ui/TextArea';
import { FileInput } from '@ui/FileInput';
import { Buttons } from '@ui/Buttons';
import { SKILL_CATEGORIES } from '@/shared/lib/constants';
import styles from './shareForm.module.css';
import type { ShareFormProps, ShareFormData } from './types';

const CATEGORY_OPTIONS = SKILL_CATEGORIES.map((category) => ({
  value: category,
  label: category,
}));

const SUBCATEGORY_OPTIONS = [
  { value: 'subcategory-1', label: 'Подкатегория 1' },
  { value: 'subcategory-2', label: 'Подкатегория 2' },
  { value: 'subcategory-3', label: 'Подкатегория 3' },
];

export function ShareForm({ onSubmit, onBack }: ShareFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = () => {
    const data: ShareFormData = {
      name,
      category,
      subcategory,
      description,
      images,
    };
    onSubmit?.(data);
  };

  const handleBack = () => {
    onBack?.();
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <label className={styles.label}>
        Название навыка
        <input
          className={styles.input}
          type="text"
          placeholder="Введите название вашего навыка"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className={styles.label}>
        Категория навыка
        <select
          className={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Выберите категорию навыка
          </option>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.label}>
        Подкатегория навыка
        <select
          className={styles.select}
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        >
          <option value="" disabled>
            Выберите подкатегорию навыка
          </option>
          {SUBCATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <TextArea
        labelName="Описание"
        value={description}
        onChange={setDescription}
      />

      <FileInput onChange={setImages} />

      <div className={styles.buttons}>
        <Buttons
          text="Назад"
          variant="whiteButton"
          size="medium"
          onClick={handleBack}
        />
        <Buttons
          text="Продолжить"
          variant="greenButton"
          size="medium"
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
}