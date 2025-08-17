import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-gradient-to-br from-primary-600/40 to-primary-700/20 backdrop-blur-md border border-primary-600/30 rounded-xl shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;