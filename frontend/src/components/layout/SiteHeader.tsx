import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { authEndpoints } from "../../features/auth/api/authEndpoints";
import { useNotifications } from "../../features/notifications/NotificationProvider";
import "../../styles/shared/brand.css";
import "../../styles/layout/site-header.css";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, setUser } = useAuth();
  const { addNotification } = useNotifications();
  const displayName = user?.name || user?.email || "Account";

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        menuOpen &&
        event.target instanceof Node &&
        !navRef.current?.contains(event.target)
      )
        setMenuOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      const response = await fetch(authEndpoints.logout, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed.");
      }

      setUser(null);
      closeMenu();
      addNotification({
        title: "You are logged out",
        message: "Come back whenever you are ready.",
        tone: "info",
      });
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
      addNotification({
        title: "Logout failed",
        message: "Please try again in a moment.",
        tone: "error",
      });
    }
  };

  return (
    <header
      ref={navRef}
      className={menuOpen ? "site-header site-header--open" : "site-header"}
    >
      <nav className="nav shell" aria-label="Main navigation">
        <div className="nav-brand-wrap">
          <Link
            className="brand"
            to="/"
            aria-label="PrepAi home"
            onClick={closeMenu}
          >
            <span className="brand-mark" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M3 6.5 12 2l9 4.5v11L12 22l-9-4.5v-11Z" />
                <path d="m3 6.5 9 5 9-5M12 11.5V22" />
              </svg>
            </span>
            PrepAi
          </Link>
          <span className="nav-status">LIVE STUDY OPS</span>
        </div>
        <div className="nav-links">
          <Link
            className="nav-link-pill nav-link-pill--active"
            to="/#features"
            onClick={closeMenu}
          >
            Features
          </Link>
          <Link
            className="nav-link-pill"
            to="/#how-it-works"
            onClick={closeMenu}
          >
            How it works
          </Link>
          <Link className="nav-link-pill" to="/#subjects" onClick={closeMenu}>
            Subjects
          </Link>
          <div className="nav-mobile-auth" aria-label="Account actions">
            {isAuthenticated ? (
              <>
                <Link
                  className="nav-mobile-auth__button nav-mobile-auth__button--primary"
                  to="/"
                  onClick={closeMenu}
                >
                  {displayName}
                </Link>
                <button
                  className="nav-mobile-auth__button nav-mobile-auth__button--ghost"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="nav-mobile-auth__button nav-mobile-auth__button--ghost"
                  to="/login"
                  onClick={closeMenu}
                >
                  Log in
                </Link>
                <Link
                  className="nav-mobile-auth__button nav-mobile-auth__button--primary"
                  to="/register"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <Link className="btn btn-primary nav-cta" to="/">
                Hi, {displayName} <span aria-hidden="true">↗</span>
              </Link>
              <button
                className="nav-link-ghost"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link-ghost" to="/login">
                Log in
              </Link>
              <Link className="btn btn-primary nav-cta" to="/register">
                Register <span aria-hidden="true">↗</span>
              </Link>
            </>
          )}
          <button
            className="btn menu-toggle"
            type="button"
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span>☰</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
