import { useEffect, useState } from "react";
import BarLogin from "./components/business/login";
import Dashboard from "./components/business/dashboard";
import AddSongForm from "./components/business/add-song-form";
import ParticipantQueue from "./components/business/participant-queue";
import ParticipantRegistration from "./components/business/participant-registration";
import { useAuth } from "./components/auth";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handlePopstate = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  // Redirection automatique si authentifié et sur la page de login
  useEffect(() => {
    if (isAuthenticated() && currentRoute === "/") {
      window.history.pushState({}, "", "/");
      setCurrentRoute("/");
    }
  }, [isAuthenticated, currentRoute]);

  // Protection des routes
  const renderRoute = () => {
    if (!isAuthenticated() && currentRoute !== "/") {
      return <BarLogin />;
    }

    switch (currentRoute) {
      case "/":
        return isAuthenticated() ? <Dashboard /> : <BarLogin />;
      case "/add-song":
        return (
          <AddSongForm
            onClose={() => {
              window.history.pushState({}, "", "/");
              setCurrentRoute("/");
            }}
          />
        );
      case "/participant-queue":
        return <ParticipantQueue />;
      case "/register":
        return <ParticipantRegistration />;
      default:
        return <Dashboard />;
    }
  };

  return renderRoute();
}
