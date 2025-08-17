import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ 
  children, 
  className = "", 
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "w-full bg-gradient-to-r from-primary-700 to-primary-600 border border-primary-500/50 rounded-lg px-3 py-2 text-white text-sm appearance-none cursor-pointer hover:border-accent-500/50 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-200",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ApperIcon name="ChevronDown" size={16} className="text-primary-300" />
      </div>
    </div>
  );
});

Select.displayName = "Select";

export default Select;