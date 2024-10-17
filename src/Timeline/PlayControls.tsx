// PlayControls.tsx

import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTime } from "./TimeState.store";
import { clampAndRound } from "../utils/utils";

export const PlayControls: React.FC = () => {
  const dispatch = useDispatch();

  // Get the current time from the Redux store
  const time_current = useSelector((state: any) => state.time.current); // Adjust type according to your store

  const MIN_CURRENT = 0;   // Minimum time in seconds
  const MAX_CURRENT = 2000; // Maximum time in seconds
  const STEP_CURRENT = 10;  // Step for clamping and rounding

  const onTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTime = parseInt(e.target.value, 10); // Parse input as an integer
      // Adjust the time according to the constraints
      const adjustedTime = clampAndRound(newTime, MIN_CURRENT, MAX_CURRENT, STEP_CURRENT);
      // Dispatch the setTime action to update the time in the store
      dispatch(setTime(adjustedTime));
    },
    [dispatch]
  );

  return (
    <div
      className="flex items-center justify-between border-b border-r border-solid border-gray-700 
    px-2"
      data-testid="play-controls"
    >
      <fieldset className="flex gap-1">
        Current
        <input
          className="bg-gray-700 px-1 rounded"
          type="number"
          data-testid="current-time-input"
          min={MIN_CURRENT}
          max={MAX_CURRENT}
          step={STEP_CURRENT}
          value={time_current}
          onChange={onTimeChange}
        />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <input
          className="bg-gray-700 px-1 rounded"
          type="number"
          data-testid="duration-input"
          min={100}
          max={2000}
          step={10}
          defaultValue={2000}
        />
        Duration
      </fieldset>
    </div>
  );
};
