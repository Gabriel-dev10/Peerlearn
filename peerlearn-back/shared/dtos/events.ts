import { randomUUID } from 'node:crypto'
import {
  EVENT_ROUTING_KEYS,
  type IDomainEvent,
} from '../interfaces/domain-event.interface'

abstract class BaseEvent<T> implements IDomainEvent<T> {
  readonly eventId: string = randomUUID()
  readonly occurredAt: string = new Date().toISOString()
  abstract readonly name: string
  constructor(readonly payload: T) {}
}

export interface LessonPublishedPayload {
  lessonId: string
  authorId: string
  title: string
  trackId: string | null
}

export class LessonPublishedEvent extends BaseEvent<LessonPublishedPayload> {
  readonly name = EVENT_ROUTING_KEYS.LESSON_PUBLISHED
}

export interface XpAwardedPayload {
  userId: string
  amount: number
  reason: string
}

export class XpAwardedEvent extends BaseEvent<XpAwardedPayload> {
  readonly name = EVENT_ROUTING_KEYS.XP_AWARDED
}

export interface UserRegisteredPayload {
  userId: string
  email: string
  displayName: string
}

export class UserRegisteredEvent extends BaseEvent<UserRegisteredPayload> {
  readonly name = EVENT_ROUTING_KEYS.USER_REGISTERED
}
