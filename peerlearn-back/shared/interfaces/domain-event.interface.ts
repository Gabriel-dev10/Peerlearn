/**
 * Contrato base de todo evento de domínio publicado no RabbitMQ.
 * Garante rastreabilidade (id + timestamp) e roteamento (name) entre serviços.
 */
export interface IDomainEvent<TPayload = unknown> {
  readonly eventId: string
  readonly name: string
  readonly occurredAt: string
  readonly payload: TPayload
}

/**
 * Routing keys usadas na troca de mensagens entre os serviços.
 * Centralizadas aqui para evitar strings mágicas duplicadas.
 */
export const EVENT_ROUTING_KEYS = {
  LESSON_PUBLISHED: 'lesson.published',
  XP_AWARDED: 'xp.awarded',
  USER_REGISTERED: 'user.registered',
  BADGE_UNLOCKED: 'badge.unlocked',
} as const

export type EventRoutingKey =
  (typeof EVENT_ROUTING_KEYS)[keyof typeof EVENT_ROUTING_KEYS]
