import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../hooks/useAuth'
import { contentService } from '../services/content.service'
import { reputationService } from '../services/reputation.service'

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

  return (
    <div>
      <h1>Meu perfil</h1>

      <div className="card">
        <h2>{reputation.data?.displayName ?? displayName}</h2>
        <p>{user?.email}</p>
        <p className="xp">
          <strong>{reputation.data?.xp ?? 0}</strong> XP
        </p>

        <div className="badges">
          {reputation.data?.badges.length ? (
            reputation.data.badges.map((badge) => (
              <span key={badge.name} className="badge">
                {badge.icon} {badge.name}
              </span>
            ))
          ) : (
            <span className="muted">Nenhum badge ainda</span>
          )}
        </div>
      </div>

      <h2>Notificações</h2>
      <ul className="list">
        {notifications.data?.length ? (
          notifications.data.map((item) => (
            <li key={item.id} className="card">
              {item.message}
            </li>
          ))
        ) : (
          <p className="muted">Sem notificações.</p>
        )}
      </ul>
    </div>
  )
}
