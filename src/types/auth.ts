import type { User } from "@/types/user";

// 회원가입
export interface SignupRequest {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}

// 로그인 요청
export interface SigninRequest {
  username: string;
  password: string;
}

// 로그인 응답
export interface SigninResponse {
  accessToken: string;
  refreshToken: string;
}

// 리프래시
export interface RefreshRequest {
  refreshToken: string;
}

// 토큰에 들어있는 정보
export interface JwtPayload {
  username: string;
  name: string;
}

// 인증 상태
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

// localStorage에 저장되는 auth
export interface AuthStorage {
  state: AuthState;
}
