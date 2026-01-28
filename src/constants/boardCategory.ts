import type { BoardCategory } from "@/types/board";

// 카테고리 네이밍
export interface BoardCategoryOption {
  value: BoardCategory;
  label: string;
}

export const BOARD_CATEGORY_OPTIONS: BoardCategoryOption[] = [
  { value: "NOTICE", label: "공지" },
  { value: "FREE", label: "자유" },
  { value: "QNA", label: "Q&A" },
  { value: "ETC", label: "기타" },
];

// 카테고리 색상
const BOARD_CATEGORY_CLASS: Record<BoardCategory, string> = {
  NOTICE: "text-orange before:bg-orange",
  FREE: "text-mint before:bg-mint",
  QNA: "text-purple before:bg-purple",
  ETC: "text-green before:bg-green",
};

export const getBoardCategoryClass = (category: BoardCategory) => BOARD_CATEGORY_CLASS[category];
