import {
  Content,
  type ContentType,
  QuizContent,
  TextContent,
  VideoContent,
} from '../entities/content.entity'
import { InvalidContentError } from '../errors/invalid-content.error'

export interface CreateContentData {
  id: string
  title: string
  body: string
  authorId: string
  trailId?: string | null
  createdAt?: Date
}

type ContentConstructor = new (props: {
  id: string
  title: string
  body: string
  authorId: string
  trailId: string | null
  createdAt: Date
}) => Content

const CONTENT_TYPES: Record<ContentType, ContentConstructor> = {
  video: VideoContent,
  text: TextContent,
  quiz: QuizContent,
}

export class ContentFactory {
  static create(type: ContentType, data: CreateContentData): Content {
    const ContentClass = CONTENT_TYPES[type]
    if (!ContentClass) {
      throw new InvalidContentError(`Tipo de conteúdo inválido: ${type}`)
    }

    const title = data.title.trim()
    if (title.length < 3) {
      throw new InvalidContentError('título deve ter ao menos 3 caracteres')
    }

    return new ContentClass({
      id: data.id,
      title,
      body: data.body,
      authorId: data.authorId,
      trailId: data.trailId ?? null,
      createdAt: data.createdAt ?? new Date(),
    })
  }
}
