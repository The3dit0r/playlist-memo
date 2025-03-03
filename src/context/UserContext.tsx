import { createContext, useState, useRef, useEffect } from "react";

import { getLocalAccessToken, saveAccessToken } from "@utils/internal";
import { SpotifyAPI } from "@utils/request";

type UserCtxType = {
  loginWithToken(token: string, expiresIn: number): Promise<void>;
  isLoggedIn(): boolean;

  profile: SpotifyApi.CurrentUsersProfileResponse | null;
  profileB64: string | null;
};

export const UserContext = createContext<UserCtxType | null>(null);

type Props = { children: React.ReactNode };

export function UserDataProvider({ children }: Props) {
  const [profile, setProfile] = useState<UserCtxType["profile"]>(null);
  const [profileB64, setProfileB64] = useState<string | null>(null);

  const isLoggingIn = useRef(false);

  useEffect(() => {
    const token = getLocalAccessToken();
    setProfileB64(token);
  }, [profile]);

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

  const value = { loginWithToken, isLoggedIn, profile, profileB64 };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
