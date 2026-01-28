import api from "@/api/axios";
import type { SignupRequest, SigninRequest, SigninResponse, RefreshRequest } from "@/types/auth";

// 회원가입
export const signup = async (data: SignupRequest): Promise<void> => {
  await api.post("/auth/signup", data);
};

// 로그인
export const signin = async (data: SigninRequest): Promise<SigninResponse> => {
  const response = await api.post<SigninResponse>("/auth/signin", data);
  return response.data;
};

// 리프래시
export const refreshToken = async (data: RefreshRequest): Promise<SigninResponse> => {
  const response = await api.post<SigninResponse>("/auth/refresh", data);
  return response.data;
};
