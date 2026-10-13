import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().required('Email обязателен').email('Некорректный email'),
  password: yup.string().required('Пароль обязателен').length(8),
})

export type Values = yup.InferType<typeof schema>
