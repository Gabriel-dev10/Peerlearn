import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch {
      setError('Email ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout">
      <aside className="auth-side">
        <h2>Ensine. Aprenda. Evolua.</h2>
        <p>
          O PeerLearn é onde alunos ensinam alunos. Compartilhe o que você sabe
          em micro-aulas e cresça com a sua turma.
        </p>
        <ul className="auth-features">
          <li>
            <span className="check">✓</span> Publique aulas em vídeo, texto ou
            quiz
          </li>
          <li>
            <span className="check">✓</span> Ganhe XP e desbloqueie badges
          </li>
          <li>
            <span className="check">✓</span> Acompanhe o ranking da turma
          </li>
          <li>
            <span className="check">✓</span> Receba notificações de novas aulas
          </li>
        </ul>
      </aside>

      <div className="auth-form">
        <h1>Entrar</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <span className="muted">
          Não tem conta? <Link to="/register">Registre-se</Link>
        </span>
      </div>
    </div>
  )
}
