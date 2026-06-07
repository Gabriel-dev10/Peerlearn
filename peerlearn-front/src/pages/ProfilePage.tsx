import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../hooks/useAuth'
import { contentService } from '../services/content.service'
import { reputationService } from '../services/reputation.service'

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function ProfilePage() {
  const { user } = useAuth()
  const userId = user?.userId ?? ''
  const displayName = user?.displayName ?? 'Aluno'

  const reputation = useQuery({
    queryKey: ['reputation', userId],
    queryFn: () => reputationService.getReputation(userId, displayName),
    enabled: userId !== '',
  })

  const notifications = useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => contentService.listNotifications(userId),
    enabled: userId !== '',
  })

  const badges = reputation.data?.badges ?? []
  const notificationList = notifications.data ?? []

  return (
    <div>
      <h1>Meu perfil</h1>

      <div className="card">
        <div className="profile-head">
          <span className="avatar">{initials(displayName)}</span>
          <div>
            <h2>{reputation.data?.displayName ?? displayName}</h2>
            <span className="muted">{user?.email}</span>
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-value">{reputation.data?.xp ?? 0}</div>
          <div className="stat-label">XP acumulado</div>
        </div>
        <div className="stat">
          <div className="stat-value">{badges.length}</div>
          <div className="stat-label">Badges conquistados</div>
        </div>
        <div className="stat">
          <div className="stat-value">{notificationList.length}</div>
          <div className="stat-label">Notificações</div>
        </div>
      </div>

      <h2 className="section-title">Badges</h2>
      <div className="badges">
        {badges.length ? (
          badges.map((badge) => (
            <span key={badge.name} className="badge">
              {badge.icon} {badge.name}
            </span>
          ))
        ) : (
          <span className="muted">
            Nenhum badge ainda — publique aulas para ganhar!
          </span>
        )}
      </div>

      <h2 className="section-title">Notificações</h2>
      {notificationList.length ? (
        <ul className="list">
          {notificationList.map((item) => (
            <li key={item.id} className="card">
              {item.message}
              <div className="card-meta">
                {new Date(item.createdAt).toLocaleDateString('pt-BR')}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty">Sem notificações por enquanto.</p>
      )}
    </div>
  )
}
