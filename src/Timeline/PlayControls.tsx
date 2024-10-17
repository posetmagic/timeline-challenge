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

  // Local state for the input values
  const [inputCurrent, setInputCurrent] = useState<string>(time_current.toString());
  const [inputDuration, setInputDuration] = useState<string>(time_duration.toString());

  // Update local inputCurrent state when time_current changes
  useEffect(() => {
    setInputCurrent(time_current.toString());
  }, [time_current]);

  // Update local inputDuration state when time_duration changes
  useEffect(() => {
    setInputDuration(time_duration.toString());
  }, [time_duration]);

  // Handle current time input change
  const onInputChangeCurrent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCurrent(e.target.value);
  };

  // Handle duration input change
  const onInputChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDuration(e.target.value);
  };

  const onInputBlurCurrent = useCallback(() => {
    const newTimeCurrent = parseInt(inputCurrent, 10);

    if (isNaN(newTimeCurrent) || newTimeCurrent < 0) {
      dispatch(setCurrent(MIN_CURRENT));
      setInputCurrent(MIN_CURRENT.toString());
      return;
    }

    dispatch(setCurrent(newTimeCurrent));
    setInputCurrent(newTimeCurrent.toString());
  }, [dispatch, inputCurrent]);

  const onInputBlurDuration = useCallback(() => {
    const newTimeDuration = parseInt(inputDuration, 10);

    if (isNaN(newTimeDuration)|| newTimeDuration < 0) {
      dispatch(setDuration(MIN_DURATION));
      setInputDuration(MIN_DURATION.toString());
      return;
    }

    dispatch(setDuration(newTimeDuration));
    setInputDuration(newTimeDuration.toString());
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
          max={parseInt(inputDuration, 10) || MAX_TIME}
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
