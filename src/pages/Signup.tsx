// 회원가입 페이지

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "@/api/auth.api";
import type { SignupRequest } from "@/types/auth";
import Title from "@/components/common/Title";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import IconClose from "@/assets/icon_close.svg";
import Modal from "@/components/common/Modal";

type FormValues = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

// 8자 이상, 숫자, 영문자, 특수문자(!%*#?&) 1개 이상의 조합
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!@%*#?&]{8,}$/;

const Signup = ({}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({ mode: "onChange" });

  const onCancel = () => {
    setIsModalOpen(false);
    navigate("/signin");
  };

  const onSubmit = async (data: FormValues) => {
    const request: SignupRequest = {
      username: data.email,
      name: data.nickname,
      password: data.password,
      confirmPassword: data.passwordConfirm,
    };

    try {
      await signup(request);
      navigate("/signin");
      toast.success("회원가입이 완료되었습니다.");
    } catch (error) {
      toast.error("회원가입에 실패했습니다.");
    }
  };

  return (
    <main className="auth-main">
      <div className="auth-wrap md:box-shadow">
        <div className="mb-15 flex justify-between">
          <Title title="회원가입" />
          <button onClick={() => setIsModalOpen(true)}>
            <img src={IconClose} alt="닫기" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="auth-list">
            <li>
              <Input
                label="아이디"
                type="email"
                placeholder="아이디(이메일)를 입력해주세요."
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
                label="닉네임"
                type="text"
                placeholder="닉네임을 입력해주세요."
                error={!!errors.nickname}
                {...register("nickname", {
                  required: "닉네임을 입력해주세요.",
                })}
              />
              {errors.nickname && <p className="error">{errors.nickname.message}</p>}
            </li>
            <li>
              <Input
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                error={!!errors.password}
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  pattern: {
                    value: PASSWORD_REGEX,
                    message: "8자 이상의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
                  },
                })}
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
              <Input
                type="password"
                placeholder="비밀번호 확인을 입력해주세요."
                className="mt-3"
                error={!!errors.passwordConfirm}
                {...register("passwordConfirm", {
                  required: "비밀번호 확인을 입력해주세요.",
                  validate: (value, formValues) =>
                    value === formValues.password || "비밀번호가 일치하지 않습니다.",
                })}
              />
              {errors.passwordConfirm && <p className="error">{errors.passwordConfirm.message}</p>}
            </li>
          </ul>
          <Button type="submit" fullWidth disabled={!isValid || isSubmitting}>
            {isSubmitting ? "가입 중..." : "가입하기"}
          </Button>
        </form>
      </div>

      {isModalOpen && (
        <Modal
          title="가입을 취소하시겠습니까?"
          description="작성중이던 내용은 저장되지 않습니다."
          onClose={() => setIsModalOpen(false)}
          action={<Button onClick={onCancel}>가입취소</Button>}
        />
      )}
    </main>
  );
};

export default Signup;
