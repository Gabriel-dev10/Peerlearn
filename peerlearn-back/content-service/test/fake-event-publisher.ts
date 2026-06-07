import type { IEventPublisher } from '../src/application/ports/event-publisher'

export interface PublishedEvent {
  routingKey: string
  payload: unknown
}

export class FakeEventPublisher implements IEventPublisher {
  public readonly published: PublishedEvent[] = []

  async publish(routingKey: string, payload: unknown): Promise<void> {
    this.published.push({ routingKey, payload })
  }
}
