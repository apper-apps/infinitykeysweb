import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  disabled = false,
  ...props 
}, ref) => {
const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95";
  
const variants = {
    primary: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white shadow-xl hover:shadow-2xl",
    secondary: "bg-gradient-to-r from-orange-400 via-pink-400 to-red-400 hover:from-orange-500 hover:via-pink-500 hover:to-red-500 text-white shadow-lg",
    ghost: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 hover:border-white/40",
    outline: "border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 backdrop-blur-sm"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm font-semibold",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <motion.button
      ref={ref}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;