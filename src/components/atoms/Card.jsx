import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
<div
      ref={ref}
      className={cn(
        "bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white/15",
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