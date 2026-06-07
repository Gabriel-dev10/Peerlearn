import { Injectable } from '@nestjs/common'
import { Role } from '@prisma/client'
import { User, UserRole } from '../../domain/entities/user.entity'
import type { IUserRepository } from '../../domain/repositories/user.repository'
import { PrismaService } from './prisma.service'

interface UserRow {
  id: string
  email: string
  passwordHash: string
  role: Role
  displayName: string
  bio: string | null
  createdAt: Date
}

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { id } })
    return row ? this.toDomain(row) : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    })
    return row ? this.toDomain(row) : null
  }

  async save(user: User): Promise<void> {
    const data = {
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role as Role,
      displayName: user.displayName,
      bio: user.bio,
    }

    await this.prisma.user.upsert({
      where: { id: user.id },
      create: { id: user.id, ...data },
      update: data,
    })
  }

  private toDomain(row: UserRow): User {
    return User.create({
      id: row.id,
      email: row.email,
      passwordHash: row.passwordHash,
      role: row.role as UserRole,
      displayName: row.displayName,
      bio: row.bio,
      createdAt: row.createdAt,
    })
  }
}
