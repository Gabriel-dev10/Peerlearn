import { Module } from '@nestjs/common'
import type { IEventPublisher } from '../application/ports/event-publisher'
import { EVENT_PUBLISHER } from '../application/ports/event-publisher'
import { REPUTATION_GATEWAY } from '../application/ports/reputation.gateway'
import type { ISubscriberProvider } from '../application/ports/subscriber.provider'
import { SUBSCRIBER_PROVIDER } from '../application/ports/subscriber.provider'
import { AddCommentUseCase } from '../application/use-cases/add-comment.use-case'
import { CreateTrailUseCase } from '../application/use-cases/create-trail.use-case'
import { GetLessonUseCase } from '../application/use-cases/get-lesson.use-case'
import { ListCommentsUseCase } from '../application/use-cases/list-comments.use-case'
import { ListLessonsUseCase } from '../application/use-cases/list-lessons.use-case'
import { ListNotificationsUseCase } from '../application/use-cases/list-notifications.use-case'
import { ListTrailsUseCase } from '../application/use-cases/list-trails.use-case'
import { NotifySubscribersUseCase } from '../application/use-cases/notify-subscribers.use-case'
import { PublishLessonUseCase } from '../application/use-cases/publish-lesson.use-case'
import {
  COMMENT_REPOSITORY,
  type ICommentRepository,
} from '../domain/repositories/comment.repository'
import {
  type ILessonRepository,
  LESSON_REPOSITORY,
} from '../domain/repositories/lesson.repository'
import {
  type INotificationRepository,
  NOTIFICATION_REPOSITORY,
} from '../domain/repositories/notification.repository'
import {
  type ITrailRepository,
  TRAIL_REPOSITORY,
} from '../domain/repositories/trail.repository'
import { PrismaCommentRepository } from './database/prisma-comment.repository'
import { PrismaLessonRepository } from './database/prisma-lesson.repository'
import { PrismaNotificationRepository } from './database/prisma-notification.repository'
import { PrismaTrailRepository } from './database/prisma-trail.repository'
import { PrismaService } from './database/prisma.service'
import { HttpReputationGateway } from './gateways/http-reputation.gateway'
import { LessonController } from './http/lesson.controller'
import { NotificationController } from './http/notification.controller'
import { TrailController } from './http/trail.controller'
import { AwardXpOnLessonPublishedListener } from './messaging/award-xp.listener'
import { EventEmitterPublisher } from './messaging/event-emitter.publisher'
import { LessonPublishedListener } from './messaging/lesson-published.listener'
import { StaticSubscriberProvider } from './providers/static-subscriber.provider'

@Module({
  controllers: [LessonController, TrailController, NotificationController],
  providers: [
    PrismaService,
    LessonPublishedListener,
    AwardXpOnLessonPublishedListener,
    { provide: REPUTATION_GATEWAY, useClass: HttpReputationGateway },
    { provide: LESSON_REPOSITORY, useClass: PrismaLessonRepository },
    { provide: TRAIL_REPOSITORY, useClass: PrismaTrailRepository },
    { provide: COMMENT_REPOSITORY, useClass: PrismaCommentRepository },
    {
      provide: NOTIFICATION_REPOSITORY,
      useClass: PrismaNotificationRepository,
    },
    { provide: EVENT_PUBLISHER, useClass: EventEmitterPublisher },
    { provide: SUBSCRIBER_PROVIDER, useClass: StaticSubscriberProvider },
    {
      provide: PublishLessonUseCase,
      inject: [LESSON_REPOSITORY, EVENT_PUBLISHER],
      useFactory: (lessons: ILessonRepository, events: IEventPublisher) =>
        new PublishLessonUseCase(lessons, events),
    },
    {
      provide: ListLessonsUseCase,
      inject: [LESSON_REPOSITORY],
      useFactory: (lessons: ILessonRepository) =>
        new ListLessonsUseCase(lessons),
    },
    {
      provide: GetLessonUseCase,
      inject: [LESSON_REPOSITORY],
      useFactory: (lessons: ILessonRepository) => new GetLessonUseCase(lessons),
    },
    {
      provide: CreateTrailUseCase,
      inject: [TRAIL_REPOSITORY],
      useFactory: (trails: ITrailRepository) => new CreateTrailUseCase(trails),
    },
    {
      provide: ListTrailsUseCase,
      inject: [TRAIL_REPOSITORY],
      useFactory: (trails: ITrailRepository) => new ListTrailsUseCase(trails),
    },
    {
      provide: AddCommentUseCase,
      inject: [COMMENT_REPOSITORY, LESSON_REPOSITORY],
      useFactory: (comments: ICommentRepository, lessons: ILessonRepository) =>
        new AddCommentUseCase(comments, lessons),
    },
    {
      provide: ListCommentsUseCase,
      inject: [COMMENT_REPOSITORY],
      useFactory: (comments: ICommentRepository) =>
        new ListCommentsUseCase(comments),
    },
    {
      provide: NotifySubscribersUseCase,
      inject: [NOTIFICATION_REPOSITORY, SUBSCRIBER_PROVIDER],
      useFactory: (
        notifications: INotificationRepository,
        subscribers: ISubscriberProvider,
      ) => new NotifySubscribersUseCase(notifications, subscribers),
    },
    {
      provide: ListNotificationsUseCase,
      inject: [NOTIFICATION_REPOSITORY],
      useFactory: (notifications: INotificationRepository) =>
        new ListNotificationsUseCase(notifications),
    },
  ],
})
export class ContentModule {}
