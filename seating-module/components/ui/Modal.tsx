import React from "react";
import clsx from "clsx";

type ModalProps = {
  title?: string;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

export const Modal: React.FC<ModalProps> = ({
  title,
  open,
  onClose,
  children,
  size = "md",
}) => {
  if (!open) return null;

  const sizeClass =
    size === "sm" ? "max-w-md" : size === "lg" ? "max-w-4xl" : "max-w-2xl";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className={clsx("z-50 mx-4 w-full", sizeClass)}>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <button
              className="text-slate-500 hover:text-slate-800"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
