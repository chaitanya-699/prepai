import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../features/notifications/NotificationProvider";
import "../styles/pages/home-page.css";
import "../styles/pages/quiz-page.css";

const QUIZ_CONFIG_KEY = "prepai-quiz-config";

function QuizPage() {
  const navigate = useNavigate();
  const [config, setConfig] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submittedOption, setSubmittedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const { addNotification } = useNotifications();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(QUIZ_CONFIG_KEY);
      if (raw) {
        setConfig(JSON.parse(raw));
        return;
      }
    } catch {
      // ignore
    }

    // If no config, go back to builder
    navigate("/build-quiz");
  }, [navigate]);

  const questionCount = config?.questionCount ?? 10;
  const technology = config?.technology ?? "Practice";
  const difficulty = config?.difficulty ?? "MEDIUM";
  const topics = config?.topics ?? [];

  const questions = useMemo(() => {
    const t = topics.length > 0 ? topics[0] : technology;
    return Array.from({ length: questionCount }).map((_, idx) => ({
      id: idx + 1,
      text: `What is a core concept in ${t}? (placeholder)`,
      options: [
        "An implementation detail",
        "A scheduling update",
        "A browser-only action",
        "Requires a page reload",
      ],
    }));
  }, [questionCount, topics, technology]);

  const goNext = () => {
    setSelectedOption(null);
    setSubmittedOption(null);
    setShowAnswer(false);
    if (currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1);
  };

  const goPrev = () => {
    setSelectedOption(null);
    setSubmittedOption(null);
    setShowAnswer(false);
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const q = questions[currentIndex];

  const handleOptionSelect = (idx: number) => {
    setSelectedOption(idx);
    if (submittedOption !== null) {
      setSubmittedOption(null);
      setShowAnswer(false);
    }
  };

  const submitAnswer = () => {
    if (selectedOption === null) {
      addNotification({
        title: "Select an option first",
        message: "Please choose an answer before submitting.",
        tone: "error",
      });
      return;
    }

    setSubmittedOption(selectedOption);
    setShowAnswer(false);
    addNotification({
      title: "Answer submitted",
      message: "You can now reveal the correct answer.",
      tone: "success",
    });
  };

  const toggleShowAnswer = () => {
    if (submittedOption === null) {
      addNotification({
        title: "Submit your answer first",
        message: "Reveal the answer after you submit a response.",
        tone: "info",
      });
      return;
    }

    setShowAnswer((prev) => !prev);
  };

  if (!config) return null;

  return (
    <main className="home-page quiz-page">
      <section className="hero">
        <div className="hero-grid">
          <div className="quiz-window" aria-label="Quiz">
            <div className="window-bar">
              <div className="window-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="window-title">PREPAI / PRACTICE MODE</div>
            </div>
            <div className="window-main">
              <div className="quiz-actions">
                <button
                  type="button"
                  className={aiOpen ? "btn btn-ai active" : "btn btn-ai"}
                  onClick={() => setAiOpen((prev) => !prev)}
                >
                  ✨ Ask AI
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleShowAnswer}
                >
                  {showAnswer ? "Hide answer" : "Show answer"}
                </button>
              </div>
              <div className="quiz-meta">
                <span>{technology}</span>
                <span className="pill">{String(difficulty).toUpperCase()}</span>
              </div>
              <div className="progress">
                <span
                  style={{
                    width: `${((currentIndex + 1) / questionCount) * 100}%`,
                  }}
                />
              </div>
              <div className="question-label">
                QUESTION {String(q.id).padStart(2, "0")} / {questionCount}
              </div>
              <div className="question">{q.text}</div>

              {showAnswer && submittedOption !== null && (
                <div className="answer-note">
                  <div className="answer-note__title">
                    Correct answer:{" "}
                    <strong>{String.fromCharCode(65 + 1)}</strong>.
                    {` ${q.options[1]}`}
                  </div>
                  <div className="explanation-note">
                    Explanation: This choice is the best answer because it
                    reflects a core concept in {technology} and matches the way
                    the question is framed.
                  </div>
                </div>
              )}

              {q.options.map((opt, idx) => (
                <button
                  key={opt}
                  className={
                    selectedOption === idx ? "option active" : "option"
                  }
                  type="button"
                  onClick={() => handleOptionSelect(idx)}
                >
                  <b>{String.fromCharCode(65 + idx)}</b> {opt}
                </button>
              ))}

              <div className="quiz-submit-row">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={submitAnswer}
                >
                  Submit answer
                </button>
              </div>

              <div className="quiz-pagination-row">
                <button
                  className="btn"
                  type="button"
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                >
                  ← Prev
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={goNext}
                >
                  Next →
                </button>
              </div>
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
    </main>
  );
}

export default QuizPage;
