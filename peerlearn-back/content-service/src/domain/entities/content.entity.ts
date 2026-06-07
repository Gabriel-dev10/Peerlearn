export type ContentType = 'video' | 'text' | 'quiz'

export interface ContentProps {
  id: string
  title: string
  body: string
  authorId: string
  trailId: string | null
  createdAt: Date
}

export abstract class Content {
  abstract readonly type: ContentType

  constructor(protected readonly props: ContentProps) {}

  get id(): string {
    return this.props.id
  }

  get title(): string {
    return this.props.title
  }

  get body(): string {
    return this.props.body
  }

  get authorId(): string {
    return this.props.authorId
  }

  get trailId(): string | null {
    return this.props.trailId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }
}

export class VideoContent extends Content {
  readonly type = 'video' as const
}

export class TextContent extends Content {
  readonly type = 'text' as const
}

export class QuizContent extends Content {
  readonly type = 'quiz' as const
}
