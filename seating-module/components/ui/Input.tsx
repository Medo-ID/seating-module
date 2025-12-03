import React from "react";
import clsx from "clsx";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <label className="block">
        {label && (
          <span className="text-sm font-medium text-slate-700 mb-1 block">
            {label}
          </span>
        )}
        <input
          ref={ref}
          className={clsx(
            "w-full rounded-md border px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300",
            error ? "border-red-300" : "border-gray-200",
            className
          )}
          {...props}
        />
        {error && (
          <small className="text-red-600 block mt-1 text-xs">{error}</small>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";
export default Input;
