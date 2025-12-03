import React from "react";
import clsx from "clsx";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  shadow?: boolean;
  radius?: "md" | "lg" | "none";
};

export const Card: React.FC<CardProps> = ({
  children,
  className,
  shadow = true,
  radius = "md",
  ...rest
}) => {
  const radiusClass =
    radius === "md" ? "rounded-md" : radius === "lg" ? "rounded-lg" : "";
  const shadowClass = shadow ? "shadow-sm" : "";
  return (
    <div
      className={clsx("bg-white", radiusClass, shadowClass, "p-4", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
