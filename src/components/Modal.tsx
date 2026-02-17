import React from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

export const Modal = ({ children, onClose }: Props) => {
  const modal = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default Modal;
