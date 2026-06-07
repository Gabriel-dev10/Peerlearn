export const EVENT_PUBLISHER = Symbol('EVENT_PUBLISHER')

export interface IEventPublisher {
  publish(routingKey: string, payload: unknown): Promise<void>
}
