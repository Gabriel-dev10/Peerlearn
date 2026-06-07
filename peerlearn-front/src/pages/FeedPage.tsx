import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { contentService } from '../services/content.service'

const TYPE_LABEL: Record<string, string> = {
  video: 'Vídeo',
  text: 'Texto',
  quiz: 'Quiz',
}

export function FeedPage() {
  const lessonsQuery = useQuery({
    queryKey: ['lessons'],
    queryFn: contentService.listLessons,
  })
  const trailsQuery = useQuery({
    queryKey: ['trails'],
    queryFn: contentService.listTrails,
  })

  const lessons = lessonsQuery.data ?? []
  const trails = trailsQuery.data ?? []

  return (
    <div>
      <section className="hero">
        <h1>Aprenda com quem está ao seu lado</h1>
        <p>
          Micro-aulas criadas por alunos, para alunos. Publique o que você
          domina, ganhe XP e suba no ranking da turma.
        </p>
        <Link to="/criar" className="button-link">
          Publicar uma aula
        </Link>
      </section>

      <div className="stats">
        <div className="stat">
          <div className="stat-value">{lessons.length}</div>
          <div className="stat-label">Aulas publicadas</div>
        </div>
        <div className="stat">
          <div className="stat-value">{trails.length}</div>
          <div className="stat-label">Trilhas de conhecimento</div>
        </div>
        <div className="stat">
          <div className="stat-value">+50</div>
          <div className="stat-label">XP por aula publicada</div>
        </div>
      </div>

      {trails.length > 0 && (
        <>
          <h2 className="section-title">Trilhas</h2>
          <ul className="list">
            {trails.map((trail) => (
              <li key={trail.id} className="card">
                <span className="badge-type">Trilha</span>
                <h3>{trail.title}</h3>
                <p>{trail.description}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2 className="section-title">Aulas recentes</h2>

      {lessonsQuery.isLoading && <p className="empty">Carregando aulas...</p>}
      {lessonsQuery.isError && (
        <p className="error">Não foi possível carregar o feed.</p>
      )}
      {lessonsQuery.isSuccess && lessons.length === 0 && (
        <p className="empty">Nenhuma aula publicada ainda. Seja o primeiro!</p>
      )}

      <ul className="list">
        {lessons.map((lesson) => (
          <li key={lesson.id} className="card">
            <span className="badge-type">
              {TYPE_LABEL[lesson.type] ?? lesson.type}
            </span>
            <h3>{lesson.title}</h3>
            <p>{lesson.body}</p>
            <div className="card-meta">
              {new Date(lesson.createdAt).toLocaleDateString('pt-BR')}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
