import * as yup from 'yup'

const passwordSchema = yup
  .string()
  .min(6, 'Пароль должен содержать не менее 6 символов')
  .matches(
    /^[A-Za-z0-9!@#$%^&*()_+=?-]+$/,
    'Используйте латинские буквы, цифры и спецсимволы',
  )
  .matches(/[a-z]/, 'Добавьте строчную букву')
  .matches(/[A-Z]/, 'Добавьте заглавную букву')
  .matches(/[0-9]/, 'Добавьте цифру')
  .matches(/[!@#$%^&*()_+=?-]/, 'Добавьте спецсимвол')

export const schema = yup.object({
  email: yup.string().required('Email обязателен').email('Некорректный email'),
  name: yup.string().trim().required('Введите имя'),
  birthDate: yup
    .date()
    .nullable()
    .required('Укажите дату рождения')
    .typeError('Укажите корректную дату'),
  gender: yup.string().required('Выберите пол'),
  city: yup.string().required('Выберите город'),
  about: yup.string().default(''),
  password: yup.string().when('$changePassword', {
    is: true,
    then: () => passwordSchema.required('Введите новый пароль'),
    otherwise: (field) => field.optional(),
  }),
})

export type Values = yup.InferType<typeof schema>
