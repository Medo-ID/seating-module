import React from "react";
import clsx from "clsx";
import { CreateTemplateSchema } from "@/seating-module/utils/validators";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: CreateTemplateSchema["type"][];
  error?: string | null;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className, ...props }, ref) => {
    return (
      <label className="block">
        {label && (
          <span className="text-sm font-medium text-slate-700 mb-1 block">
            {label}
          </span>
        )}
        <select
          ref={ref}
          className={clsx(
            "w-full rounded-md border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300",
            error ? "border-red-300" : "border-gray-200",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option className="capitalize" key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && (
          <small className="text-red-600 block mt-1 text-xs">{error}</small>
        )}
      </label>
    );
  }
);

Select.displayName = "Select";
export default Select;
