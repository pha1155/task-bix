// 글 수정 페이지

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BoardForm from "@/components/board/BoardForm";
import { getBoard, updateBoard } from "@/api/board.api";
import type { Board } from "@/types/board";

const BoardEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    if (!id) return;

    getBoard(Number(id)).then(setBoard);
  }, [id]);

  if (!board) return <div>Loading...</div>;

  return (
    <BoardForm
      mode="edit"
      initialValues={{
        title: board.title,
        content: board.content,
        category: board.boardCategory,
        image: board.imageUrl,
      }}
      onSubmit={async (data, image) => {
        await updateBoard(board.id, data, image ?? undefined);
        toast.success("게시글을 수정했습니다.");
        navigate(`/boards/${board.id}`);
      }}
      onCancel={() => navigate(-1)}
    />
  );
};

export default BoardEdit;
