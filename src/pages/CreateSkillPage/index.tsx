import { useState } from 'react';
import { TextArea } from '@/shared/ui/TextArea';

// TODO: реализовать страницу CreateSkillPage

export default function CreateSkillPage() {
  const [description, setDescription] = useState('');

  return (
    <main>
      <h1>CreateSkillPage</h1>
      <p>Страница в разработке</p>

      <TextArea
        id="description"
        name="description"
        label="Описание"
        placeholder="Коротко опишите, чему можете научить"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={500}
      />
    </main>
  )
}