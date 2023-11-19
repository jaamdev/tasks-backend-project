import z from 'zod'

const userLoginZodSchema = z.object({
  email: z.string({
    required_error: 'Se requiere un correo electrónico',
    invalid_type_error: 'El correo electrónico debe ser de tipo cadena'
  }).email({
    message: 'Debe ser una dirección de correo electrónico válida'
  }).min(2, {
    message: 'El correo electrónico debe contener más de 2 caracteres'
  }).max(255, {
    message: 'El correo electrónico es demasiado grande'
  }).trim().toLowerCase(),
  password: z.string({
    required_error: 'Se requiere una contraseña',
    invalid_type_error: 'El correo electrónico debe ser de tipo cadena'
  }).min(4, {
    message: 'La contraseña debe contener un mínimo de 4 caracteres'
  }).max(255, {
    message: 'La contraseña es demasiado larga'
  }).trim()
})

export function validateUserLogin (input) {
  return userLoginZodSchema.safeParse(input)
}

export function validatePartialUserLogin (input) {
  return userLoginZodSchema.partial().safeParse(input)
}
