import { describe, expect, it } from 'bun:test'
import { BadgeDecorator, BaseUserProfile } from './badge.decorator'

describe('BadgeDecorator', () => {
  it('deve prefixar o nome com o ícone do badge', () => {
    const profile = new BaseUserProfile('Maria')
    const decorated = new BadgeDecorator(profile, {
      icon: '🏅',
      name: 'Mentor',
    })

    expect(decorated.getDisplayName()).toBe('🏅 Maria')
  })

  it('deve permitir empilhar múltiplos badges', () => {
    const profile = new BaseUserProfile('Maria')
    const withMentor = new BadgeDecorator(profile, {
      icon: '🏅',
      name: 'Mentor',
    })
    const withTop = new BadgeDecorator(withMentor, {
      icon: '⭐',
      name: 'Top',
    })

    expect(withTop.getDisplayName()).toBe('⭐ 🏅 Maria')
  })
})
