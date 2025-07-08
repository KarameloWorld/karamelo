export const useAuth = () => {
  const isAuthenticated = () => {
    return localStorage.getItem("isBarLoggedIn") === "true";
  };

  const getUserEmail = () => {
    return localStorage.getItem("barEmail");
  };

  const logout = () => {
    localStorage.removeItem("isBarLoggedIn");
    localStorage.removeItem("barEmail");
    window.location.href = "/";
  };

  return {
    isAuthenticated,
    getUserEmail,
    logout,
  };
};
