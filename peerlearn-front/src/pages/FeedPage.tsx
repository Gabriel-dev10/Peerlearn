import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { contentService } from '../services/content.service'

const TYPE_LABEL: Record<string, string> = {
  video: 'Vídeo',
  text: 'Texto',
  quiz: 'Quiz',
}

export function FeedPage() {
  const {
    data: lessons,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['lessons'],
    queryFn: contentService.listLessons,
  })

  if (isLoading) {
    return <p>Carregando aulas...</p>
  }

  if (isError) {
    return <p className="error">Não foi possível carregar o feed.</p>
  }

  return (
    <div>
      <div className="page-header">
        <h1>Feed de micro-aulas</h1>
        <Link to="/criar" className="button-link">
          + Nova aula
        </Link>
      </div>

      {lessons && lessons.length === 0 && (
        <p>Nenhuma aula publicada ainda. Seja o primeiro!</p>
      )}

      <ul className="list">
        {lessons?.map((lesson) => (
          <li key={lesson.id} className="card">
            <span className="badge-type">
              {TYPE_LABEL[lesson.type] ?? lesson.type}
            </span>
            <h3>{lesson.title}</h3>
            <p>{lesson.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
