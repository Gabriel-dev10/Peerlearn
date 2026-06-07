interface NotificationProps {
  id: string
  userId: string
  message: string
  read: boolean
  createdAt: Date
}

interface CreateNotificationProps {
  id: string
  userId: string
  message: string
  read?: boolean
  createdAt?: Date
}

export class Notification {
  private constructor(private readonly props: NotificationProps) {}

  static create(props: CreateNotificationProps): Notification {
    return new Notification({
      id: props.id,
      userId: props.userId,
      message: props.message,
      read: props.read ?? false,
      createdAt: props.createdAt ?? new Date(),
    })
  }

  get id(): string {
    return this.props.id
  }

  get userId(): string {
    return this.props.userId
  }

  get message(): string {
    return this.props.message
  }

  get read(): boolean {
    return this.props.read
  }

  get createdAt(): Date {
    return this.props.createdAt
  }
}
