import { Link } from "react-router-dom";
import type { BoardCategory } from "@/types/board";
import { getBoardCategoryClass } from "@/constants/boardCategory";
import { formatDate } from "@/utils/formatDate";

interface BoardItemProps {
  id: number;
  title: string;
  category: BoardCategory;
  createdAt: string;
  categoryLabel?: string;
  from: string;
}

const BoardItem = ({ id, title, category, createdAt, categoryLabel, from }: BoardItemProps) => {
  return (
    <li className="border-gray rounded-lg border bg-white md:border-0">
      <Link to={`/boards/${id}`} state={{ from }} className="block p-5">
        {categoryLabel && (
          <span
            className={`relative mb-3 block pl-3.5 text-sm font-bold before:absolute before:top-1/2 before:left-0 before:h-2.5 before:w-2.5 before:-translate-y-1/2 before:rounded-full before:content-[''] ${getBoardCategoryClass(category)} `}
          >
            {categoryLabel}
          </span>
        )}
        <h2 className="text-dark-gray mb-3 line-clamp-2 min-h-12 font-bold">{title}</h2>
        <span className="text-gray">{formatDate(createdAt)}</span>
      </Link>
    </li>
  );
};

export default BoardItem;
