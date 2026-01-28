import { useState } from "react";
import { API_BASE_URL } from "@/constants/api";

interface BoardImageProps {
  imageUrl?: string | null;
}

const BoardImage = ({ imageUrl }: BoardImageProps) => {
  const [hasError, setHasError] = useState(false);

  if (!imageUrl || hasError) return null;

  return (
    <img src={`${API_BASE_URL}${imageUrl}`} alt="게시글 이미지" onError={() => setHasError(true)} />
  );
};

export default BoardImage;
