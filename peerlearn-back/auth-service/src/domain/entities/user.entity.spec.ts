import { describe, expect, it } from 'bun:test'
import { InvalidEmailError } from '../errors/invalid-email.error'
import { InvalidProfileError } from '../errors/invalid-profile.error'
import { User, UserRole } from './user.entity'

describe('User entity', () => {
  it('deve criar um usuário válido com papel padrão student', () => {
    const user = User.create({
      id: 'id-1',
      email: 'Maria@Uni.edu',
      passwordHash: 'hash',
      displayName: 'Maria',
    })

    expect(user.role).toBe(UserRole.STUDENT)
    expect(user.email).toBe('maria@uni.edu')
    expect(user.displayName).toBe('Maria')
  })

  it('deve lançar InvalidEmailError quando o email é inválido', () => {
    expect(() =>
      User.create({
        id: 'id-2',
        email: 'sem-arroba',
        passwordHash: 'hash',
        displayName: 'Maria',
      }),
    ).toThrow(InvalidEmailError)
  })

  it('deve lançar InvalidProfileError quando o displayName é curto', () => {
    expect(() =>
      User.create({
        id: 'id-3',
        email: 'ok@uni.edu',
        passwordHash: 'hash',
        displayName: 'M',
      }),
    ).toThrow(InvalidProfileError)
  })

  it('deve atualizar o perfil', () => {
    const user = User.create({
      id: 'id-4',
      email: 'ok@uni.edu',
      passwordHash: 'hash',
      displayName: 'Maria',
    })

    user.updateProfile({ displayName: 'Maria Silva', bio: 'Olá' })

    expect(user.displayName).toBe('Maria Silva')
    expect(user.bio).toBe('Olá')
  })
})
