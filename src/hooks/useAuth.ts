const useAuth = () => {
  const token = localStorage.getItem("token");
  return {
    isAuthenticated: !!token,
    token,
  };
};

export const isLoggedIn = () => localStorage.getItem("token") !== null;

export default useAuth;
