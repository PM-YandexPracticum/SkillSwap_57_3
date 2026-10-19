import * as yup from 'yup'

export const schema = yup.object({
  canTeachSkillName: yup.string().trim().required('Введите имя'),
  canTeachSkill: yup.string().required('Выберите категорию'),
  canTeachSubskill: yup.string().required('Выберите подкатегорию'),
  canTeachDescription: yup.string().trim().required('Опишите, чему можете научить'),
  skillFile: yup
    .array()
    .required('Загрузите изображения навыка')
    .test('not-empty', 'Загрузите 4 изображения', (files) => {
      return Array.isArray(files) && files.length === 4
    })
    .test('valid-files', 'Все файлы должны быть JPEG или PNG до 2 МБ', (files) => {
      if (!Array.isArray(files)) return false
      return files.every(
        (file) =>
          file instanceof File &&
          file.size <= 2 * 1024 * 1024 &&
          ['image/jpeg', 'image/png'].includes(file.type),
      )
    }),
})

export type Values = yup.InferType<typeof schema>
