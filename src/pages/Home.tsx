// Home 게시글 목록 페이지

import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getBoardList, getBoardCategories } from "@/api/board.api";
import type { BoardListResponse, BoardCategory } from "@/types/board";
import Title from "@/components/common/Title";
import Button from "@/components/common/Button";
import Pagination from "@/components/common/Pagination";
import BoardItem from "@/components/board/BoardItem";
import TabMenu from "@/components/common/TabMenu";
import type { CategoryTab } from "@/components/common/TabMenu";

type CategoryMap = Record<BoardCategory, string>;

const isBoardCategory = (value: any): value is BoardCategory => {
  return ["NOTICE", "FREE", "QNA", "ETC"].includes(value);
};

const Home = () => {
  const location = useLocation();
  const [boardList, setBoardList] = useState<BoardListResponse | null>(null);
  const [categoryLabels, setCategoryLabels] = useState<CategoryMap | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const page = Number(searchParams.get("page") ?? 0);
  const size = 10;
  const categoryParam = searchParams.get("category");
  const category: CategoryTab =
    categoryParam === "ALL" ? "ALL" : isBoardCategory(categoryParam) ? categoryParam : "ALL";

  const filtered = useMemo(() => {
    if (!boardList) return [];

    return category === "ALL"
      ? boardList.content
      : boardList.content.filter((item) => item.category === category);
  }, [boardList, category]);

  // TabMenu 카운트 계산
  const counts = useMemo(() => {
    const result: Record<CategoryTab, number> = {
      ALL: boardList?.content.length ?? 0,
      NOTICE: 0,
      FREE: 0,
      QNA: 0,
      ETC: 0,
    };

    boardList?.content.forEach((item) => {
      result[item.category] += 1;
    });

    return result;
  }, [boardList]);

  const totalPages = useMemo(() => Math.ceil(filtered.length / size), [filtered.length]);
  const paginated = useMemo(
    () => filtered.slice(page * size, page * size + size),
    [filtered, page, size],
  );

  useEffect(() => {
    const fetchBoardList = async () => {
      setLoading(true);
      try {
        const response = await getBoardList({ page: 0, size: 99999 });
        setBoardList(response);
      } catch (error) {
        console.error("게시글 목록 조회에 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardList();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getBoardCategories();
        setCategoryLabels(categories);
      } catch (error) {
        console.error("카테고리 조회에 실패했습니다.", error);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!boardList) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <>
      <div className="mb-5 flex justify-between">
        <Title title="등록된 게시글" />
        <Button as="a" href="/boards">
          등록하기
        </Button>
      </div>
      <TabMenu
        category={category}
        counts={counts}
        onChange={(newCategory) => setSearchParams({ page: "0", category: newCategory })}
      />
      {paginated.length === 0 ? (
        <div className="text-dark-gray pt-5">등록된 게시글이 없습니다.</div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {paginated.map((item) => (
            <BoardItem
              key={item.id}
              id={item.id}
              title={item.title}
              category={item.category}
              createdAt={item.createdAt}
              categoryLabel={categoryLabels?.[item.category]}
              from={location.pathname + location.search}
            />
          ))}
        </ul>
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(newPage) => setSearchParams({ page: newPage.toString(), category })}
      />
    </>
  );
};

export default Home;
