export const REPUTATION_GATEWAY = Symbol('REPUTATION_GATEWAY')

export interface IReputationGateway {
  awardLessonPublished(authorId: string): Promise<void>
}
