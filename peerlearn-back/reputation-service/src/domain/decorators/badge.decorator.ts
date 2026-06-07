export interface UserProfile {
  getDisplayName(): string
}

export interface Badge {
  icon: string
  name: string
}

export class BaseUserProfile implements UserProfile {
  constructor(private readonly displayName: string) {}

  getDisplayName(): string {
    return this.displayName
  }
}

export class BadgeDecorator implements UserProfile {
  constructor(
    private readonly base: UserProfile,
    private readonly badge: Badge,
  ) {}

  getDisplayName(): string {
    return `${this.badge.icon} ${this.base.getDisplayName()}`
  }
}
