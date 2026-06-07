import type { User } from '../src/domain/entities/user.entity'
import type { IUserRepository } from '../src/domain/repositories/user.repository'

export class InMemoryUserRepository implements IUserRepository {
  public readonly items: User[] = []

  async findById(id: string): Promise<User | null> {
    return this.items.find((user) => user.id === id) ?? null
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalized = email.trim().toLowerCase()
    return this.items.find((user) => user.email === normalized) ?? null
  }

  async save(user: User): Promise<void> {
    const index = this.items.findIndex((item) => item.id === user.id)
    if (index >= 0) {
      this.items[index] = user
      return
    }
    this.items.push(user)
  }
}
