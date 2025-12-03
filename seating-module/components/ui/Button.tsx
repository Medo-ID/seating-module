import React from "react";
import clsx from "clsx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  as?: "button" | "a";
  href?: string;
};

const base =
  "rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
const variants: Record<string, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary:
    "bg-white text-slate-900 border border-gray-200 hover:bg-gray-50 focus:ring-slate-300",
  ghost: "bg-transparent text-slate-800 hover:bg-gray-50",
};
const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = "primary",
      size = "md",
      className,
      children,
      ...rest
    } = props;
    const classes = clsx(base, variants[variant], sizes[size], className);
    return (
      <button ref={ref} className={classes} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
