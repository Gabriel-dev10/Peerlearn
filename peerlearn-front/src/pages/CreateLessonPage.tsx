import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { contentService } from '../services/content.service'
import type { ContentType } from '../types'

export function CreateLessonPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [type, setType] = useState<ContentType>('text')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const mutation = useMutation({
    mutationFn: () =>
      contentService.publishLesson({
        type,
        title,
        body,
        authorId: user?.userId ?? '',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] })
      navigate('/')
    },
  })

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    mutation.mutate()
  }

  return (
    <div className="card form-card">
      <h1>Publicar micro-aula</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="type">Tipo</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as ContentType)}
        >
          <option value="text">Texto</option>
          <option value="video">Vídeo</option>
          <option value="quiz">Quiz</option>
        </select>

        <label htmlFor="title">Título</label>
        <input
          id="title"
          type="text"
          minLength={3}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="body">Conteúdo</label>
        <textarea
          id="body"
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        {mutation.isError && <p className="error">Erro ao publicar a aula.</p>}

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Publicando...' : 'Publicar'}
        </button>
      </form>
    </div>
  )
}
