import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Slider = forwardRef(({ 
  className = "", 
  min = 0, 
  max = 100, 
  step = 1, 
  value = 50, 
  onChange, 
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className={cn(
          "w-full h-2 bg-primary-700 rounded-lg appearance-none cursor-pointer slider-thumb",
          className
        )}
        style={{
          background: `linear-gradient(to right, #e94560 0%, #e94560 ${((value - min) / (max - min)) * 100}%, #0f3460 ${((value - min) / (max - min)) * 100}%, #0f3460 100%)`
        }}
        {...props}
      />
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #e94560, #ff6b8a);
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 8px rgba(233, 69, 96, 0.4);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #e94560, #ff6b8a);
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 8px rgba(233, 69, 96, 0.4);
        }
      `}</style>
    </div>
  );
});

Slider.displayName = "Slider";

export default Slider;