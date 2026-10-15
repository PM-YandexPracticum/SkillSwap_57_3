import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().required('Email обязателен').email('Некорректный email'),
  password: yup.string().required('Пароль обязателен'),
})

export const registrationSchema = schema.shape({
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен содержать не менее 6 символов')
    .matches(
      /^[A-Za-z0-9!@#$%^&*()_+=?-]+$/,
      'Используйте строчные и заглавные буквы латинского алфавита, цифры и спецсимволы',
    )
    .matches(/[a-z]/, 'Добавьте строчную букву')
    .matches(/[A-Z]/, 'Добавьте заглавную букву')
    .matches(/[0-9]/, 'Добавьте цифру')
    .matches(/[!@#$%^&*()_+=?-]/, 'Добавьте спецсимвол'),
})

export type Values = yup.InferType<typeof schema>
