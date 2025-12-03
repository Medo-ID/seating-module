import React from "react";

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <label
      className={`block text-sm font-medium text-slate-700 ${className || ""}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
