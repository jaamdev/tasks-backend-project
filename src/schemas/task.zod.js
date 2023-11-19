import z from 'zod'

const taskZodSchema = z.object({
  title: z.string({
    required_error: 'El título es obligatorio',
    invalid_type_error: 'El título tiene que ser de tipo cadena'
  }).min(3, {
    message: 'El título debe contener un mínimo de 3 caracteres'
  }).max(50, {
    message: 'El título debe tener como máximo 50 caracteres'
  }).trim(),
  desc: z.string({
    required_error: 'La descripción es obligatoria',
    invalid_type_error: 'La descripción tiene que ser de tipo cadena'
  }).min(1, {
    message: 'La descripción es demasiado corta'
  }).max(150, {
    message: 'La descripción es demasiado larga'
  }),
  done: z.boolean({
    invalid_type_error: 'El "Hecho" debería ser de tipo booleano'
  }).optional(),
  date: z.string({
    invalid_type_error: 'La fecha debería ser de tipo fecha'
  }).optional(),
  time: z.string({
    invalid_type_error: 'La hora debería ser de tipo cadena'
  }).optional()
})

export function validateTask (input) {
  const { date, time } = input
  if ((!date && time) || (!time && date)) {
    return {
      success: false,
      error: {
        issues: [{ message: 'Se debe proporcionar una fecha y hora juntos' }]
      }
    }
  }
  return taskZodSchema.safeParse(input)
}

export function validatePartialTask (input) {
  return taskZodSchema.partial().safeParse(input)
}
