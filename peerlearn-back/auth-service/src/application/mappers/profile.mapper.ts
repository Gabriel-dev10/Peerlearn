import type { User } from '../../domain/entities/user.entity'
import type { UserRole } from '../../domain/entities/user.entity'

export interface ProfileOutput {
  id: string
  email: string
  role: UserRole
  displayName: string
  bio: string | null
}

export function toProfileOutput(user: User): ProfileOutput {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    displayName: user.displayName,
    bio: user.bio,
  }
}
