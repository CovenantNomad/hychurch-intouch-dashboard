import axios from "axios";

const getAccessToken = (): string => {
  if (typeof window === "undefined") return ""; // SSR 방어

  const raw = localStorage.getItem("intouch_dashboard_access_token");
  if (!raw) throw new Error("로그인이 필요합니다.");

  const parsed = JSON.parse(raw) as {accessToken?: string};
  if (!parsed.accessToken) throw new Error("accessToken이 없습니다.");

  return parsed.accessToken;
};

export const restClient = axios.create({
  baseURL: "/api/users", // ✅ next.config rewrites 기준
  responseType: "blob", // ✅ 파일 다운로드는 blob
});

restClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `${token}`;
  }
  return config;
});
