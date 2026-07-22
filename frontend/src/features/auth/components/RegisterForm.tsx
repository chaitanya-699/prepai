import { useState, type SyntheticEvent } from "react";
import { authEndpoints } from "../api/authEndpoints";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../notifications/NotificationProvider";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsLoading } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(authEndpoints.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        addNotification({
          title: "Registration failed",
          message: "Please try again with a different email or password.",
          tone: "error",
        });
        return;
      }
      const user = await response.json();
      setUser(user);
      setIsLoading(false);
      addNotification({
        title: "Account created",
        message: "Your account is ready. Welcome to PrepAi.",
        tone: "success",
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during registration:", error);
      addNotification({
        title: "Server unavailable",
        message: "We could not complete registration right now.",
        tone: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="auth-card auth-card--register">
      <div className="auth-card__sticker auth-card__sticker--peach">NEW</div>
      <header className="auth-card__header">
        <p className="auth-card__eyebrow">Create account</p>
        <h2>Join the network.</h2>
        <p>
          Build a fresh profile and start a clean onboarding path with a bold,
          guided setup.
        </p>
      </header>

      <button
        type="button"
        className="auth-oauth-button auth-oauth-button--google"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="auth-oauth-button__icon"
        >
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
          <input
            type="email"
            name="email"
            placeholder="you@school.edu"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <div className="auth-row auth-row--triple">
          <label className="auth-field auth-field--compact">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <label className="auth-check auth-check--stacked">
          <input type="checkbox" name="terms" defaultChecked />
          <span>I agree to the terms and workspace rules.</span>
        </label>

        <button type="submit" className="auth-button auth-button--secondary">
          Create account
        </button>
      </form>

      <footer className="auth-card__footer">
        <span className="auth-meta">
          Designed for fast enrollment and clear next steps.
        </span>
      </footer>
    </article>
  );
}
