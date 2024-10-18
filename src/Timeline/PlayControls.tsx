// PlayControls.tsx

import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrent, setDuration } from "./State.store";
import { MIN_CURRENT, MIN_DURATION, MAX_TIME, STEP_TIME } from "./State.store";

export const PlayControls: React.FC = () => {
  const dispatch = useDispatch();

  // Get the current time and duration from the Redux store
  const time_current = useSelector((state: any) => state.time.current);
  const time_duration = useSelector((state: any) => state.time.duration);

  // Local state for the input values (using number type directly)
  const [inputCurrent, setInputCurrent] = useState<number>(time_current);
  const [inputDuration, setInputDuration] = useState<number>(time_duration);

  // Update local inputCurrent state when time_current changes
  useEffect(() => {
    setInputCurrent(time_current);
  }, [time_current]);

  // Update local inputDuration state when time_duration changes
  useEffect(() => {
    setInputDuration(time_duration);
  }, [time_duration]);

  // Handle current time input change
  const onInputChangeCurrent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setInputCurrent(isNaN(value) ? time_current : value); // Revert to time_current if NaN
  };

  // Handle duration input change
  const onInputChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setInputDuration(isNaN(value) ? time_duration : value); // Revert to time_duration if NaN
  };

  const onInputBlurCurrent = useCallback(() => {
    if (inputCurrent < 0) {
      dispatch(setCurrent(MIN_CURRENT));
      setInputCurrent(MIN_CURRENT);
      return;
    }

    dispatch(setCurrent(inputCurrent));
  }, [dispatch, inputCurrent]);

  const onInputBlurDuration = useCallback(() => {
    if (inputDuration < 0) {
      dispatch(setDuration(MIN_DURATION));
      setInputDuration(MIN_DURATION);
      return;
    }

    dispatch(setDuration(inputDuration));
  }, [dispatch, inputDuration]);

  const onInputFocusCurrent = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const onInputFocusDuration = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const onKeyPressCurrent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onInputBlurCurrent();
      e.currentTarget.blur();
    }
  };

  const onKeyPressDuration = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onInputBlurDuration();
      e.currentTarget.blur();
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
          max={inputDuration || MAX_TIME} // Use inputDuration directly as a number
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
          min={MIN_DURATION}
          max={MAX_TIME}
          step={STEP_TIME}
          value={inputDuration}
          onChange={onInputChangeDuration}
          onBlur={onInputBlurDuration}
          onFocus={onInputFocusDuration}
          onKeyPress={onKeyPressDuration}
        />
        Duration
      </fieldset>
    </div>
  );
};
