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
          background: `linear-gradient(to right, #ff6b8a 0%, #ff6b8a ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.2) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.2) 100%)`
        }}
        {...props}
      />
<style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b8a, #ff9a9e, #fecfef);
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 4px 12px rgba(255, 107, 138, 0.6), 0 0 20px rgba(255, 107, 138, 0.3);
          transition: all 0.3s ease;
        }
        
        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 16px rgba(255, 107, 138, 0.8), 0 0 30px rgba(255, 107, 138, 0.5);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b8a, #ff9a9e, #fecfef);
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 4px 12px rgba(255, 107, 138, 0.6), 0 0 20px rgba(255, 107, 138, 0.3);
        }
      `}</style>
    </div>
  );
});

Slider.displayName = "Slider";

export default Slider;