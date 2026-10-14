import * as yup from 'yup'

export const schema = yup.object({
  email: yup
    .string()
    .required('Email обязателен')
    .email('Некорректный email'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен содержать 6 или более символов')
    .matches(/[A-ZА-Я]/, 'Добавьте хотя бы одну заглавную букву')
    .matches(/[^A-Za-zА-Яа-я0-9]/, 'Добавьте хотя бы один спецсимвол'),
})

export type Values = yup.InferType<typeof schema>
