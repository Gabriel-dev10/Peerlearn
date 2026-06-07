import assert from 'node:assert'
import { Given, Then, When } from '@cucumber/cucumber'
import { EmailAlreadyInUseError } from '../../src/application/errors/email-already-in-use.error'
import {
  type RegisterOutput,
  RegisterUseCase,
} from '../../src/application/use-cases/register.use-case'
import { FakeHashProvider } from '../../test/fakes'
import { InMemoryUserRepository } from '../../test/in-memory-user.repository'

let users: InMemoryUserRepository
let registerUseCase: RegisterUseCase
let pendingEmail: string
let result: RegisterOutput
let caughtError: Error | null

function setup(): void {
  users = new InMemoryUserRepository()
  registerUseCase = new RegisterUseCase(users, new FakeHashProvider())
  caughtError = null
}

Given('que sou um novo usuário com o email {string}', (email: string) => {
  setup()
  pendingEmail = email
})

Given(
  'que já existe um usuário com o email {string}',
  async (email: string) => {
    setup()
    await registerUseCase.execute({
      email,
      password: 'senha123',
      displayName: 'Aluno Existente',
    })
  },
)

When('me registro com a senha {string}', async (password: string) => {
  result = await registerUseCase.execute({
    email: pendingEmail,
    password,
    displayName: 'Novo Aluno',
  })
})

When(
  'tento me registrar novamente com o email {string}',
  async (email: string) => {
    try {
      await registerUseCase.execute({
        email,
        password: 'outra123',
        displayName: 'Outro Aluno',
      })
    } catch (error) {
      caughtError = error as Error
    }
  },
)

Then('minha conta é criada com o papel {string}', (role: string) => {
  assert.strictEqual(result.role, role)
})

Then('recebo um erro informando que o email já está em uso', () => {
  assert.ok(caughtError instanceof EmailAlreadyInUseError)
})
