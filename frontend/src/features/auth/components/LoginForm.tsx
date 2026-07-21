import { useState, type SyntheticEvent } from 'react'
import { authEndpoints } from '../api/authEndpoints'
import { useAuth } from '../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
export default function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const { setUser, setIsLoading } = useAuth()
  const from = typeof location.state === 'object' && location.state && 'from' in location.state ? String(location.state.from) : '/'

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await fetch(authEndpoints.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ Email, Password }),
      })
      console.log('Login response:', response)
      if (!response.ok) {
        alert('Invalid email or password.')
        return
      }
      setUser(await response.json())
      setIsLoading(false)
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  return (
    <article className="auth-card auth-card--login">
      <div className="auth-card__sticker auth-card__sticker--violet">LOGIN</div>
      <header className="auth-card__header">
        <h2>Welcome back.</h2>
        <p>
         Login to your account to access your quizzes, progress, and saved work.
        </p>
      </header>

      <button type="button" className="auth-oauth-button auth-oauth-button--google">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="auth-oauth-button__icon">
          <path
            fill="currentColor"
            d="M21.35 11.1h-9.18v2.9h5.26c-.23 1.38-1.62 4.04-5.26 4.04-3.16 0-5.74-2.62-5.74-5.84s2.58-5.84 5.74-5.84c1.8 0 3 .77 3.7 1.43l2.52-2.43C16.56 4.78 14.55 4 12.17 4 6.98 4 2.76 8.18 2.76 13.3S6.98 22.6 12.17 22.6c5.42 0 9.01-3.8 9.01-9.14 0-.61-.07-1.08-.13-1.36z"
          />
        </svg>
        Continue with Google
      </button>

      <div className="auth-divider">
        <span>or use email</span>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-field">
          <span>Email</span>
          <input type="email" name="email" placeholder="you@school.edu" autoComplete="email" value={Email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label className="auth-field">
          <span>Password</span>
          <input type="password" name="password" placeholder="••••••••" autoComplete="current-password" value={Password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <div className="auth-row auth-row--split">
          <label className="auth-check">
            <input type="checkbox" name="remember" defaultChecked />
            <span>Remember this device</span>
          </label>
          <button type="button" className="auth-link-button">
            Forgot password?
          </button>
        </div>

              <button type="submit"
                  className="auth-button auth-button--primary">
          Sign in
        </button>
      </form>

      <footer className="auth-card__footer">
        <span className="auth-meta">Fast access for returning users.</span>
      </footer>
    </article>
  )
}

