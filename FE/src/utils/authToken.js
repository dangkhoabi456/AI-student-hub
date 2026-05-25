export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function clearAccessToken() {
  localStorage.removeItem("accessToken");
}

export function isTokenValid(token) {
  if (!token) {
    return false;
  }

  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) {
      return false;
    }

    const normalizePayload = payloadBase64
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const payloadJson = atob(normalizePayload);
    const payload = JSON.parse(payloadJson);

    if (!payload.exp) {
      return false;
    }

    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
export function isLoggedIn() {
  const token = getAccessToken();

  if (!isTokenValid(token)) {
    clearAccessToken();
    return false;
  }
  return true;
}
