import { beforeEach, describe, expect, it } from 'bun:test'
import { FakeHashProvider } from '../../../test/fakes'
import { InMemoryUserRepository } from '../../../test/in-memory-user.repository'
import { UserNotFoundError } from '../errors/user-not-found.error'
import { RegisterUseCase } from './register.use-case'
import { UpdateProfileUseCase } from './update-profile.use-case'

describe('UpdateProfileUseCase', () => {
  let users: InMemoryUserRepository
  let updateProfile: UpdateProfileUseCase

  beforeEach(() => {
    users = new InMemoryUserRepository()
    updateProfile = new UpdateProfileUseCase(users)
  })

  it('deve atualizar o nome e a bio do usuário', async () => {
    const registered = await new RegisterUseCase(
      users,
      new FakeHashProvider(),
    ).execute({
      email: 'joao@uni.edu',
      password: 'senha123',
      displayName: 'João',
    })

    const result = await updateProfile.execute({
      userId: registered.userId,
      displayName: 'João Silva',
      bio: 'Estudante de SD',
    })

    expect(result.displayName).toBe('João Silva')
    expect(result.bio).toBe('Estudante de SD')
  })

  it('deve lançar erro quando o usuário não existe', async () => {
    await expect(
      updateProfile.execute({ userId: 'inexistente', displayName: 'X' }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
