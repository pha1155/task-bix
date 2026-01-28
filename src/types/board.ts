// 게시판 카테고리
export type BoardCategory = "NOTICE" | "FREE" | "QNA" | "ETC";

// 글쓰기
export interface CreateBoardRequest {
  title: string;
  content: string;
  category: BoardCategory;
}

// 글 조회
export interface Board {
  id: number;
  title: string;
  content: string;
  boardCategory: BoardCategory;
  imageUrl: string | null;
  createdAt: string;
}

// 글 목록 아이템
export interface BoardListItem {
  id: number;
  title: string;
  category: BoardCategory;
  createdAt: string;
}

// 글 목록 조회
export interface BoardListResponse {
  content: BoardListItem[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  first: boolean;
  empty: boolean;
}

// 페이지네이션
export interface PaginationParams {
  page: number;
  size: number;
  category?: BoardCategory;
}
