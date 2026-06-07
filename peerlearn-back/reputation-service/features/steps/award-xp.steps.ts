import assert from 'node:assert'
import { Given, Then, When } from '@cucumber/cucumber'
import {
  type AwardXpOutput,
  AwardXpUseCase,
} from '../../src/application/use-cases/award-xp.use-case'
import { XpStrategyResolver } from '../../src/domain/strategies/xp-strategy.resolver'
import { InMemoryScoreRepository } from '../../test/in-memory-score.repository'

let scores: InMemoryScoreRepository
let useCase: AwardXpUseCase
let studentId: string
let lastResult: AwardXpOutput

function setup(): void {
  scores = new InMemoryScoreRepository()
  useCase = new AwardXpUseCase(new XpStrategyResolver(), scores)
}

Given('que o aluno {string} não possui XP', (userId: string) => {
  setup()
  studentId = userId
})

Given(
  'que o aluno {string} já possui 50 de XP por uma aula publicada',
  async (userId: string) => {
    setup()
    studentId = userId
    await useCase.execute({ userId, action: 'publish_lesson' })
  },
)

When('ele publica uma micro-aula', async () => {
  lastResult = await useCase.execute({
    userId: studentId,
    action: 'publish_lesson',
  })
})

When('ele deixa um comentário', async () => {
  lastResult = await useCase.execute({
    userId: studentId,
    action: 'leave_comment',
  })
})

Then('ele recebe 50 pontos de XP', () => {
  assert.strictEqual(lastResult.awarded, 50)
})

Then('seu total de XP passa a ser {int}', (total: number) => {
  assert.strictEqual(lastResult.total, total)
})
