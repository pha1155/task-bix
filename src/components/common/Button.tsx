import React, { type PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonAs = "button" | "a";

interface CommonProps {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  as?: ButtonAs;
}

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type ButtonAsAnchor = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
  };

type ButtonProps = PropsWithChildren<ButtonAsButton | ButtonAsAnchor>;

const BASE_STYLES = "rounded-lg px-5 py-2.5";
const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-navy text-white font-bold",
  secondary: "bg-white text-navy border border-navy",
};
const DISABLED_STYLES = "disabled:cursor-not-allowed disabled:bg-light-gray";
const FULL_WIDTH_STYLES = "w-full py-4 text-xl";

const buildButtonClassName = ({
  variant,
  fullWidth,
  className,
}: {
  variant: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
}) =>
  [BASE_STYLES, VARIANT_STYLES[variant], DISABLED_STYLES, fullWidth && FULL_WIDTH_STYLES, className]
    .filter(Boolean)
    .join(" ");

const Button = ({
  as = "button",
  variant = "primary",
  fullWidth = false,
  disabled = false,
  className,
  children,
  ...rest
}: ButtonProps) => {
  const styles = buildButtonClassName({
    variant,
    fullWidth,
    className,
  });

  if (as === "a") {
    const { href, ...anchorProps } = rest as ButtonAsAnchor;

    return (
      <a
        {...anchorProps}
        href={disabled ? undefined : href}
        aria-disabled={disabled}
        className={styles}
      >
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonAsButton;

  return (
    <button {...buttonProps} className={styles} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
