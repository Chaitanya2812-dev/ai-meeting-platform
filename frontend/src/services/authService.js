import api from "./api";

/**
 * Register a new user.
 * POST /api/auth/register
 * Body: { name, email, password }
 * Returns: { token, user: { id, name, email } }
 */
const register = async (name, email, password) => {
  const res = await api.post("/auth/register", { name, email, password });
  const { token, user } = res.data;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return { token, user };
};

/**
 * Login an existing user.
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { token, user: { id, name, email } }
 */
const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  const { token, user } = res.data;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return { token, user };
};

/**
 * Get current logged-in user.
 * GET /api/auth/me (requires JWT)
 */
const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

/**
 * Logout — clear localStorage.
 */
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * Check if user is authenticated.
 */
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

/**
 * Get stored user from localStorage.
 */
const getStoredUser = () => {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
};

export default { register, login, logout, getMe, isAuthenticated, getStoredUser };
