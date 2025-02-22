import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useUserData } from "./context/UserContext";

import { parseParameter } from "./utils/parser";
import { getLocalAccessToken } from "./utils/internal";

type Props = {};

export default function AppLoginPanel({}: Props) {
  const { hash, pathname } = useLocation();
  const user = useUserData();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hash.length < 3) return;

    if (pathname !== "/login") {
      return;
    }

    let token = "",
      expires = 0;

    const obj = parseParameter(hash.slice(1));
    if (obj.access_token) {
      token = obj.access_token;
      expires = parseInt(obj.expires_in) || 0;

      window.location.hash = "";
    }

    async function load() {
      if (!token) return;

      console.log("Login with:", token);

      setLoading(true);
      await user.loginWithToken(token, expires);
      setLoading(false);
    }

    load();
  }, [pathname, hash]);

  useEffect(() => {
    const token = getLocalAccessToken();

    async function login() {
      if (!token) return;

      setLoading(true);
      await user.loginWithToken(token, 0);
      setLoading(false);
    }

    login();
  }, []);

  if (loading) {
    return <div className="app-wrapper flex aictr jcctr">Loading . . .</div>;
  }

  return (
    <div className="app-wrapper usn">
      <div
        style={{
          backgroundColor: "var(--cprim)",
          borderRadius: "var(--full-bdrd)",
          height: "100%",
          width: "100%",
        }}
        className="flex aictr jcctr coll"
      >
        <h3>Login to start using the app</h3>
        <SpotifyFullLogo />
        <LoginWithSpotify />
      </div>
    </div>
  );
}

function SpotifyFullLogo() {
  return (
    <img
      style={{ padding: 32 }}
      src={window.location.origin + "/logo/spotify_full_white.png"}
      width={300}
    />
  );
}

function LoginWithSpotify() {
  const redirectUrl = window.location.origin + "/login";

  let urlLogin = "https://accounts.spotify.com/authorize?";
  urlLogin += "client_id=be82fc9b81e249e7bf8cd83bd1f76fcf&";
  urlLogin += "response_type=token&";
  urlLogin += "show_dialog=true&";
  urlLogin += `redirect_uri=${redirectUrl}&`;
  urlLogin += "scope=user-library-read playlist-read-private user-follow-read";

  return (
    <Link to={urlLogin}>
      <button
        style={{
          padding: "12px 46px",
          backgroundColor: "#1ed760",
          color: "#000",
          fontFamily: "inherit",
          fontSize: "inherit",
          fontWeight: 700,
          borderRadius: 100,

          ...({ "--s": 0.98 } as any),
        }}
        className="clickable"
      >
        Login with Spotify
      </button>
    </Link>
  );
}
