import { type ReactNode } from "react";
import Button from "@/components/common/Button";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

interface ModalProps {
  onClose: () => void;
  title?: string;
  description?: string;
  action?: ReactNode; // 오른쪽 버튼
}

const Modal = ({ onClose, title, description, action }: ModalProps) => {
  useLockBodyScroll();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="m-4 w-full rounded-xl bg-white p-6 md:w-auto md:min-w-100"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="text-dark-gray mb-4 text-lg font-bold">{title}</h2>}
        {description && <p className="text-dark-gray">{description}</p>}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={onClose}>
            취소
          </Button>
          {action}
        </div>
      </div>
    </div>
  );
};

export default Modal;
