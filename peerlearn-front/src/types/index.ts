export interface AuthUser {
  userId: string
  email: string
  role: string
  displayName: string
}

export interface AuthToken {
  token: string
  userId: string
  role: string
}

export interface Profile {
  id: string
  email: string
  role: string
  displayName: string
  bio: string | null
}

export type ContentType = 'video' | 'text' | 'quiz'

export interface Lesson {
  id: string
  type: ContentType
  title: string
  body: string
  authorId: string
  trailId: string | null
  createdAt: string
}

export interface Trail {
  id: string
  title: string
  description: string
  ownerId: string
  createdAt: string
}

export interface NotificationItem {
  id: string
  userId: string
  message: string
  read: boolean
  createdAt: string
}

export interface Badge {
  icon: string
  name: string
}

export interface Reputation {
  userId: string
  xp: number
  displayName: string
  badges: Badge[]
}

export interface RankingEntry {
  userId: string
  xp: number
}
