// PlayControls.tsx

import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTime } from "./State.store";
import { clampAndRound } from "../utils/utils";

export const PlayControls: React.FC = () => {
  const dispatch = useDispatch();
  
  // Get the current time from the Redux store
  const time_current = useSelector((state: any) => state.time.current); // Adjust type according to your store

  const MIN_TIME = 0;
  const MAX_TIME = 6000;
  const STEP_TIME = 10;

  // Local state for the input value
  const [inputCurrent, setinputCurrent] = useState<string>(time_current.toString());

  // Update local inputCurrent state when time_current changes
  useEffect(() => {
    setinputCurrent(time_current.toString());
  }, [time_current]);

  const onInputChangeCurrent = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update local state with current input value
    setinputCurrent(e.target.value);
  };

  const onInputBlurCurrent = useCallback(() => {
    const newTimeCurrent = parseInt(inputCurrent, 10); // Parse the input value

    // Ensure the parsed value is a number
    if (isNaN(newTimeCurrent)) {
      // If not a number, reset to 0
      dispatch(setTime(MIN_TIME));
      setinputCurrent(MIN_TIME.toString());
      return;
    }

    // Adjust the time according to the constraints
    const adjustedTimeCurrent = clampAndRound(newTimeCurrent, MIN_TIME, MAX_TIME, STEP_TIME);
    
    // Dispatch the setTime action to update the time in the store
    dispatch(setTime(adjustedTimeCurrent));
    setinputCurrent(adjustedTimeCurrent.toString()); // Update inputCurrent with the adjusted time
  }, [dispatch, inputCurrent]);

  const onInputFocusCurrent = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select the text in the input when focused
    e.target.select();
  };

  // Handle key press events
  const onKeyPressCurrent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onInputBlurCurrent(); // Call onInputBlurCurrent when Enter is pressed
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
          min={MIN_TIME}
          max={MAX_TIME}
          step={STEP_TIME}
          value={inputCurrent}
          onChange={onInputChangeCurrent}
          onBlur={onInputBlurCurrent}
          onFocus={onInputFocusCurrent}
          onKeyPress={onKeyPressCurrent}
        />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <input
          className="bg-gray-700 px-1 rounded"
          type="number"
          data-testid="duration-input"
          min={MIN_TIME}
          max={MAX_TIME}
          step={STEP_TIME}
          defaultValue={2000}
        />
        Duration
      </fieldset>
    </div>
  );
};
