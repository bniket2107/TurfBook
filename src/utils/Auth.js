const AUTH_KEY = "tb_user";

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
  } catch {
    return null;
  }
}

export function setUser(u) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(u));
}

export function getRole() {
  return getUser()?.role || null;
}

export function getToken() {
  return !!getUser();
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = "/"; // Redirect to home after logout
}
