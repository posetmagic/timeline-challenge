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
    setInputCurrent(isNaN(value) ? time_current : value);
  };

  // Handle duration input change
  const onInputChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setInputDuration(isNaN(value) ? time_duration : value);
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

  const onKeyDownCurrent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onInputBlurCurrent();
      e.currentTarget.blur();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      handleArrowKeyPress(e, 'current');
    }
  };

  const onKeyDownDuration = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onInputBlurDuration();
      e.currentTarget.blur();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      handleArrowKeyPress(e, 'duration');
    }
  };

  const handleArrowKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, type: 'current' | 'duration') => {
    e.preventDefault();
    
    const isUp = e.key === 'ArrowUp';
    
    // Adjust the current time or duration based on the arrow key pressed
    if (type === 'current') {
      const newCurrent = isUp ? time_current + STEP_TIME : time_current - STEP_TIME;
      if (newCurrent <= time_duration){
        setInputCurrent(newCurrent);
        dispatch(setCurrent(newCurrent));
      }
    } else if (type === 'duration') {
      const newDuration = isUp ? time_duration + STEP_TIME : time_duration - STEP_TIME;
      setInputDuration(newDuration);
      dispatch(setDuration(newDuration));
    }

    // Keep the input focused and selected
    if (type === 'current') {
      (document.querySelector("[data-testid='current-time-input']") as HTMLInputElement)?.focus();
      (document.querySelector("[data-testid='current-time-input']") as HTMLInputElement)?.select();
    } else {
      (document.querySelector("[data-testid='duration-input']") as HTMLInputElement)?.focus();
      (document.querySelector("[data-testid='duration-input']") as HTMLInputElement)?.select();
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
          max={inputDuration || MAX_TIME}
          step={STEP_TIME}
          value={inputCurrent}
          onChange={onInputChangeCurrent}
          onBlur={onInputBlurCurrent}
          onFocus={onInputFocusCurrent}
          onKeyDown={onKeyDownCurrent}
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
          onKeyDown={onKeyDownDuration}
        />
        Duration
      </fieldset>
    </div>
  );
};
