// PlayControls.tsx

import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTime, setDuration } from "./State.store";
import { clampAndRound } from "../utils/utils";

export const PlayControls: React.FC = () => {
  const dispatch = useDispatch();

  // Get the current time and duration from the Redux store
  const time_current = useSelector((state: any) => state.time.current);
  const time_duration = useSelector((state: any) => state.time.duration);

  const MIN_CURRENT = 0;
  const MIN_DURATION = 100;
  const MAX_TIME = 6000;
  const STEP_TIME = 10;

  // Local state for the input values
  const [inputCurrent, setinputCurrent] = useState<string>(time_current.toString());
  const [inputDuration, setinputDuration] = useState<string>(time_duration.toString());

  // Update local inputCurrent state when time_current changes
  useEffect(() => {
    setinputCurrent(time_current.toString());
  }, [time_current]);

  // Update local inputDuration state when time_duration changes
  useEffect(() => {
    setinputDuration(time_duration.toString());
  }, [time_duration]);

  // Handle current time input change
  const onInputChangeCurrent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputCurrent(e.target.value);
  };

  // Handle duration input change
  const onInputChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputDuration(e.target.value);
  };

  const onInputBlurCurrent = useCallback(() => {
    const newTimeCurrent = parseInt(inputCurrent, 10);

    if (isNaN(newTimeCurrent)) {
      dispatch(setTime(MIN_CURRENT));
      setinputCurrent(MIN_CURRENT.toString());
      return;
    }

    const adjustedTimeCurrent = clampAndRound(newTimeCurrent, MIN_CURRENT, MAX_TIME, STEP_TIME);

    dispatch(setTime(adjustedTimeCurrent));
    setinputCurrent(adjustedTimeCurrent.toString());
  }, [dispatch, inputCurrent]);

  // Similar handler for when duration input loses focus
  const onInputBlurDuration = useCallback(() => {
    const newTimeDuration = parseInt(inputDuration, 10);

    if (isNaN(newTimeDuration)) {
      dispatch(setDuration(MIN_DURATION));
      setinputDuration(MIN_DURATION.toString());
      return;
    }

    const adjustedTimeDuration = clampAndRound(newTimeDuration, MIN_DURATION, MAX_TIME, STEP_TIME); // Use MIN_DURATION

    dispatch(setDuration(adjustedTimeDuration)); // Dispatch the setDuration action
    setinputDuration(adjustedTimeDuration.toString()); // Update inputDuration with the adjusted value
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
    }
  };

  const onKeyPressDuration = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onInputBlurDuration();
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
