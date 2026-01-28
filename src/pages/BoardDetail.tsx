// 글 상세 페이지

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getBoard, deleteBoard } from "@/api/board.api";
import type { Board } from "@/types/board";
import Title from "@/components/common/Title";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { formatDate } from "@/utils/formatDate";
import { getBoardCategories } from "@/api/board.api";
import type { BoardCategory } from "@/types/board";
import BoardImage from "@/components/board/BoardImage";

type CategoryMap = Record<BoardCategory, string>;

const BoardDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [board, setBoard] = useState<Board | null>(null);
  const [categoryLabels, setCategoryLabels] = useState<CategoryMap | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteBoard(Number(id));
      navigate("/");
      toast.success("게시글을 삭제했습니다.");
    } catch (error) {
      console.error("게시글 삭제에 실패했습니다.", error);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchBoard = async () => {
      setLoading(true);

      try {
        const response = await getBoard(Number(id));
        setBoard(response);
      } catch (error) {
        console.error("게시글 상세 조회에 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [id]);

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
  if (!board) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <>
      <Title className="mb-5" title="등록된 게시글" />
      <div className="bg-rounded md:box-shadow mb-5">
        <div className="border-gray mb-5 border-b pb-5">
          <h2 className="text-dark-gray mb-5 text-2xl font-bold">[{board.title}]</h2>
          <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2">
            <dt className="font-bold">게시판</dt>
            <dd>{categoryLabels?.[board.boardCategory]}</dd>
            <dt className="font-bold">등록일</dt>
            <dd>{formatDate(board.createdAt)}</dd>
          </dl>
        </div>
        <div>
          {board.imageUrl && board.imageUrl.trim() !== "" && (
            <BoardImage imageUrl={board.imageUrl} />
          )}
          <p>{board.content}</p>
        </div>
      </div>
      <div className="mb-20 flex justify-between">
        <Button variant="secondary" className="inline-block" onClick={() => navigate(`/`)}>
          목록으로
        </Button>
        <div className="flex gap-4">
          <Button onClick={() => navigate(`/boards/${id}/edit`)}>수정하기</Button>
          <Button variant="secondary" onClick={handleDeleteClick}>
            삭제하기
          </Button>
        </div>
      </div>

      {isDeleteModalOpen && (
        <Modal
          onClose={closeDeleteModal}
          title="정말 삭제하시겠습니까?"
          description="삭제된 게시글은 복구할 수 없습니다."
          action={<Button onClick={handleDelete}>삭제하기</Button>}
        />
      )}
    </>
  );
};

export default BoardDetail;
