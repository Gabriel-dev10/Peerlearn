import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await register(email, password, displayName)
      navigate('/')
    } catch {
      setError('Não foi possível registrar (email já em uso?)')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout">
      <aside className="auth-side">
        <h2>Crie sua conta gratuita</h2>
        <p>
          Junte-se à comunidade de aprendizado entre alunos. Em segundos você já
          pode publicar sua primeira micro-aula.
        </p>
        <ul className="auth-features">
          <li>
            <span className="check">✓</span> 100% gratuito
          </li>
          <li>
            <span className="check">✓</span> Comece a ganhar XP hoje
          </li>
          <li>
            <span className="check">✓</span> Construa sua reputação na turma
          </li>
        </ul>
      </aside>

      <div className="auth-form">
        <h1>Criar conta</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="displayName">Nome</label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Senha (mín. 6)</label>
          <input
            id="password"
            type="password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Criando...' : 'Registrar'}
          </button>
        </form>
        <span className="muted">
          Já tem conta? <Link to="/login">Entrar</Link>
        </span>
      </div>
    </div>
  )
}
