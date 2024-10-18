// PlayControls.tsx

import React, { useCallback, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrent, setDuration } from "./State.store";
import { MIN_CURRENT, MIN_DURATION, MAX_TIME, STEP_TIME } from "./State.store";

export const PlayControls: React.FC = () => {
  const dispatch = useDispatch();

  // Get the current time and duration from the Redux store
  const time_current = useSelector((state: any) => state.time.current);
  const time_duration = useSelector((state: any) => state.time.duration);

  // Local state for the input values
  const [fieldCurrent, setFieldCurrent] = useState<number>(time_current);
  const [fieldDuration, setFieldDuration] = useState<number>(time_duration);

  // References for input fields to allow text selection
  const currentInputRef = useRef<HTMLInputElement>(null);
  const durationInputRef = useRef<HTMLInputElement>(null);

  // Init input numbers to origin 
  useEffect(() => {
    setFieldCurrent(time_current);
  }, [time_current]);
  useEffect(() => {
    setFieldDuration(time_duration);
  }, [time_duration]);

  // fieldset update
  const TypingNumber = (e: React.ChangeEvent<HTMLInputElement>, type: 'current' | 'duration') => {
    const value = parseInt(e.target.value, 10);
    if (type === 'current') {
        setFieldCurrent(isNaN(value) ? time_current : value);
    } else {
        setFieldDuration(isNaN(value) ? time_duration : value);
    }
  };

  // Real Update to redux
  const UpdateRedux = useCallback((type: 'current' | 'duration', newValue: number) => {
    if (type === 'current') {
        dispatch(setCurrent(newValue));
    } else if (type === 'duration') {
        dispatch(setDuration(newValue));
    }
  }, [dispatch]);

  // on Blur
  const LeaveFocus = (type: 'current' | 'duration') => {
    if (type === 'current') {
      if (fieldCurrent < 0) {
        dispatch(setCurrent(MIN_CURRENT));
        setFieldCurrent(MIN_CURRENT);
      } else {
        UpdateRedux('current', fieldCurrent);
      }
    } else if (type === 'duration') {
      if (fieldDuration < 0) {
        dispatch(setDuration(MIN_DURATION));
        setFieldDuration(MIN_DURATION);
      } else {
        UpdateRedux('duration', fieldDuration);
      }
    }
  };

  const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: 'current' | 'duration') => {
    if (e.key === 'Enter') {
      LeaveFocus(type);
      e.currentTarget.blur();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const increment = e.key === 'ArrowUp' ? STEP_TIME : -STEP_TIME;
      const currentValue = type === 'current' ? fieldCurrent : fieldDuration;

      UpdateRedux(type, currentValue + increment);

      // Select the text in the input after updating
      if (type === 'current' && currentInputRef.current) {
        currentInputRef.current.select();
      } else if (type === 'duration' && durationInputRef.current) {
        durationInputRef.current.select();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault(); // Prevent default action for Left and Right Arrow keys
    } else if ((e.key === 'Escape') || (typeof e.key === 'string' && isNaN(Number(e.key)))) {
      if (type === 'current') {
        setFieldCurrent(time_current);
      } else {
        setFieldDuration(time_duration);
      }
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>, type: 'current' | 'duration') => {
    const input = e.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    
    if (!isNaN(value) && input.validity.valid) {
      // Check if the value has changed due to button click
      if (type === 'current' && value !== fieldCurrent) {
        UpdateRedux('current', value);
        // Select the text in the input after updating
        if (currentInputRef.current) {
          currentInputRef.current.select();
        }
      } else if (type === 'duration' && value !== fieldDuration) {
        UpdateRedux('duration', value);
        // Select the text in the input after updating
        if (durationInputRef.current) {
          durationInputRef.current.select();
        }
      }
    }
  };

  return (
    <div
      className="flex items-center justify-between border-b border-r border-solid border-gray-700 px-2"
      data-testid="play-controls"
    >
      <fieldset className="flex gap-1">
        Current
        <input
          ref={currentInputRef}
          className="bg-gray-700 px-1 rounded"
          type="number"
          data-testid="current-time-input"
          min={MIN_CURRENT}
          max={fieldDuration || MAX_TIME}
          step={STEP_TIME}
          value={fieldCurrent}
          onChange={(e) => TypingNumber(e, 'current')}
          onBlur={() => LeaveFocus('current')}
          onFocus={onInputFocus}
          onKeyDown={(e) => handleKeyDown(e, 'current')}
          onInput={(e) => handleInput(e, 'current')}
        />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <input
          ref={durationInputRef}
          className="bg-gray-700 px-1 rounded"
          type="number"
          data-testid="duration-input"
          min={MIN_DURATION}
          max={MAX_TIME}
          step={STEP_TIME}
          value={fieldDuration}
          onChange={(e) => TypingNumber(e, 'duration')}
          onBlur={() => LeaveFocus('duration')}
          onFocus={onInputFocus}
          onKeyDown={(e) => handleKeyDown(e, 'duration')}
          onInput={(e) => handleInput(e, 'duration')}
        />
        Duration
      </fieldset>
    </div>
  );
};
