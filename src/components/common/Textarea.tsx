import React from "react";

type TextareaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  rows?: number;
};

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder,
  required = false,
  className,
  rows = 6,
}) => {
  return (
    <textarea
      className={`border-gray text-dark-gray placeholder-gray focus:border-navy w-full rounded-lg border p-4 focus:outline-none ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
    />
  );
};

export default Textarea;
