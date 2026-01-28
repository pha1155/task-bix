import { useEffect, useRef, useState } from "react";
import IconDown from "@/assets/icon_down.svg";

interface Option<T> {
  value: T;
  label: string;
}

interface DropdownProps<T> {
  options: Option<T>[];
  value: T | null;
  onChange: (value: T) => void;
  className?: string;
  placeholderLabel?: string;
}

const Dropdown = <T,>({
  options,
  value,
  onChange,
  className,
  placeholderLabel = "선택하세요",
}: DropdownProps<T>) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);
  const isPlaceholder = !selectedOption;
  const label = selectedOption?.label ?? placeholderLabel;

  return (
    <div ref={containerRef} className={`relative inline-block w-full ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="border-gray focus:border-navy flex w-full items-center justify-between rounded-lg border bg-white p-4 text-left focus:outline-none"
      >
        <span className={`truncate ${isPlaceholder ? "text-gray" : "text-dark-gray"}`}>
          {label}
        </span>
        <img src={IconDown} alt="" aria-hidden />
      </button>

      {open && (
        <ul className="bottom-shadow absolute z-50 mt-2 w-full rounded-lg bg-white py-2">
          {options.map((opt) => (
            <li
              key={String(opt.value)}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="text-dark-gray hover:text-navy cursor-pointer px-4 py-2 hover:font-bold"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
