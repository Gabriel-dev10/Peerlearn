import type { IEventPublisher } from '../src/application/ports/event-publisher'

type Handler = (payload: unknown) => Promise<void> | void

export class InProcessEventBus implements IEventPublisher {
  private readonly handlers = new Map<string, Handler[]>()

  on(routingKey: string, handler: Handler): void {
    const current = this.handlers.get(routingKey) ?? []
    current.push(handler)
    this.handlers.set(routingKey, current)
  }

  async publish(routingKey: string, payload: unknown): Promise<void> {
    const handlers = this.handlers.get(routingKey) ?? []
    for (const handler of handlers) {
      await handler(payload)
    }
  }
}
