import api from "@/api/axios";
import type {
  BoardCategory,
  CreateBoardRequest,
  Board,
  BoardListResponse,
  PaginationParams,
} from "@/types/board";

const createBoardFormData = (request: CreateBoardRequest, file?: File): FormData => {
  const formData = new FormData();

  formData.append(
    "request",
    new Blob([JSON.stringify(request)], {
      type: "application/json",
    }),
  );

  if (file) {
    formData.append("file", file);
  }

  return formData;
};

// 글쓰기
export const createBoard = async (request: CreateBoardRequest, file?: File): Promise<void> => {
  await api.post("/boards", createBoardFormData(request, file));
};

// 글 수정
export const updateBoard = async (
  boardId: number,
  request: CreateBoardRequest,
  file?: File,
): Promise<void> => {
  await api.patch(`/boards/${boardId}`, createBoardFormData(request, file));
};

// 글 삭제
export const deleteBoard = async (boardId: number): Promise<void> => {
  await api.delete(`/boards/${boardId}`);
};

// 글 조회
export const getBoard = async (boardId: number): Promise<Board> => {
  const response = await api.get<Board>(`/boards/${boardId}`);
  return response.data;
};

// 글 목록 조회
export const getBoardList = async (params: PaginationParams): Promise<BoardListResponse> => {
  const response = await api.get<BoardListResponse>("/boards", { params });
  return response.data;
};

// 게시판 카테고리
export type CategoryMap = Record<BoardCategory, string>;

export const getBoardCategories = async (): Promise<CategoryMap> => {
  const response = await api.get<CategoryMap>("/boards/categories");
  return response.data;
};
