import { InvalidEmailError } from '../errors/invalid-email.error'
import { InvalidProfileError } from '../errors/invalid-profile.error'

export enum UserRole {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin',
}

interface UserProps {
  id: string
  email: string
  passwordHash: string
  role: UserRole
  displayName: string
  bio: string | null
  createdAt: Date
}

interface CreateUserProps {
  id: string
  email: string
  passwordHash: string
  displayName: string
  role?: UserRole
  bio?: string | null
  createdAt?: Date
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export class User {
  private constructor(private props: UserProps) {}

  static create(props: CreateUserProps): User {
    const email = props.email.trim().toLowerCase()
    if (!EMAIL_REGEX.test(email)) {
      throw new InvalidEmailError(props.email)
    }

    const displayName = props.displayName.trim()
    if (displayName.length < 2) {
      throw new InvalidProfileError(
        'displayName deve ter ao menos 2 caracteres',
      )
    }

    return new User({
      id: props.id,
      email,
      passwordHash: props.passwordHash,
      role: props.role ?? UserRole.STUDENT,
      displayName,
      bio: props.bio ?? null,
      createdAt: props.createdAt ?? new Date(),
    })
  }

  updateProfile(data: { displayName?: string; bio?: string | null }): void {
    if (data.displayName !== undefined) {
      const displayName = data.displayName.trim()
      if (displayName.length < 2) {
        throw new InvalidProfileError(
          'displayName deve ter ao menos 2 caracteres',
        )
      }
      this.props.displayName = displayName
    }
    if (data.bio !== undefined) {
      this.props.bio = data.bio
    }
  }

  get id(): string {
    return this.props.id
  }

  get email(): string {
    return this.props.email
  }

  get passwordHash(): string {
    return this.props.passwordHash
  }

  get role(): UserRole {
    return this.props.role
  }

  get displayName(): string {
    return this.props.displayName
  }

  get bio(): string | null {
    return this.props.bio
  }

  get createdAt(): Date {
    return this.props.createdAt
  }
}
