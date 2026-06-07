import type { ISubscriberProvider } from '../src/application/ports/subscriber.provider'

export class StubSubscriberProvider implements ISubscriberProvider {
  constructor(private readonly subscribers: string[]) {}

  async getSubscribers(): Promise<string[]> {
    return this.subscribers
  }
}
