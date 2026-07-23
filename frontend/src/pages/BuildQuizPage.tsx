import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import {
  generateQuiz,
  getTechnologies,
  getTopicsByTechnology,
  type Topics,
} from "../features/auth/types";
import { useNotifications } from "../features/notifications/NotificationProvider";
import "../styles/pages/build-quiz-page.css";

const difficulties = [
  { name: "Foundation", detail: "Core concepts & recall", tone: "lime" },
  { name: "Confident", detail: "Applied knowledge", tone: "violet" },
  { name: "Challenge", detail: "Complex scenarios", tone: "peach" },
] as const;

const questionCounts = [
  { value: 5, label: "Quick", time: "~7 min" },
  { value: 10, label: "Standard", time: "~13 min" },
  { value: 15, label: "Balanced", time: "~20 min" },
  { value: 20, label: "Extended", time: "~26 min" },
  { value: 25, label: "Thorough", time: "~33 min" },
  { value: 30, label: "Deep dive", time: "~39 min" },
] as const;
const wizardSteps = [
  { id: 1, label: "STACK" },
  { id: 2, label: "TOPICS" },
  { id: 3, label: "DIFFICULTY" },
  { id: 4, label: "COUNT" },
  { id: 5, label: "NOTES" },
  { id: 6, label: "REVIEW" },
];

type Subject = string;
type Difficulty = (typeof difficulties)[number]["name"];
type SelectedTopic = { subject: Subject; topic: string };

const TECHNOLOGY_STORAGE_KEY = "prepai-technologies";
const TOPICS_STORAGE_KEY = "prepai-topics";

function BuildQuizPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [activeSubject, setActiveSubject] = useState<Subject>(".NET");
  const [subjectTopics, setSubjectTopics] = useState<Topics>({});
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techCounts, setTechCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<SelectedTopic[]>([
    { subject: ".NET", topic: "Entity Framework Core" },
    { subject: ".NET", topic: "JWT" },
  ]);
  const [difficulty, setDifficulty] = useState<Difficulty>("Confident");
  const [questionCount, setQuestionCount] = useState(15);
  const [notesText, setNotesText] = useState("");
  const [notesFile, setNotesFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addNotification } = useNotifications();

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const storedTechnologies = window.localStorage.getItem(
          TECHNOLOGY_STORAGE_KEY,
        );
        const storedTopics = window.localStorage.getItem(TOPICS_STORAGE_KEY);

        if (storedTechnologies) {
          try {
            const parsedTechnologies = JSON.parse(
              storedTechnologies,
            ) as string[];
            if (
              Array.isArray(parsedTechnologies) &&
              parsedTechnologies.length
            ) {
              setTechnologies(parsedTechnologies);
              setActiveSubject((current) =>
                parsedTechnologies.includes(current)
                  ? current
                  : parsedTechnologies[0],
              );
            }
          } catch {
            window.localStorage.removeItem(TECHNOLOGY_STORAGE_KEY);
          }
        }

        if (storedTopics) {
          try {
            const parsedTopics = JSON.parse(storedTopics) as Topics;
            if (parsedTopics && typeof parsedTopics === "object") {
              setSubjectTopics(parsedTopics);
            }
          } catch {
            window.localStorage.removeItem(TOPICS_STORAGE_KEY);
          }
        }

        const fetchedTechnologies = await getTechnologies();

        // The backend now returns a mapping { technology: count }.
        // Accept either an array (legacy) or an object and normalize to keys.
        if (fetchedTechnologies && typeof fetchedTechnologies === "object") {
          if (Array.isArray(fetchedTechnologies)) {
            setTechnologies(fetchedTechnologies);
            window.localStorage.setItem(
              TECHNOLOGY_STORAGE_KEY,
              JSON.stringify(fetchedTechnologies),
            );
            setActiveSubject((current) =>
              fetchedTechnologies.includes(current)
                ? current
                : fetchedTechnologies[0],
            );
          } else {
            const keys = Object.keys(
              fetchedTechnologies as Record<string, number>,
            );
            setTechnologies(keys);
            setTechCounts(fetchedTechnologies as Record<string, number>);
            window.localStorage.setItem(
              TECHNOLOGY_STORAGE_KEY,
              JSON.stringify(keys),
            );
            setActiveSubject((current) =>
              keys.includes(current) ? current : keys[0],
            );
          }
        }
      } catch (error) {
        console.error("Failed to load quiz data", error);
        setLoadError(
          "Unable to load technologies right now. Showing saved data if available.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadQuizData();
  }, []);

  const loadTopicsForSubject = async (subject: Subject) => {
    setActiveSubject(subject);
    setLoadError(null);

    const cachedTopics = subjectTopics[subject];
    if (Array.isArray(cachedTopics) && cachedTopics.length > 0) {
      return;
    }

    const storedTopics = window.localStorage.getItem(TOPICS_STORAGE_KEY);
    if (storedTopics) {
      try {
        const parsedTopics = JSON.parse(storedTopics) as Topics;
        const cachedFromStorage = parsedTopics[subject];
        if (Array.isArray(cachedFromStorage) && cachedFromStorage.length > 0) {
          setSubjectTopics((current) => ({
            ...current,
            [subject]: cachedFromStorage,
          }));
          return;
        }
      } catch {
        window.localStorage.removeItem(TOPICS_STORAGE_KEY);
      }
    }

    setIsLoadingTopics(true);

    try {
      const topics = await getTopicsByTechnology(subject);
      const normalizedTopics = Array.isArray(topics) ? topics : [];

      setSubjectTopics((current) => {
        const nextTopics = { ...current, [subject]: normalizedTopics };
        window.localStorage.setItem(
          TOPICS_STORAGE_KEY,
          JSON.stringify(nextTopics),
        );
        return nextTopics;
      });
    } catch (error) {
      console.error("Failed to load topics", error);
      setLoadError(`Unable to load topics for ${subject}.`);
    } finally {
      setIsLoadingTopics(false);
    }
  };

  const selectedSubjectCount = useMemo(
    () => new Set(selectedTopics.map(({ subject }) => subject)).size,
    [selectedTopics],
  );

  const hasNotes = notesText.trim().length > 0 || notesFile !== null;

  const notesSummary = useMemo(() => {
    if (notesFile && notesText.trim()) {
      return "File and text notes added";
    }
    if (notesFile) {
      return notesFile.name;
    }
    if (notesText.trim()) {
      return `${notesText.trim().length} characters of topic notes`;
    }
    return "No notes added yet";
  }, [notesFile, notesText]);

  const availableSubjects =
    technologies.length > 0 ? technologies : Object.keys(subjectTopics);
  const activeTopics = subjectTopics[activeSubject] ?? [];

  const hasTopic = (topic: string) =>
    selectedTopics.some(
      (item) => item.subject === activeSubject && item.topic === topic,
    );

  const toggleTopic = (topic: string) => {
    setIsGenerated(false);
    setSelectedTopics((current) => {
      const exists = current.some(
        (item) => item.subject === activeSubject && item.topic === topic,
      );
      return exists
        ? current.filter(
            (item) => item.subject !== activeSubject || item.topic !== topic,
          )
        : [...current, { subject: activeSubject, topic }];
    });
  };

  const removeTopic = (selection: SelectedTopic) => {
    setIsGenerated(false);
    setSelectedTopics((current) =>
      current.filter(
        (item) =>
          item.subject !== selection.subject || item.topic !== selection.topic,
      ),
    );
  };

  const selectFile = (file?: File) => {
    if (file) {
      setNotesFile(file);
      setIsGenerated(false);
      addNotification({
        title: "Notes uploaded",
        message: `${file.name} is ready to guide your quiz.`,
        tone: "success",
      });
    }
  };

  const currentStepLabel =
    wizardSteps.find((step) => step.id === activeStep)?.label ?? "STACK";
  const continueLabel = activeStep === 6 ? "Generate quiz" : "Continue";
  const backLabel = activeStep === 1 ? "Back" : "Go back";

  const goNext = async () => {
    setIsGenerated(false);

    if (activeStep < 6) {
      setActiveStep((value) => value + 1);
      if (activeStep === 5) {
        addNotification({
          title: "Quiz setup almost ready",
          message:
            "Review your selections and generate when you are happy with the plan.",
          tone: "info",
        });
      }
      return;
    }

    if (isGenerating) {
      return;
    }

    setIsGenerating(true);

    try {
      const topicsForActiveSubject = selectedTopics
        .filter((item) => item.subject === activeSubject)
        .map((item) => item.topic);

      const payload = {
        technology: activeSubject,
        topics:
          topicsForActiveSubject.length > 0
            ? topicsForActiveSubject
            : selectedTopics.map((item) => item.topic),
        difficulty,
        questionCount,
        notes: notesFile ?? (notesText.trim() ? notesText.trim() : undefined),
        notesFileName: notesFile?.name,
      };

      const result = await generateQuiz(payload);

      if (result.success) {
        setIsGenerated(true);
        addNotification({
          title: "Quiz generated",
          message:
            result.message ??
            `Your ${questionCount}-question quiz is ready to review.`,
          tone: "success",
        });
      } else {
        addNotification({
          title: "Quiz generation failed",
          message: result.message ?? "Unable to generate your quiz right now.",
          tone: "error",
        });
      }
    } catch (error) {
      console.error("Failed to generate quiz", error);
      addNotification({
        title: "Quiz generation failed",
        message: "Unable to generate your quiz right now.",
        tone: "error",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const goBack = () => {
    setIsGenerated(false);

    if (activeStep > 1) {
      setActiveStep((value) => value - 1);
    }
  };

  return (
    <main className="build-quiz-page">
      <section className="build-wizard shell">
        <header className="build-hero">
          <div className="build-kicker">
            <span /> QUIZ BUILDER
          </div>
          <h1>Build a quiz that&apos;s actually yours.</h1>
          <p>
            Pick your stack, choose the topics that matter, and set the
            difficulty. PrepAi generates a fresh set of MCQs on demand.
          </p>
        </header>

        <div className="build-progress">
          <p className="build-progress__mobile">
            Step {activeStep} of {wizardSteps.length}
            <span>{currentStepLabel}</span>
          </p>
          <nav className="build-stepper" aria-label="Quiz builder steps">
            {wizardSteps.map((step, index) => (
              <div
                className={
                  activeStep === step.id
                    ? "build-stepper__item is-active"
                    : activeStep > step.id
                      ? "build-stepper__item is-complete"
                      : "build-stepper__item"
                }
                key={step.id}
                aria-current={activeStep === step.id ? "step" : undefined}
              >
                <span>{step.id}</span>
                <small>{step.label}</small>
                {index < wizardSteps.length - 1 && <i aria-hidden="true" />}
              </div>
            ))}
          </nav>
          <div
            className="build-progress__bar"
            role="progressbar"
            aria-valuenow={activeStep}
            aria-valuemin={1}
            aria-valuemax={wizardSteps.length}
            aria-label={`Step ${activeStep} of ${wizardSteps.length}`}
          >
            <span
              style={{ width: `${(activeStep / wizardSteps.length) * 100}%` }}
            />
          </div>
        </div>

        <section className="build-board" aria-label="Quiz setup workspace">
          <div className="build-board__panel">
            <div className="build-board__panel-head">
              <div>
                <p>STEP {String(activeStep).padStart(2, "0")}</p>
                <h2>{currentStepLabel}</h2>
              </div>
              <span className="build-board__panel-state">
                {activeStep < 6 ? "BUILDING" : isGenerated ? "READY" : "REVIEW"}
              </span>
            </div>

            <div className="build-board__panel-body">
              {activeStep === 1 && (
                <div className="build-stack-grid" aria-label="Select a subject">
                  {isLoading ? (
                    <p>Loading technologies…</p>
                  ) : availableSubjects.length > 0 ? (
                    availableSubjects.map((subject, index) => {
                      const topicCount = selectedTopics.filter(
                        (item) => item.subject === subject,
                      ).length;

                      return (
                        <button
                          className={
                            activeSubject === subject
                              ? `build-stack-card is-active stack-${index}`
                              : "build-stack-card"
                          }
                          key={subject}
                          type="button"
                          onClick={() => {
                            void loadTopicsForSubject(subject);
                          }}
                        >
                          <span className="build-stack-card__mark">
                            {subject === ".NET"
                              ? ".N"
                              : subject.slice(0, 2).toUpperCase()}
                          </span>
                          <div>
                            <strong>{subject}</strong>
                            <small>
                              {techCounts[subject] ??
                                (subjectTopics[subject] ?? []).length}{" "}
                              topic areas
                            </small>
                          </div>
                          {topicCount > 0 && <b>{topicCount}</b>}
                        </button>
                      );
                    })
                  ) : (
                    <p>No technologies available yet.</p>
                  )}
                  {loadError && (
                    <p className="build-board__eyebrow">{loadError}</p>
                  )}
                </div>
              )}

              {activeStep === 2 && (
                <>
                  <div className="build-board__eyebrow">
                    <span>EXPLORE {activeSubject.toUpperCase()} TOPICS</span>
                    <span>Pick as many as you need</span>
                  </div>
                  <div className="build-topic-row">
                    {isLoadingTopics ? (
                      <p>Loading topics for {activeSubject}…</p>
                    ) : activeTopics.length > 0 ? (
                      activeTopics.map((topic) => (
                        <button
                          className={
                            hasTopic(topic)
                              ? "build-topic-chip is-selected"
                              : "build-topic-chip"
                          }
                          key={topic}
                          type="button"
                          onClick={() => toggleTopic(topic)}
                          aria-pressed={hasTopic(topic)}
                        >
                          <span>{hasTopic(topic) ? "✓" : "+"}</span>
                          {topic}
                        </button>
                      ))
                    ) : (
                      <p>No topics available for {activeSubject} yet.</p>
                    )}
                  </div>

                  {selectedTopics.length > 0 && (
                    <div className="build-selected-topics">
                      <span>Your mix</span>
                      <div>
                        {selectedTopics.map((selection) => (
                          <button
                            key={`${selection.subject}-${selection.topic}`}
                            type="button"
                            onClick={() => removeTopic(selection)}
                          >
                            <small>{selection.subject}</small> {selection.topic}{" "}
                            <b aria-label={`Remove ${selection.topic}`}>×</b>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeStep === 3 && (
                <>
                  <div className="build-board__eyebrow">
                    <span>How tough should it feel?</span>
                    <span>Pick one level</span>
                  </div>
                  <div className="build-choice-grid">
                    {difficulties.map((level) => (
                      <button
                        className={
                          difficulty === level.name
                            ? `build-choice-card is-selected tone-${level.tone}`
                            : `build-choice-card tone-${level.tone}`
                        }
                        key={level.name}
                        type="button"
                        onClick={() => {
                          setDifficulty(level.name);
                          setIsGenerated(false);
                        }}
                        aria-pressed={difficulty === level.name}
                      >
                        <span
                          className="build-choice-card__icon"
                          aria-hidden="true"
                        >
                          {level.name === "Foundation"
                            ? "○"
                            : level.name === "Confident"
                              ? "◈"
                              : "✦"}
                        </span>
                        <div className="build-choice-card__body">
                          <strong>{level.name}</strong>
                          <small>{level.detail}</small>
                        </div>
                        <span className="build-choice-card__badge">
                          {difficulty === level.name ? "Selected" : "Select"}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {activeStep === 4 && (
                <>
                  <div className="build-board__eyebrow">
                    <span>Quiz length</span>
                    <span>{questionCount} questions selected</span>
                  </div>
                  <div className="build-count-grid">
                    {questionCounts.map((option) => (
                      <button
                        className={
                          questionCount === option.value
                            ? "build-count-card is-selected"
                            : "build-count-card"
                        }
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setQuestionCount(option.value);
                          setIsGenerated(false);
                        }}
                        aria-pressed={questionCount === option.value}
                      >
                        <strong>{option.value}</strong>
                        <small>{option.label}</small>
                        <span>{option.time}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {activeStep === 5 && (
                <div className="build-notes">
                  <label className="build-notes__field">
                    <span>Type your topic or paste study notes</span>
                    <textarea
                      value={notesText}
                      placeholder="e.g. JWT refresh tokens, ASP.NET middleware pipeline, EF Core migrations, React useEffect cleanup..."
                      rows={6}
                      onChange={(event) => {
                        setNotesText(event.target.value);
                        setIsGenerated(false);
                      }}
                    />
                    <small>
                      {notesText.trim()
                        ? `${notesText.trim().length} characters · PrepAi will use this to shape your quiz`
                        : "Optional — add concepts, bullet points, or paragraphs you want covered"}
                    </small>
                  </label>

                  <div className="build-notes__divider">
                    <span>or upload a file</span>
                  </div>

                  <div
                    className={
                      isDragging
                        ? "build-dropzone is-dragging"
                        : notesFile
                          ? "build-dropzone has-file"
                          : "build-dropzone"
                    }
                    role="button"
                    tabIndex={0}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(event) =>
                      event.key === "Enter" && fileInputRef.current?.click()
                    }
                    onDragEnter={(event) => {
                      event.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragOver={(event) => event.preventDefault()}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(event: DragEvent<HTMLDivElement>) => {
                      event.preventDefault();
                      setIsDragging(false);
                      selectFile(event.dataTransfer.files[0]);
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        selectFile(event.target.files?.[0])
                      }
                    />
                    <span className="build-dropzone__icon">
                      {notesFile ? "✓" : "↑"}
                    </span>
                    {notesFile ? (
                      <div>
                        <strong>{notesFile.name}</strong>
                        <p>
                          {Math.max(1, Math.round(notesFile.size / 1024))} KB ·
                          Ready to use{" "}
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setNotesFile(null);
                              setIsGenerated(false);
                            }}
                          >
                            Remove
                          </button>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <strong>
                          Drop your notes here or <u>browse files</u>
                        </strong>
                        <p>PDF, DOCX, PPTX, or TXT · Up to 20MB</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeStep === 6 && (
                <div className="build-review-grid">
                  <div className="build-review-card">
                    <span>Subjects</span>
                    <strong>{selectedSubjectCount || "—"}</strong>
                    <small>
                      {selectedSubjectCount === 1
                        ? "subject selected"
                        : "subjects selected"}
                    </small>
                  </div>
                  <div className="build-review-card">
                    <span>Topics</span>
                    <strong>{selectedTopics.length || "—"}</strong>
                    <small>
                      {selectedTopics.length
                        ? "focus areas added"
                        : "choose your first topic"}
                    </small>
                  </div>
                  <div className="build-review-card">
                    <span>Difficulty</span>
                    <strong>{difficulty}</strong>
                    <small>Current question level</small>
                  </div>
                  <div className="build-review-card">
                    <span>Questions</span>
                    <strong>{questionCount}</strong>
                    <small>
                      Estimated time:{" "}
                      {Math.max(5, Math.ceil(questionCount * 1.3))} min
                    </small>
                  </div>
                  <div className="build-review-card">
                    <span>Notes</span>
                    <strong>{hasNotes ? "Added" : "—"}</strong>
                    <small>{notesSummary}</small>
                  </div>
                  <div className="build-review-summary">
                    <p>Ready to build</p>
                    <h3>
                      {questionCount}-question quiz across{" "}
                      {selectedTopics.length || 0} topics
                    </h3>
                    <span>{notesSummary}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="build-board__actions">
            <button
              className="build-board__back"
              type="button"
              onClick={goBack}
              disabled={activeStep === 1 || isGenerating}
            >
              <span aria-hidden="true">←</span> {backLabel}
            </button>
            <button
              className="build-board__continue"
              type="button"
              onClick={() => {
                void goNext();
              }}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="build-board__spinner" aria-hidden="true" />
                  {continueLabel}
                </>
              ) : (
                <>
                  {continueLabel} <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </div>
        </section>

        {isGenerated && (
          <div className="quiz-created" role="status">
            <span>✦</span>
            <div>
              <strong>Your {questionCount}-question quiz is ready.</strong>
              <p>
                {difficulty} questions across {selectedTopics.length} focus{" "}
                {selectedTopics.length === 1 ? "area" : "areas"}
                {hasNotes ? " with your custom notes" : ""} are queued up.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsGenerated(false)}
              aria-label="Dismiss quiz ready message"
            >
              ×
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default BuildQuizPage;
