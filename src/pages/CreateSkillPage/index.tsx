import { useState } from 'react'
import { TextArea } from '@/shared/ui/TextArea'

export default function CreateSkillPage() {
  const [description, setDescription] = useState('')

  return (
    <main>
      <h1>CreateSkillPage</h1>
      <p>Страница в разработке</p>

      <TextArea labelName="Описание" value={description} onChange={setDescription} />
    </main>
  )
}
