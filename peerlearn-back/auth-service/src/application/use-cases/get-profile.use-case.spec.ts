import { beforeEach, describe, expect, it } from 'bun:test'
import { FakeHashProvider } from '../../../test/fakes'
import { InMemoryUserRepository } from '../../../test/in-memory-user.repository'
import { UserNotFoundError } from '../errors/user-not-found.error'
import { GetProfileUseCase } from './get-profile.use-case'
import { RegisterUseCase } from './register.use-case'

describe('GetProfileUseCase', () => {
  let users: InMemoryUserRepository
  let getProfile: GetProfileUseCase

  beforeEach(() => {
    users = new InMemoryUserRepository()
    getProfile = new GetProfileUseCase(users)
  })

  it('deve retornar o perfil de um usuário existente', async () => {
    const registered = await new RegisterUseCase(
      users,
      new FakeHashProvider(),
    ).execute({
      email: 'joao@uni.edu',
      password: 'senha123',
      displayName: 'João',
    })

    const profile = await getProfile.execute(registered.userId)

    expect(profile.email).toBe('joao@uni.edu')
    expect(profile.displayName).toBe('João')
  })

  it('deve lançar erro quando o usuário não existe', async () => {
    await expect(getProfile.execute('inexistente')).rejects.toBeInstanceOf(
      UserNotFoundError,
    )
  })
})
