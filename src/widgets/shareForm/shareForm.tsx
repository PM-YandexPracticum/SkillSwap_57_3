import { useState } from 'react';
import { TextInput } from '@ui/TextInput';
import { Select } from '@ui/Select';
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
  const [nameError, setNameError] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (nameError) {
      setNameError('');
    }
  };

  const handleNameBlur = () => {
    if (name === '') {
      setNameError('Название обязательно');
    }
  };

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
      <TextInput
        labelName="Название навыка"
        placeholder="Введите название вашего навыка"
        value={name}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        error={nameError}
      />

      <Select
        labelName="Категория навыка"
        placeholder="Выберите категорию навыка"
        options={CATEGORY_OPTIONS}
        value={category}
        onChange={(value: string) => setCategory(value)}
      />

      <Select
        labelName="Подкатегория навыка"
        placeholder="Выберите подкатегорию навыка"
        options={SUBCATEGORY_OPTIONS}
        value={subcategory}
        onChange={(value: string) => setSubcategory(value)}
      />

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