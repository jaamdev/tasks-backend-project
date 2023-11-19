import { hash, compare } from 'bcrypt'

export async function hashPassword (input) {
  const result = await hash(input, 12)
  return result
}

export async function comparePassword (inputOne, inputTwo) {
  const result = await compare(inputOne, inputTwo)
  return result
}
