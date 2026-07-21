import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const tickerSubjects = [
  ".NET",
  "Java",
  "Python",
  "React",
  "SQL",
  "Cloud",
  "Data Structures",
  "Networks",
];

const features = [
  {
    title: "Never-repeat quizzes",
    description:
      "Generate an unlimited stream of original MCQs matched to your technology, topic, and difficulty.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" />
      </svg>
    ),
  },
  {
    title: "Turn notes into tests",
    description:
      "Upload a PDF, PPT, or DOCX and get a custom assessment built directly from your study material.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 4h16v16H4zM8 8h8M8 12h5M8 16h7" />
      </svg>
    ),
  },
  {
    title: "See your next move",
    description:
      "Spot weak topics, revisit missed answers, and receive clear recommendations for what to master next.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 19V9m5 10V5m5 14v-7m5 7V3" />
      </svg>
    ),
  },
];

const options = [
  "The component is re-rendered",
  "React schedules an update",
  "The DOM refreshes entirely",
  "Nothing until a page reload",
];

function HomePage() {
  const [activeOption, setActiveOption] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!location.hash) return;

    const targetId = decodeURIComponent(location.hash.replace(/^#/, ""));

    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const frame = window.requestAnimationFrame(scrollToTarget);
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

  return (
    <>
      <main id="top" className="home-page">
        <section className="hero">
          <div className="hero-grid shell">
            <div>
              <div className="eyebrow">
                <span className="dot" /> Exam prep, reimagined
              </div>
              <h1>
                Technical practice that{" "}
                <span className="highlight">keeps up.</span>
              </h1>
              <p className="hero-copy">
                Generate fresh, focused technical quizzes from any topic-or your
                own study notes. Learn what matters, then prove you know it.
              </p>
              <div className="hero-actions">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() =>
                    navigate(isAuthenticated ? "/build-quiz" : "/login", {
                      state: isAuthenticated
                        ? undefined
                        : { from: "/build-quiz" },
                    })
                  }
                >
                  Build my first quiz
                  <svg
                    className="button-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
                <a className="btn" href="#features">
                  Explore the platform <span aria-hidden="true">↓</span>
                </a>
              </div>
              <div className="trust-note">
                <span className="tiny-avatars" aria-hidden="true">
                  <span>J</span>
                  <span>S</span>
                  <span>A</span>
                </span>
                Join 12,000+ learners building their technical edge.
              </div>
            </div>

            <div className="quiz-window" aria-label="Quiz preview">
              <div className="window-bar">
                <div className="window-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="window-title">PREPAI / PRACTICE MODE</div>
              </div>
              <div className="window-main">
                <div className="quiz-meta">
                  <span>React fundamentals</span>
                  <span className="pill">MEDIUM</span>
                </div>
                <div className="progress">
                  <span />
                </div>
                <div className="question-label">QUESTION 08 / 12</div>
                <div className="question">
                  What happens when a React component&apos;s state changes?
                </div>
                {options.map((option, index) => (
                  <button
                    key={option}
                    className={
                      activeOption === index ? "option active" : "option"
                    }
                    type="button"
                    onClick={() => setActiveOption(index)}
                  >
                    <b>{String.fromCharCode(65 + index)}</b> {option}
                  </button>
                ))}
              </div>
              <div className="card-sticker" aria-hidden="true">
                <div>
                  <strong>∞</strong>
                  <small>
                    Fresh questions
                    <br />
                    every time
                  </small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ticker" aria-label="Subjects supported">
          <div className="ticker-track">
            {tickerSubjects.concat(tickerSubjects).map((subject, index) => (
              <div className="ticker-item" key={`${subject}-${index}`}>
                <i /> {subject}
              </div>
            ))}
          </div>
        </section>

        <section className="section shell" id="features">
          <div className="section-intro">
            <div>
              <div className="eyebrow">
                <span className="dot" /> A smarter study loop
              </div>
              <h2>Practice with a platform that learns your learning.</h2>
            </div>
            <p>
              No recycled lists. No generic advice. Just focused practice that
              adapts to your goals, gaps, and pace.
            </p>
          </div>
          <div className="features">
            {features.map((feature) => (
              <article className="feature" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section how" id="how-it-works">
          <div className="shell">
            <div className="eyebrow">
              <span className="dot" /> No prep required
            </div>
            <h2>
              From “what should I study?”
              <br />
              to “I&apos;ve got this.”
            </h2>
            <p className="how-sub">
              Your focused study session is only three moves away. Mix
              ready-made subjects with the material already on your desk.
            </p>
            <div className="steps">
              <article className="step">
                <span className="step-no">01 / PICK A FOCUS</span>
                <h3>Choose your topic</h3>
                <p>
                  Search subjects, drill into a concept, then set a difficulty
                  level that feels right.
                </p>
              </article>
              <article className="step">
                <span className="step-no">02 / MAKE IT YOURS</span>
                <h3>Generate your quiz</h3>
                <p>
                  Let AI make a unique set-or upload notes to turn your own
                  material into questions.
                </p>
              </article>
              <article className="step">
                <span className="step-no">03 / GET SHARPER</span>
                <h3>Review and repeat</h3>
                <p>
                  Understand every answer, save tough questions, and watch your
                  progress compound.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section subject-section shell" id="subjects">
          <div className="subject-layout">
            <div>
              <div className="eyebrow">
                <span className="dot" /> Your entire syllabus
              </div>
              <h2>Go deep on the things that matter.</h2>
              <p className="hero-copy subject-copy">
                From first principles to framework internals, PrepAi meets you
                at any point in your technical journey.
              </p>
              <div className="subject-list">
                {tickerSubjects.map((subject) => (
                  <div className="subject" key={subject}>
                    <span className="subject-badge">{subject.slice(0, 3)}</span>
                    {subject}
                  </div>
                ))}
              </div>
              <p className="subject-note">
                + Computer Networks, DevOps, System Design, and more.
              </p>
            </div>
            <div
              className="subject-visual"
              aria-label="Performance analytics preview"
            >
              <div className="grid-lines" />
              <div className="floating-code">
                <div className="code-top">
                  <span>TOPIC ANALYSIS</span>
                  <span>LIVE</span>
                </div>
                <span className="code-line" />
                <span className="code-line" />
                <span className="code-line" />
                <span className="code-line" />
              </div>
              <div className="score-bubble">
                <b>86%</b>
                <span>ACCURACY ↑</span>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta" id="start">
          <div className="shell">
            <div className="cta-card">
              <div>
                <h2>Your next level starts with one question.</h2>
                <p>
                  Build a practice quiz in seconds. It&apos;s free to get
                  started, and it gets smarter with every attempt.
                </p>
              </div>
              <div className="cta-action">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => navigate(isAuthenticated ? "/build-quiz" : "/login", {
                    state: isAuthenticated
                      ? undefined
                      : { from: "/build-quiz" },
                  })}
                >
                  Start practicing now <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
