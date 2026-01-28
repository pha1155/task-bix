interface PaginationProps {
  page: number; // 0 base
  totalPages: number;
  onChange: (page: number) => void;
}

interface PaginationArrowProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
  direction: "prev" | "next";
}

const PaginationArrow = ({ label, disabled, onClick, direction }: PaginationArrowProps) => {
  const arrowClass =
    direction === "prev"
      ? "before:inline-block before:h-2.5 before:w-2.5 before:rotate-45 before:border-b-2 before:border-l-2 before:border-current"
      : "after:inline-block after:h-2.5 after:w-2.5 after:rotate-45 after:border-t-2 after:border-r-2 after:border-current";

  return (
    <li className="hidden md:block">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={["text-navy disabled:text-gray py-2 disabled:cursor-default", arrowClass].join(
          " ",
        )}
      >
        {label}
      </button>
    </li>
  );
};

const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  if (totalPages <= 0) return null;

  const isFirst = page === 0;
  const isLast = page === totalPages - 1;
  const pages = Array.from({ length: totalPages }, (_, i) => i);
  const showPrevNext = totalPages > 1;

  return (
    <nav aria-label="페이지네이션" className="my-10 flex justify-center">
      <ul className="flex items-center gap-2">
        {showPrevNext && (
          <PaginationArrow
            label="이전"
            disabled={isFirst}
            onClick={() => onChange(page - 1)}
            direction="prev"
          />
        )}

        {pages.map((idx) => {
          const isActive = idx === page;

          return (
            <li key={idx}>
              <button
                type="button"
                onClick={() => onChange(idx)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "size-10 rounded",
                  isActive ? "bg-navy font-bold text-white" : "text-dark-gray hover:bg-gray-100",
                ].join(" ")}
              >
                {idx + 1}
              </button>
            </li>
          );
        })}

        {showPrevNext && (
          <PaginationArrow
            label="다음"
            disabled={isLast}
            onClick={() => onChange(page + 1)}
            direction="next"
          />
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
