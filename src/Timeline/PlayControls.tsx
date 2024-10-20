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
  const [fieldCurrent, setFieldCurrent] = useState<number>(time_current);
  const [fieldDuration, setFieldDuration] = useState<number>(time_duration);

  // Init input numbers to origin 
  useEffect(() => {
    setFieldCurrent(time_current);
    setFieldDuration(time_duration);
  }, [time_current, time_duration]);

  // Utility functions to get and set field values
  const getField = (type: 'current' | 'duration') => {
    return type === 'current' ? fieldCurrent : fieldDuration;
  };

  const setField = (type: 'current' | 'duration', value: number) => {
    type === 'current' ? setFieldCurrent(value) : setFieldDuration(value);
  };

  // Real Update to redux
  const UpdateRedux = useCallback((type: 'current' | 'duration', newValue: number) => {
    if (type === 'current') {
      dispatch(setCurrent(newValue));
    } else { // type === 'duration'
      dispatch(setDuration(newValue));
    }
  }, [dispatch]);

  // Update local state on typing but don't update Redux immediately
  const TypingNumber = (e: React.ChangeEvent<HTMLInputElement>, type: 'current' | 'duration') => {
    setField(type, e.target.valueAsNumber);
  };

  // onBlur
  const LeaveFocus = (type: 'current' | 'duration') => {
    UpdateRedux(type, getField(type));
  };

  // onInputFocus (select all text)
  const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };
  
  // Spec Change
  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, inputRef: React.RefObject<HTMLInputElement>, type: 'current' | 'duration') => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: 'current' | 'duration') => {
    if (e.key === 'Enter') {
      LeaveFocus(type);
      e.currentTarget.blur();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const increment = e.key === 'ArrowUp' ? STEP_TIME : -STEP_TIME;
      const newValue = getField(type) + increment;
      UpdateRedux(type, newValue);
      setField(type, newValue); 
      // Spec Change
      //inputRef.current?.focus();
      //inputRef.current?.select();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setField(type, type === 'current' ? time_current : time_duration);
    }
  };

  // handleMouseUp to focus and select the input value
  // Spec Change
  // const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>, inputRef: React.RefObject<HTMLInputElement>, type: 'current' | 'duration') => {
  const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>, type: 'current' | 'duration') => {
    if(e.currentTarget.value){
      // Spec Change
      //inputRef.current?.focus();
      //inputRef.current?.select();
      //
      UpdateRedux(type, getField(type));
    }
  };

  // Spec Change
  //
  //  // Create refs for the inputs
  // const currentInputRef = React.useRef<HTMLInputElement | null>(null);
  // const durationInputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <div
      className="flex items-center justify-between border-b border-r border-solid border-gray-700 px-2"
      data-testid="play-controls"
    >
      <fieldset className="flex gap-1">
        Current
        <input
          // Spec Change
          // ref={currentInputRef} 
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
          
          // Spec Change
          // onKeyDown={(e) => handleKeyDown(e, currentInputRef, 'current')}
          // onMouseUp={(e) => handleMouseUp(e, currentInputRef, 'current')}
          onKeyDown={(e) => handleKeyDown(e, 'current')}
          onMouseUp={(e) => handleMouseUp(e, 'current')}
        />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <input
          // Spec Change
          // ref={durationInputRef}
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
          
          // Spec Change
          // onKeyDown={(e) => handleKeyDown(e, durationInputRef, 'duration')}
          // onMouseUp={(e) => handleMouseUp(e, durationInputRef, 'duration')}
          onKeyDown={(e) => handleKeyDown(e, 'duration')}
          onMouseUp={(e) => handleMouseUp(e, 'duration')}
        />
        Duration
      </fieldset>
    </div>
  );
};
