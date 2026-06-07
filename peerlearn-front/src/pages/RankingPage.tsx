import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../hooks/useAuth'
import { reputationService } from '../services/reputation.service'

export function RankingPage() {
  const { user } = useAuth()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ranking'],
    queryFn: () => reputationService.getRanking(10),
  })

  if (isLoading) {
    return <p>Carregando ranking...</p>
  }

  if (isError) {
    return <p className="error">Não foi possível carregar o ranking.</p>
  }

  return (
    <div>
      <h1>Ranking de XP</h1>
      {data && data.length === 0 && <p>Ninguém pontuou ainda.</p>}
      <ol className="ranking">
        {data?.map((entry, index) => (
          <li
            key={entry.userId}
            className={entry.userId === user?.userId ? 'card me' : 'card'}
          >
            <span className="position">#{index + 1}</span>
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
