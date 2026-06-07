export type XpAction = 'publish_lesson' | 'receive_validation' | 'leave_comment'

export interface XpContext {
  userId: string
  action: XpAction
}

export interface XpStrategy {
  calculate(context: XpContext): number
}

export class PublishLessonStrategy implements XpStrategy {
  calculate(): number {
    return 50
  }
}

export class ReceiveValidationStrategy implements XpStrategy {
  calculate(): number {
    return 20
  }
}

export class LeaveCommentStrategy implements XpStrategy {
  calculate(): number {
    return 10
  }
}
