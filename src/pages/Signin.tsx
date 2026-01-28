// 로그인 페이지

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { signin } from "@/api/auth.api";
import { useAuthStore } from "@/stores/useAuthStore";
import Title from "@/components/common/Title";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import type { JwtPayload } from "@/types/auth";

type SigninFormValues = {
  email: string;
  password: string;
};

const Signin = () => {
  const navigate = useNavigate();
  const { setTokens, setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    clearAuth();
  }, []);

  useEffect(() => {
    const log = localStorage.getItem("auth-error-log");

    if (log) {
      localStorage.removeItem("auth-error-log");
    }
  }, []);

  useEffect(() => {
    const message = localStorage.getItem("auth-message");

    if (message) {
      toast.info(message);
      localStorage.removeItem("auth-message");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm<SigninFormValues>({
    mode: "onChange",
  });

  const onSubmit = async (data: SigninFormValues) => {
    try {
      // 로그인 요청
      const result = await signin({
        username: data.email,
        password: data.password,
      });
      const decoded = jwtDecode<JwtPayload>(result.accessToken);

      // store에 저장
      setTokens(result.accessToken, result.refreshToken);
      setUser({
        username: decoded.username,
        name: decoded.name,
      });
      navigate("/", { replace: true });
    } catch (error) {
      const message = "잘못된 계정 혹은 비밀번호를 입력하였습니다.";

      setError("email", {
        type: "server",
      });

      setError("password", {
        type: "server",
        message,
      });
    }
  };

  return (
    <main className="auth-main">
      <div className="auth-wrap md:box-shadow">
        <Title className="mb-15" title="로그인" />
        <form onSubmit={handleSubmit(onSubmit)} className="mb-15">
          <ul className="auth-list">
            <li>
              <Input
                type="email"
                placeholder="Email"
                variant="line"
                error={!!errors.email}
                {...register("email", {
                  required: "아이디(이메일)를 입력해주세요.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "이메일 양식에 맞게 입력해주세요.",
                  },
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </li>
            <li>
              <Input
                type="password"
                placeholder="password"
                variant="line"
                error={!!errors.password}
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                })}
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
            </li>
          </ul>
          <Button type="submit" fullWidth disabled={!isValid || isSubmitting}>
            {isSubmitting ? "로그인 중..." : "로그인"}
          </Button>
        </form>
        <div className="text-center">
          <Link to="/signup" className="text-navy font-bold">
            회원가입
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Signin;
