import React from "react";

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

export const Modal = ({ children, onClose }: Props) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {onClose && <button onClick={onClose}>Cerrar</button>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
