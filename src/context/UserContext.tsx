import { useContext, createContext, useState, useRef } from "react";
import { SpotifyAPI } from "../utils/request";
import { saveAccessToken } from "../utils/internal";

type UserCtxType = {
  loginWithToken(token: string, expiresIn: number): Promise<void>;
  isLoggedIn(): boolean;

  profile: SpotifyApi.CurrentUsersProfileResponse | null;
};

const UserContext = createContext<UserCtxType | null>(null);

type Props = { children: React.ReactNode };

export function UserDataProvider({ children }: Props) {
  const [profile, setProfile] = useState<UserCtxType["profile"]>(null);
  const isLoggingIn = useRef(false);

  async function loginWithToken(token: string, expiresIn = 0) {
    SpotifyAPI.setAccessToken(token);

    isLoggingIn.current = true;

    try {
      const data = await SpotifyAPI.getMe();
      setProfile(data.body);

      if (expiresIn) {
        saveAccessToken(token, expiresIn);
      }
    } catch {
      setProfile(null);
    }

    isLoggingIn.current = false;
  }

  function isLoggedIn() {
    return !!profile;
  }

  const value = { loginWithToken, isLoggedIn, profile };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserData() {
  const data = useContext(UserContext);

  if (!data) {
    throw new Error("useUserData must be used within it's context provider");
  }

  return data;
}
