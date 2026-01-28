// 글쓰기 페이지

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BoardForm from "@/components/board/BoardForm";
import { createBoard } from "@/api/board.api";

const BoardCreate = () => {
  const navigate = useNavigate();

  return (
    <BoardForm
      mode="create"
      onSubmit={async (data, image) => {
        await createBoard(data, image ?? undefined);
        toast.success("게시글을 등록했습니다.");
        navigate("/");
      }}
      onCancel={() => navigate(-1)}
    />
  );
};

export default BoardCreate;
