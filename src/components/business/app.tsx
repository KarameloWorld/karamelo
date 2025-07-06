import { useEffect, useState } from "react";
import Login from "./login";
import Dashboard from "./dashboard";
import AddSongForm from "./add-song-form";
import { useAuth } from "../auth";

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
      window.history.pushState({}, "", "/dashboard");
      setCurrentRoute("/dashboard");
    }
  }, [isAuthenticated, currentRoute]);

  // Protection des routes
  const renderRoute = () => {
    if (!isAuthenticated() && currentRoute !== "/") {
      return <Login />;
    }

    switch (currentRoute) {
      case "/":
        return isAuthenticated() ? <Dashboard /> : <Login />;
      case "/dashboard":
        return <Dashboard />;
      case "/add-song":
        return (
          <AddSongForm
            onClose={() => {
              window.history.pushState({}, "", "/dashboard");
              setCurrentRoute("/dashboard");
            }}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return renderRoute();
}
