import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import type { IEventPublisher } from '../../application/ports/event-publisher'

@Injectable()
export class EventEmitterPublisher implements IEventPublisher {
  constructor(private readonly emitter: EventEmitter2) {}

  async publish(routingKey: string, payload: unknown): Promise<void> {
    this.emitter.emit(routingKey, payload)
  }
}
