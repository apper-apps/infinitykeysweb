import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Slider from "@/components/atoms/Slider";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const EffectsPanel = ({ effects, onEffectChange, transpose, onTransposeChange, octave, onOctaveChange }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-accent-500/20 to-info/20 rounded-lg">
          <ApperIcon name="Sliders" size={20} className="text-accent-400" />
        </div>
        <div>
          <h3 className="text-lg font-display font-bold text-white">Effects & Control</h3>
          <p className="text-sm text-primary-300">Shape your sound</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Transpose and Octave */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              Transpose: {transpose > 0 ? '+' : ''}{transpose}
            </label>
            <Slider
              min={-12}
              max={12}
              value={transpose}
              onChange={onTransposeChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              Octave: {octave > 0 ? '+' : ''}{octave}
            </label>
            <Slider
              min={-3}
              max={3}
              value={octave}
              onChange={onOctaveChange}
            />
          </div>
        </div>

        {/* Reverb */}
        <div>
          <label className="block text-sm font-medium text-primary-300 mb-2">
            Reverb: {effects.reverb.value}%
          </label>
          <div className="space-y-2">
            <Select
              value={effects.reverb.type}
              onChange={(e) => onEffectChange("reverb", { ...effects.reverb, type: e.target.value })}
            >
              <option value="hall">Hall</option>
              <option value="room">Room</option>
              <option value="cathedral">Cathedral</option>
            </Select>
            <Slider
              min={0}
              max={100}
              value={effects.reverb.value}
              onChange={(value) => onEffectChange("reverb", { ...effects.reverb, value })}
            />
          </div>
        </div>

        {/* EQ */}
        <div>
          <label className="block text-sm font-medium text-primary-300 mb-3">
            3-Band EQ
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["bass", "mid", "treble"].map(band => (
              <div key={band} className="text-center">
                <div className="text-xs text-primary-400 mb-2 capitalize">{band}</div>
                <motion.div 
                  className="relative h-20 w-6 mx-auto bg-primary-700 rounded-full overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-accent-500 to-accent-400 transition-all duration-200"
                    style={{ height: `${(effects.eq[band] + 50)}%` }}
                  />
<input
                    type="range"
                    min={-50}
                    max={50}
                    value={effects.eq[band]}
                    onChange={(e) => onEffectChange("eq", { 
                      ...effects.eq, 
                      [band]: Number(e.target.value) 
                    })}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </motion.div>
                <div className="text-xs text-primary-300 mt-1">
                  {effects.eq[band] > 0 ? '+' : ''}{effects.eq[band]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sustain Pedal */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary-300">Sustain Pedal</span>
          <Button
            variant={effects.sustain ? "primary" : "ghost"}
            size="sm"
            onClick={() => onEffectChange("sustain", !effects.sustain)}
          >
            <ApperIcon name="Circle" size={16} className={effects.sustain ? "fill-current" : ""} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EffectsPanel;