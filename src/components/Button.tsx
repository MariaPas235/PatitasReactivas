import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "danger" | "text";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "",
  danger: "btn-danger",
  text: "text-button",
};

const Button = ({ variant = "primary", className = "", type = "button", children, ...props }: Props) => {
  const resolvedClass = `${variantClass[variant]} ${className}`.trim();

  return (
    <button type={type} className={resolvedClass || undefined} {...props}>
      {children}
    </button>
  );
};

export default Button;
