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
        labelName="Описание"
        onChange={setDescription}
      />
    </main>
  );
}