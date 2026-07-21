import { useNavigate } from 'react-router-dom'
import LoginForm from '../features/auth/components/LoginForm'

export default function LoginPage() {
  const navigate = useNavigate()
  return (
    <main id="top" className="home-page">
      <section className="section shell auth-screen" aria-label="Login form">
        <div className="auth-screen__inner">
          <div className="auth-screen__intro">
            <div className="eyebrow"><span className="dot" /> Account access</div>
            <h2>Welcome back. Sign in to continue.</h2>
            <p>Use your existing account to get back to quizzes, progress, and saved work.</p>
            <button type="button" className="auth-back-button" onClick={() => navigate('/')}>Back to home</button>
          </div>
          <div className="auth-screen__form" id="login-form"><LoginForm /></div>
        </div>
      </section>
    </main>
  )
}
