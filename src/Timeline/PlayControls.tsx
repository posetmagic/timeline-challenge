// PlayControls.tsx

import React, { useCallback, useEffect, useState } from "react";
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

  // Local state for the input value
  const [inputValue, setInputValue] = useState<string>(time_current.toString());

  // Update local inputValue state when time_current changes
  useEffect(() => {
    setInputValue(time_current.toString());
  }, [time_current]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update local state with current input value
    setInputValue(e.target.value);
  };

  const onInputBlur = useCallback(() => {
    const newTime = parseInt(inputValue, 10); // Parse the input value

    // Ensure the parsed value is a number
    if (isNaN(newTime)) {
      // If not a number, reset to 0
      dispatch(setTime(MIN_CURRENT));
      setInputValue(MIN_CURRENT.toString());
      return;
    }

    // Adjust the time according to the constraints
    const adjustedTime = clampAndRound(newTime, MIN_CURRENT, MAX_CURRENT, STEP_CURRENT);
    
    // Dispatch the setTime action to update the time in the store
    dispatch(setTime(adjustedTime));
    setInputValue(adjustedTime.toString()); // Update inputValue with the adjusted time
  }, [dispatch, inputValue]);

  const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select the text in the input when focused
    e.target.select();
  };

  // Handle key press events
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onInputBlur(); // Call onInputBlur when Enter is pressed
    }
  };

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
          value={inputValue}
          onChange={onInputChange}
          onBlur={onInputBlur}  // Update time on blur
          onFocus={onInputFocus} // Select text on focus
          onKeyPress={onKeyPress} // Trigger update on Enter key press
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
