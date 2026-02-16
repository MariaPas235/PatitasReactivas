import React from "react";

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

export const Modal = ({ children, onClose }: Props) => {
  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: "white", padding: "1rem", borderRadius: 8, minWidth: 320, maxWidth: "90%" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {onClose && (
            <button onClick={onClose} style={{ marginBottom: "0.5rem" }}>Cerrar</button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
