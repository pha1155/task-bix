import { useState } from "react";
import Title from "@/components/common/Title";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/DropDown";
import Textarea from "@/components/common/Textarea";
import Modal from "@/components/common/Modal";
import ImageUploader from "@/components/common/ImageUploader";
import type { BoardCategory, CreateBoardRequest } from "@/types/board";
import { BOARD_CATEGORY_OPTIONS } from "@/constants/boardCategory";

type BoardCategoryValue = BoardCategory | "";

interface BoardFormValues {
  title: string;
  content: string;
  category: BoardCategoryValue;
}

interface BoardFormProps {
  mode: "create" | "edit";
  initialValues?: {
    title: string;
    content: string;
    category: BoardCategory;
    image?: string | null;
  };
  onSubmit: (data: CreateBoardRequest, image: File | null) => Promise<void>;
  onCancel: () => void;
}

const BoardForm = ({ mode, initialValues, onSubmit, onCancel }: BoardFormProps) => {
  const [values, setValues] = useState<BoardFormValues>({
    title: initialValues?.title ?? "",
    content: initialValues?.content ?? "",
    category: initialValues?.category ?? "",
  });

  const [image, setImage] = useState<File | string | null>(initialValues?.image ?? null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isFormValid =
    values.category !== "" && values.title.trim() !== "" && values.content.trim() !== "";

  const handleChange =
    <K extends keyof BoardFormValues>(key: K) =>
    (value: BoardFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.category === "") return;

    await onSubmit(
      {
        title: values.title,
        content: values.content,
        category: values.category,
      },
      image && typeof image !== "string" ? image : null,
    );
  };

  const titleText = mode === "create" ? "게시글 작성" : "게시글 수정";
  const submitText = mode === "create" ? "등록하기" : "수정하기";
  const cancelText = mode === "create" ? "등록취소" : "수정취소";

  return (
    <>
      <Title className="mb-5" title={titleText} />
      <form className="bg-rounded md:box-shadow" onSubmit={handleSubmit}>
        <p className="text-dark-gray mb-5">모든 항목 입력 시 가능합니다.(이미지 등록 제외)</p>
        <div className="mb-5 flex flex-col gap-5 md:flex-row">
          <Dropdown
            value={values.category}
            onChange={handleChange("category")}
            options={BOARD_CATEGORY_OPTIONS}
            className="md:w-48"
            placeholderLabel="등록할 게시판 선택"
          />
          <Input
            className="flex-1"
            placeholder="제목을 입력해주세요."
            value={values.title}
            onChange={(e) => handleChange("title")(e.target.value)}
          />
        </div>
        <Textarea
          rows={10}
          placeholder="내용을 입력해주세요."
          value={values.content}
          onChange={(e) => handleChange("content")(e.target.value)}
        />
        <div className="mt-5 justify-between lg:flex">
          <ImageUploader image={image} onChange={setImage} />
          <div className="mt-5 flex gap-4 lg:mt-0">
            <Button type="submit" disabled={!isFormValid}>
              {submitText}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(true)}>
              {cancelText}
            </Button>
          </div>
        </div>
      </form>

      {isModalOpen && (
        <Modal
          title="정말 취소하시겠습니까?"
          description="작성중이던 내용은 저장되지 않습니다."
          onClose={() => setIsModalOpen(false)}
          action={<Button onClick={onCancel}>확인</Button>}
        />
      )}
    </>
  );
};

export default BoardForm;
