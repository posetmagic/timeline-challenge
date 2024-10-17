// utils.ts

// Utility function to clamp and round the value
export const clampAndRound = (value: number, min: number, max: number, step: number): number => {
    const roundedValue = Math.round(value / step) * step;
  
    // Clamp the value between min and max
    if (roundedValue < min) return min;
    if (roundedValue > max) return max;
  
    return roundedValue;
  };
  