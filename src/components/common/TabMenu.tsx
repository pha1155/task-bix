import type { BoardCategory } from "@/types/board";
import { BOARD_CATEGORY_OPTIONS } from "@/constants/boardCategory";

export type CategoryTab = "ALL" | BoardCategory;

interface TabMenuProps {
  category: CategoryTab;
  counts: Record<CategoryTab, number>;
  onChange: (category: CategoryTab) => void;
}

const tabs: { value: CategoryTab; label: string }[] = [
  { value: "ALL", label: "전체" },
  ...BOARD_CATEGORY_OPTIONS,
];

const TabMenu = ({ category, counts, onChange }: TabMenuProps) => {
  return (
    <ul className="mb-6 flex overflow-x-auto whitespace-nowrap">
      {tabs.map(({ value, label }) => {
        const isActive = category === value;

        return (
          <li key={value}>
            <button
              type="button"
              onClick={() => onChange(value)}
              className={`px-5 py-2.5 ${
                isActive ? "bg-navy rounded-full font-bold text-white" : "text-navy"
              }`}
            >
              {label} {counts[value] ?? 0}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TabMenu;
