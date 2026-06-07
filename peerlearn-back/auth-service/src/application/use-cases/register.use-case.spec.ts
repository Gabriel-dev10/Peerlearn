import { beforeEach, describe, expect, it } from 'bun:test'
import { FakeHashProvider } from '../../../test/fakes'
import { InMemoryUserRepository } from '../../../test/in-memory-user.repository'
import { UserRole } from '../../domain/entities/user.entity'
import { EmailAlreadyInUseError } from '../errors/email-already-in-use.error'
import { RegisterUseCase } from './register.use-case'

describe('RegisterUseCase', () => {
  let users: InMemoryUserRepository
  let hasher: FakeHashProvider
  let useCase: RegisterUseCase

  beforeEach(() => {
    users = new InMemoryUserRepository()
    hasher = new FakeHashProvider()
    useCase = new RegisterUseCase(users, hasher)
  })

  it('deve registrar um novo usuário com papel student e senha com hash', async () => {
    const result = await useCase.execute({
      email: 'novo@uni.edu',
      password: 'senha123',
      displayName: 'Novo Aluno',
    })

    expect(result.userId).toBeDefined()
    expect(result.email).toBe('novo@uni.edu')
    expect(result.role).toBe(UserRole.STUDENT)
    expect(result.displayName).toBe('Novo Aluno')

    const saved = await users.findByEmail('novo@uni.edu')
    expect(saved?.passwordHash).toBe('hashed:senha123')
  })

  it('deve lançar erro quando o email já está em uso', async () => {
    await useCase.execute({
      email: 'dup@uni.edu',
      password: 'senha123',
      displayName: 'Aluno',
    })

    await expect(
      useCase.execute({
        email: 'dup@uni.edu',
        password: 'outra123',
        displayName: 'Outro',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyInUseError)
  })
})
