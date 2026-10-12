import * as yup from 'yup'

export const aboutFormSchema = yup.object({
  avatar: yup
    .mixed<File>()
    .required('Загрузите аватар')
    .test('file-size', 'Максимальный размер файла — 2 МБ', (file) => {
      return file instanceof File && file.size <= 2 * 1024 * 1024
    })
    .test('file-type', 'Допустимые форматы: JPEG, PNG', (file) => {
      return file instanceof File && ['image/jpeg', 'image/png'].includes(file.type)
    }),

  name: yup.string().trim().required('Введите имя'),

  birthDate: yup
    .date()
    .nullable()
    .required('Укажите дату рождения')
    .typeError('Укажите корректную дату'),

  gender: yup.string().required('Выберите пол'),
  city: yup.string().required('Выберите город'),
  skill: yup.string().required('Выберите категорию'),
  subskill: yup.string().required('Выберите подкатегорию'),
})
