import { UnknownXpActionError } from '../errors/unknown-xp-action.error'
import {
  LeaveCommentStrategy,
  PublishLessonStrategy,
  ReceiveValidationStrategy,
  type XpAction,
  type XpStrategy,
} from './xp.strategy'

export class XpStrategyResolver {
  private readonly strategies: Record<XpAction, XpStrategy> = {
    publish_lesson: new PublishLessonStrategy(),
    receive_validation: new ReceiveValidationStrategy(),
    leave_comment: new LeaveCommentStrategy(),
  }

  resolve(action: XpAction): XpStrategy {
    const strategy = this.strategies[action]
    if (!strategy) {
      throw new UnknownXpActionError(action)
    }
    return strategy
  }
}
