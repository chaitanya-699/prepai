import { AuthProvider } from "../features/auth/context/AuthProvider";
import { NotificationProvider } from "../features/notifications/NotificationProvider";
import { AppRouter } from "./router/AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppRouter />
      </NotificationProvider>
    </AuthProvider>
  );
}
