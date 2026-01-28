import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";

type InputVariant = "default" | "line";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: InputVariant;
  error?: boolean;
}

const BASE_INPUT_STYLES = "w-full outline-none text-dark-gray placeholder-gray border-gray";
const VARIANT_STYLES: Record<InputVariant, string> = {
  default: "p-4 border rounded-lg focus:border-navy",
  line: "pb-2.5 border-b focus:border-b-2 focus:border-navy",
};
const DISABLED_STYLES = "cursor-not-allowed opacity-50";
const ERROR_STYLES = "border-red text-red focus:border-red";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, variant = "default", id, className, disabled, error, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const inputClassName = [
      BASE_INPUT_STYLES,
      VARIANT_STYLES[variant],
      error && ERROR_STYLES,
      disabled && DISABLED_STYLES,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <>
        {label && (
          <label htmlFor={inputId} className="text-dark-gray mb-3 block text-lg">
            {label}
          </label>
        )}

        <input ref={ref} id={inputId} disabled={disabled} className={inputClassName} {...props} />
      </>
    );
  },
);

Input.displayName = "Input";

export default Input;
