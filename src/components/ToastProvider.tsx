import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Button from "./Button";

type ToastType = "success" | "error" | "info";

type ShowToastParams = {
  message: string;
  type?: ToastType;
  duration?: number;
};

type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  showToast: (params: ShowToastParams | string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const DEFAULT_DURATION = 3200;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);
  const timers = useRef<Map<number, number>>(new Map());

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));

    const timerId = timers.current.get(id);
    if (timerId) {
      window.clearTimeout(timerId);
      timers.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (params: ShowToastParams | string) => {
      const normalized =
        typeof params === "string"
          ? { message: params, type: "info" as ToastType, duration: DEFAULT_DURATION }
          : {
              message: params.message,
              type: params.type ?? "info",
              duration: params.duration ?? DEFAULT_DURATION,
            };

      const id = nextId.current++;
      setToasts((prev) => [...prev, { id, message: normalized.message, type: normalized.type }]);

      const timerId = window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
        timers.current.delete(id);
      }, normalized.duration);

      timers.current.set(id, timerId);
    },
    []
  );

  useEffect(() => {
    return () => {
      timers.current.forEach((timerId) => window.clearTimeout(timerId));
      timers.current.clear();
    };
  }, []);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="toast-viewport" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`} role="status">
            <p className="toast-message">{toast.message}</p>
            <Button
              type="button"
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Cerrar notificacion"
            >
              x
            </Button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast debe ser utilizado dentro de un ToastProvider");
  }

  return context;
};
