import { beforeEach, describe, expect, it } from 'bun:test'
import { FakeHashProvider, FakeTokenProvider } from '../../../test/fakes'
import { InMemoryUserRepository } from '../../../test/in-memory-user.repository'
import { UserRole } from '../../domain/entities/user.entity'
import { InvalidCredentialsError } from '../errors/invalid-credentials.error'
import { LoginUseCase } from './login.use-case'
import { RegisterUseCase } from './register.use-case'

describe('LoginUseCase', () => {
  let users: InMemoryUserRepository
  let hasher: FakeHashProvider
  let tokens: FakeTokenProvider
  let login: LoginUseCase

  beforeEach(async () => {
    users = new InMemoryUserRepository()
    hasher = new FakeHashProvider()
    tokens = new FakeTokenProvider()
    login = new LoginUseCase(users, hasher, tokens)

    await new RegisterUseCase(users, hasher).execute({
      email: 'joao@uni.edu',
      password: 'senha123',
      displayName: 'João',
    })
  })

  it('deve retornar token JWT quando as credenciais são válidas', async () => {
    const result = await login.execute({
      email: 'joao@uni.edu',
      password: 'senha123',
    })

    expect(result.token).toBeDefined()
    expect(result.role).toBe(UserRole.STUDENT)
  })

  it('deve lançar erro quando a senha está incorreta', async () => {
    await expect(
      login.execute({ email: 'joao@uni.edu', password: 'errada' }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('deve lançar erro quando o usuário não existe', async () => {
    await expect(
      login.execute({ email: 'fantasma@uni.edu', password: 'senha123' }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
