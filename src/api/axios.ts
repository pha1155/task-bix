import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { AuthState, AuthStorage } from "@/types/auth";
import { refreshToken } from "@/api/auth.api";

// Axios 인스턴스 생성 (기본 API URL 설정)
const api = axios.create({
  baseURL: "/api",
});

// 로컬 스토리지 키
const AUTH_STORAGE_KEY = "auth-storage"; // 인증 상태 저장
const AUTH_MESSAGE_KEY = "auth-message"; // 인증 관련 메시지
const AUTH_ERROR_LOG_KEY = "auth-error-log"; // 인증 에러 로그

// 초기 인증 상태
const emptyAuthState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const getAuthStorage = (): AuthStorage => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : { state: emptyAuthState };
  } catch {
    return { state: emptyAuthState };
  }
};

const setAuthStorage = (storage: AuthStorage) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(storage));
};

const clearAuthStorage = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

const getAccessToken = () => getAuthStorage().state.accessToken;
const getRefreshToken = () => getAuthStorage().state.refreshToken;

const setAuthMessage = (message: string) => {
  localStorage.setItem(AUTH_MESSAGE_KEY, message);
};

const setAuthErrorLog = (log: Record<string, unknown>) => {
  localStorage.setItem(
    AUTH_ERROR_LOG_KEY,
    JSON.stringify({
      time: new Date().toISOString(),
      ...log,
    }),
  );
};

// 로그인 페이지로 리다이렉트
const redirectToSignin = (message?: string) => {
  if (message) {
    setAuthMessage(message);
  }
  clearAuthStorage();
  window.location.href = "/signin";
};

// Axios 요청 인터셉터 (토큰 자동 삽입)
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!config.url?.includes("/auth")) {
    const token = getAccessToken();

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
  }

  // FormData 요청 시 Content-Type 제거 (브라우저가 자동 설정)
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

// Axios 응답 인터셉터 (401 처리 및 토큰 갱신)
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // 401 Unauthorized 처리: 토큰 만료
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true; // 무한 재시도 방지

      const storedRefreshToken = getRefreshToken();

      if (!storedRefreshToken) {
        setAuthErrorLog({
          reason: "No refresh token",
          status: error.response.status,
          data: error.response.data,
        });

        redirectToSignin("세션이 만료되었습니다. 다시 로그인해주세요.");
        return Promise.reject(error);
      }

      try {
        // 리프레시 토큰으로 새로운 AccessToken 발급
        const response = await refreshToken({ refreshToken: storedRefreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response;
        const storage = getAuthStorage();

        storage.state = {
          ...storage.state,
          accessToken,
          refreshToken: newRefreshToken,
        };

        setAuthStorage(storage);

        // 원래 요청 재시도
        originalRequest.headers.authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (error: any) {
        setAuthErrorLog({
          reason: "Refresh failed",
          status: error.response?.status,
          data: error.response?.data,
        });

        redirectToSignin("세션이 만료되었습니다. 다시 로그인해주세요.");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
