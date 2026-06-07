import { describe, expect, it } from 'bun:test'
import { QuizContent, VideoContent } from '../entities/content.entity'
import { InvalidContentError } from '../errors/invalid-content.error'
import { ContentFactory } from './content.factory'

describe('ContentFactory', () => {
  const baseData = {
    id: 'lesson-1',
    title: 'Docker Compose',
    body: 'conteúdo',
    authorId: 'author-1',
  }

  it('deve criar um VideoContent quando o tipo é video', () => {
    const content = ContentFactory.create('video', baseData)
    expect(content).toBeInstanceOf(VideoContent)
    expect(content.type).toBe('video')
  })

  it('deve criar um QuizContent quando o tipo é quiz', () => {
    const content = ContentFactory.create('quiz', baseData)
    expect(content).toBeInstanceOf(QuizContent)
    expect(content.type).toBe('quiz')
  })

  it('deve lançar erro quando o título é muito curto', () => {
    expect(() =>
      ContentFactory.create('text', { ...baseData, title: 'ab' }),
    ).toThrow(InvalidContentError)
  })
})
