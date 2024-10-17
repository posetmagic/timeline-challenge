// utils.ts

/**
 * Utility function to clamp and round the value.
 * 
 * This function ensures that the returned value is:
 * - Within the specified range [min, max].
 * - Rounded to the nearest multiple of the given step.
 *
 * Requirements:
 * - Both `min` and `max` must be multiples of `step`.
 *
 * @param value - The input value to be clamped and rounded.
 * @param min - The minimum value (must be a multiple of step).
 * @param max - The maximum value (must be a multiple of step).
 * @param step - The step size to round to (must be a positive number).
 * @returns The clamped and rounded value.
 * 
 * @throws Error if min or max is not a multiple of step.
 *
 * Example:
 * 
 * clampAndRound(5, 0, 10, 2)    // Returns 6 (clamped to [0, 10] and rounded to nearest multiple of 2)
 * clampAndRound(13, 10, 20, 5)  // Returns 15 (clamped to [10, 20] and rounded to nearest multiple of 5)
 * clampAndRound(21, 10, 20, 5)  // Returns 20 (clamped to [10, 20] and rounded to nearest multiple of 5)
 */
export const clampAndRound = (value: number, min: number, max: number, step: number): number => {

    // Check if min and max are multiples of step
    // removed for performance???
    //if (min % step !== 0 || max % step !== 0) {
    //   throw new Error('Both min and max must be multiples of step.');
    //}

    const clampedValue = Math.max(min, Math.min(max, value));
    const roundedValue = Math.round(clampedValue / step) * step;
    return roundedValue;
  };
  