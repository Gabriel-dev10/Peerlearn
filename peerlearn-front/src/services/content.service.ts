import type { ContentType, Lesson, NotificationItem, Trail } from '../types'
import { contentApi } from './http'

export interface PublishLessonPayload {
  type: ContentType
  title: string
  body: string
  authorId: string
  trailId?: string
}

export interface CreateTrailPayload {
  title: string
  description: string
  ownerId: string
}

export const contentService = {
  async listLessons(): Promise<Lesson[]> {
    const { data } = await contentApi.get<Lesson[]>('/lessons')
    return data
  },

  async publishLesson(payload: PublishLessonPayload): Promise<Lesson> {
    const { data } = await contentApi.post<Lesson>('/lessons', payload)
    return data
  },

  async listTrails(): Promise<Trail[]> {
    const { data } = await contentApi.get<Trail[]>('/trails')
    return data
  },

  async createTrail(payload: CreateTrailPayload): Promise<Trail> {
    const { data } = await contentApi.post<Trail>('/trails', payload)
    return data
  },

  async listNotifications(userId: string): Promise<NotificationItem[]> {
    const { data } = await contentApi.get<NotificationItem[]>(
      `/notifications/${userId}`,
    )
    return data
  },
}
