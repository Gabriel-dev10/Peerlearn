export class UnknownXpActionError extends Error {
  constructor(action: string) {
    super(`Ação de XP desconhecida: ${action}`)
    this.name = 'UnknownXpActionError'
  }
}
