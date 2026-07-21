import { useNavigate } from 'react-router-dom'
import RegisterForm from '../features/auth/components/RegisterForm'

export default function RegisterPage() {
  const navigate = useNavigate()
  return (
    <main id="top" className="home-page">
      <section className="section shell auth-screen" aria-label="Register form">
        <div className="auth-screen__inner">
          <div className="auth-screen__intro">
            <div className="eyebrow"><span className="dot" /> Create account</div>
            <h2>Create your account and start fresh.</h2>
            <p>Register a new PrepAi profile and start from a clean setup.</p>
            <button type="button" className="auth-back-button" onClick={() => navigate('/')}>Back to home</button>
          </div>
          <div className="auth-screen__form" id="register-form"><RegisterForm /></div>
        </div>
      </section>
    </main>
  )
}
