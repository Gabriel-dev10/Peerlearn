import { InvalidTrailError } from '../errors/invalid-trail.error'

interface TrailProps {
  id: string
  title: string
  description: string
  ownerId: string
  createdAt: Date
}

interface CreateTrailProps {
  id: string
  title: string
  description: string
  ownerId: string
  createdAt?: Date
}

export class Trail {
  private constructor(private readonly props: TrailProps) {}

  static create(props: CreateTrailProps): Trail {
    const title = props.title.trim()
    if (title.length < 3) {
      throw new InvalidTrailError(
        'título da trilha deve ter ao menos 3 caracteres',
      )
    }

    return new Trail({
      id: props.id,
      title,
      description: props.description.trim(),
      ownerId: props.ownerId,
      createdAt: props.createdAt ?? new Date(),
    })
  }

  get id(): string {
    return this.props.id
  }

  get title(): string {
    return this.props.title
  }

  get description(): string {
    return this.props.description
  }

  get ownerId(): string {
    return this.props.ownerId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }
}
