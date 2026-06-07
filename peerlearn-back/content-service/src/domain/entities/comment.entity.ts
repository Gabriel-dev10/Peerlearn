import { InvalidCommentError } from '../errors/invalid-comment.error'

interface CommentProps {
  id: string
  lessonId: string
  authorId: string
  text: string
  createdAt: Date
}

interface CreateCommentProps {
  id: string
  lessonId: string
  authorId: string
  text: string
  createdAt?: Date
}

export class Comment {
  private constructor(private readonly props: CommentProps) {}

  static create(props: CreateCommentProps): Comment {
    const text = props.text.trim()
    if (text.length === 0) {
      throw new InvalidCommentError('comentário não pode ser vazio')
    }

    return new Comment({
      id: props.id,
      lessonId: props.lessonId,
      authorId: props.authorId,
      text,
      createdAt: props.createdAt ?? new Date(),
    })
  }

  get id(): string {
    return this.props.id
  }

  get lessonId(): string {
    return this.props.lessonId
  }

  get authorId(): string {
    return this.props.authorId
  }

  get text(): string {
    return this.props.text
  }

  get createdAt(): Date {
    return this.props.createdAt
  }
}
