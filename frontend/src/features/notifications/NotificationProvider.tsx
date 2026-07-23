import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import "../../styles/components/notifications.css";

export type NotificationTone = "success" | "error" | "info";

export interface AppNotification {
  id: number;
  title: string;
  message?: string;
  tone: NotificationTone;
  duration?: number;
}

interface NotificationContextValue {
  addNotification: (notification: Omit<AppNotification, "id">) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined,
);

function NotificationViewport({
  notifications,
  onClose,
}: {
  notifications: AppNotification[];
  onClose: (id: number) => void;
}) {
  if (!notifications.length) {
    return null;
  }

  return (
    <div
      className="app-notification-stack"
      aria-live="polite"
      aria-atomic="true"
    >
      {notifications.map((notification) => (
        <article
          key={notification.id}
          className={`app-notification app-notification--${notification.tone}`}
          role="status"
        >
          <div className="app-notification__marker" aria-hidden="true" />
          <div className="app-notification__content">
            <strong>{notification.title}</strong>
            {notification.message ? <p>{notification.message}</p> : null}
          </div>
          <button
            type="button"
            className="app-notification__close"
            onClick={() => onClose(notification.id)}
            aria-label={`Dismiss ${notification.title}`}
          >
            ×
          </button>
        </article>
      ))}
    </div>
  );
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const removeNotification = useCallback((id: number) => {
    setNotifications((current) => current.filter((item) => item.id !== id));
  }, []);

  const addNotification = useCallback(
    (notification: Omit<AppNotification, "id">) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setNotifications((current) => [
        ...current,
        {
          id,
          duration: notification.duration ?? 4000,
          ...notification,
        },
      ]);

      window.setTimeout(
        () => removeNotification(id),
        notification.duration ?? 4000,
      );
    },
    [removeNotification],
  );

  const value = useMemo<NotificationContextValue>(
    () => ({ addNotification, removeNotification }),
    [addNotification, removeNotification],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationViewport
        notifications={notifications}
        onClose={removeNotification}
      />
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside a NotificationProvider",
    );
  }

  return context;
}
