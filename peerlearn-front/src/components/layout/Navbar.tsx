import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        PeerLearn
      </Link>

      {isAuthenticated ? (
        <nav className="nav-links">
          <Link to="/">Feed</Link>
          <Link to="/criar">Criar aula</Link>
          <Link to="/ranking">Ranking</Link>
          <Link to="/perfil">Perfil</Link>
          <span className="nav-user">{user?.displayName}</span>
          <button type="button" onClick={handleLogout}>
            Sair
          </button>
        </nav>
      ) : (
        <nav className="nav-links">
          <Link to="/login">Entrar</Link>
          <Link to="/register">Registrar</Link>
        </nav>
      )}
    </header>
  )
}
