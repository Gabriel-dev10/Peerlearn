import { describe, expect, it } from 'bun:test'
import { UnknownXpActionError } from '../errors/unknown-xp-action.error'
import { XpStrategyResolver } from './xp-strategy.resolver'

describe('XP strategies', () => {
  const resolver = new XpStrategyResolver()

  it('deve conceder 50 XP por publicar uma aula', () => {
    const strategy = resolver.resolve('publish_lesson')
    expect(strategy.calculate({ userId: 'u1', action: 'publish_lesson' })).toBe(
      50,
    )
  })

  it('deve conceder 20 XP por receber validação', () => {
    const strategy = resolver.resolve('receive_validation')
    expect(
      strategy.calculate({ userId: 'u1', action: 'receive_validation' }),
    ).toBe(20)
  })

  it('deve conceder 10 XP por deixar um comentário', () => {
    const strategy = resolver.resolve('leave_comment')
    expect(strategy.calculate({ userId: 'u1', action: 'leave_comment' })).toBe(
      10,
    )
  })

  it('deve lançar erro para ação desconhecida', () => {
    expect(() => resolver.resolve('voar' as 'leave_comment')).toThrow(
      UnknownXpActionError,
    )
  })
})
