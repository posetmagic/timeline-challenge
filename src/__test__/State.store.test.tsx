// src/__tests__/State.store.test.tsx

import store, { setCurrent, setDuration } from '../Timeline/State.store';
import { MAX_TIME } from '../Timeline/State.store';

describe('Redux store - Time Slice', () => {
  beforeEach(() => {
    store.dispatch(setCurrent(1500));
    store.dispatch(setDuration(2000));    
  });

  it('should set duration and adjust current time if duration is less than current', () => {
    const newDuration = 1000; // Set a duration lower than the current time
    const newCurrent = 2000; // Set a duration lower than the current time

    // Dispatch action to set the new duration
    store.dispatch(setDuration(newDuration));
    store.dispatch(setCurrent(newCurrent));

    // Get the updated state
    const state = store.getState();

    // Check that the duration has been updated
    expect(state.time.duration).toBe(newDuration);

    // Check that the current time is adjusted to be equal to the new duration
    expect(state.time.current).toBe(newDuration);
  });

  it('should not change current if new duration is greater than current', () => {
    const newDuration = 2000; // Set a duration greater than current time
    const newCurrent = 1300; // Set a duration greater than current time

    // Dispatch action to set the new duration
    store.dispatch(setDuration(newDuration));
    store.dispatch(setCurrent(newCurrent));

    // Get the updated state
    const state = store.getState();

    // Check that the duration has been updated
    expect(state.time.duration).toBe(newDuration);

    // Check that the current time remains unchanged
    expect(state.time.current).toBe(newCurrent);
  });

  it('should not set duration greater than MAX_TIME', () => {
    const newDuration = MAX_TIME + 2000; // Set a duration greater than the maximum allowed
    const newCurrent = 1100; // Set a duration greater than current time

    // Dispatch action to set the new duration
    store.dispatch(setDuration(newDuration));
    store.dispatch(setCurrent(newCurrent));

    // Get the updated state
    const state = store.getState();

    // Check that the duration has been set to MAX_TIME
    expect(state.time.duration).toBe(MAX_TIME);

    // Check that the current time remains unchanged if it was initially below MAX_TIME
    expect(state.time.current).toBe(newCurrent); // Current time should remain as 1100
  });
});
