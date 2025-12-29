// src/config.ts
export const CLIENT_ID = "4be054489dd84fb092a85cdcab057c5e"; // 去 Spotify Dashboard 获取
export const REDIRECT_URI = window.location.origin + "/repo-name/"; // 替换 repo-name 为你的仓库名，如果是根域名则去掉
export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
export const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
];
