export const SUBSCRIBER_PROVIDER = Symbol('SUBSCRIBER_PROVIDER')

export interface ISubscriberProvider {
  getSubscribers(trailId: string | null): Promise<string[]>
}
