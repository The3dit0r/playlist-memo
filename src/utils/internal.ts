enum LS_KEY {
  USER_TOKEN = "__ac_token",
  USER_TOKEN_EXP = "__ac_token_age",
}

export function saveAccessToken(token: string, expires_in: number) {
  const now = new Date().getTime();
  const expiresAt = now + expires_in * 1_000;

  window.localStorage.setItem(LS_KEY.USER_TOKEN, token);
  window.localStorage.setItem(LS_KEY.USER_TOKEN_EXP, expiresAt + "");
}

export function removeAccessToken() {
  window.localStorage.removeItem(LS_KEY.USER_TOKEN);
  window.localStorage.removeItem(LS_KEY.USER_TOKEN_EXP);
}

export function getLocalAccessToken() {
  const token = window.localStorage.getItem(LS_KEY.USER_TOKEN);
  const expires = window.localStorage.getItem(LS_KEY.USER_TOKEN_EXP);
  const now = new Date().getTime();

  const expiresAt = Number.parseInt(expires || "NaN");

  if (Number.isNaN(expiresAt)) {
    console.log("Invalid token expiration time");
    removeAccessToken();
    return null;
  }

  if (now > expiresAt) {
    console.log("Token expires");

    removeAccessToken();
    return null;
  }

  return token;
}

export function wait(ms = 1000) {
  return new Promise((res) => setTimeout(res, ms, ms));
}
