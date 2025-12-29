// src/hooks/useSpotify.ts
import { useState, useEffect } from 'react';
import { CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, SCOPES } from '../config';

export const useSpotify = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = window.localStorage.getItem("spotify_token");

    // 处理从 Spotify 回调回来的 Token
    if (!storedToken && hash) {
      // 解析 URL hash
      const params = new URLSearchParams(hash.substring(1)); // 去掉 #
      storedToken = params.get("access_token");

      if (storedToken) {
        window.location.hash = ""; // 清理 URL
        window.localStorage.setItem("spotify_token", storedToken);
      }
    }

    setToken(storedToken);
  }, []);

  const login = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPES.join("%20")}&show_dialog=true`;
  };

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("spotify_token");
  };

  return { token, login, logout };
};
