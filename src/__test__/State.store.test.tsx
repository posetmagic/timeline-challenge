// src/__tests__/State.store.test.tsx

import store, { setCurrent, setDuration } from '../Timeline/State.store';
import { MAX_TIME } from '../Timeline/State.store';

describe('Redux store - Time Slice', () => {
  beforeEach(() => {
    store.dispatch(setCurrent(1500)); // Set current time for testing
  });

  it('should set duration and adjust current time if duration is less than current', () => {
    const newDuration = 1000; // Set a duration lower than the current time

    // Dispatch action to set the new duration
    store.dispatch(setDuration(newDuration));

    // Get the updated state
    const state = store.getState();

    // Check that the duration has been updated
    expect(state.time.duration).toBe(newDuration);

    // Check that the current time is adjusted to be equal to the new duration
    expect(state.time.current).toBe(newDuration);
  });

  it('should not change current if new duration is greater than current', () => {
    const initialCurrent = store.getState().time.current; // Store the initial current time
    const newDuration = 2000; // Set a duration greater than current time

    // Dispatch action to set the new duration
    store.dispatch(setDuration(newDuration));

    // Get the updated state
    const state = store.getState();

    // Check that the duration has been updated
    expect(state.time.duration).toBe(newDuration);

    // Check that the current time remains unchanged
    expect(state.time.current).toBe(initialCurrent);
  });

  it('should not set duration greater than MAX_TIME', () => {
    const newDuration = 8000; // Set a duration greater than the maximum allowed

    // Dispatch action to set the new duration
    store.dispatch(setDuration(newDuration));

    // Get the updated state
    const state = store.getState();

    // Check that the duration has been set to MAX_TIME
    expect(state.time.duration).toBe(MAX_TIME);

    // Check that the current time remains unchanged if it was initially below MAX_TIME
    expect(state.time.current).toBe(1500); // Current time should remain as 1500
  });
});
