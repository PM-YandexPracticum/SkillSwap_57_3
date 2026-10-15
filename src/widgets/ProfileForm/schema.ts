
import * as yup from 'yup'

export const schema = yup.object({
  email: yup
    .string()
    .required('Email обязателен')
    .email('Некорректный email'),

  name: yup
    .string()
    .trim()
    .required('Введите имя'),

  birthDate: yup
    .date()
    .nullable()
    .required('Укажите дату рождения')
    .typeError('Укажите корректную дату'),

  gender: yup
    .string()
    .required('Выберите пол'),

  city: yup
    .string()
    .required('Выберите город'),

  about: yup
    .string()
    .default(''),

  password: yup
    .string()
    .optional(),
})

export type Values = yup.InferType<typeof schema>
