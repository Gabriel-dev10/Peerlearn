import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../hooks/useAuth'
import { reputationService } from '../services/reputation.service'

const MEDALS = ['🥇', '🥈', '🥉']

export function RankingPage() {
  const { user } = useAuth()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ranking'],
    queryFn: () => reputationService.getRanking(10),
  })

  if (isLoading) {
    return <p className="empty">Carregando ranking...</p>
  }

  if (isError) {
    return <p className="error">Não foi possível carregar o ranking.</p>
  }

  return (
    <div>
      <h1>Ranking de XP</h1>
      <p
        className="muted"
        style={{ marginTop: '-0.25rem', marginBottom: '1.5rem' }}
      >
        Os alunos que mais ensinam aparecem no topo. Publique aulas para subir.
      </p>
      {data && data.length === 0 && (
        <p className="empty">Ninguém pontuou ainda. Publique uma aula!</p>
      )}
      <ol className="ranking">
        {data?.map((entry, index) => (
          <li
            key={entry.userId}
            className={entry.userId === user?.userId ? 'card me' : 'card'}
          >
            <span className="position">{MEDALS[index] ?? `#${index + 1}`}</span>
            <span className="ranking-user">
              {entry.userId === user?.userId
                ? 'Você'
                : entry.userId.slice(0, 8)}
            </span>
            <span className="ranking-xp">{entry.xp} XP</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
