// State.store.tsx

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { clampAndRound } from '../utils/utils';

// Define constants at the top level
export const MIN_CURRENT = 0;
export const MIN_DURATION = 100;
export const MAX_TIME = 6000;
export const STEP_TIME = 10;

interface TimeState {
  current: number;
  duration: number;
}

interface ScrollState {
  vertical: number;
  horizontal: number;
}

const initialTimeState: TimeState = {
  current: 0,
  duration: 2000,
};

const initialScrollState: ScrollState = {
  vertical: 0,
  horizontal: 0,
};

// Create a slice for time
const timeSlice = createSlice({
  name: 'time',
  initialState: initialTimeState,
  reducers: {
    setCurrent: (state, action: PayloadAction<number>) => {
      const adjustedTime = clampAndRound(action.payload, MIN_CURRENT, state.duration, STEP_TIME);
      state.current = adjustedTime;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      const adjustedDuration = clampAndRound(action.payload, MIN_DURATION, MAX_TIME, STEP_TIME);
      // Check if new duration is less than current time
      if (adjustedDuration < state.current) {
        state.current = adjustedDuration;
      }
      state.duration = adjustedDuration;
    },
  },
});

// Create a slice for scrolls
const scrollSlice = createSlice({
  name: 'scroll',
  initialState: initialScrollState,
  reducers: {
    setVerticalScroll: (state, action: PayloadAction<number>) => {
      state.vertical = action.payload;
    },
    setHorizontalScroll: (state, action: PayloadAction<number>) => {
      state.horizontal = action.payload;
    },
  },
});

// Export the actions
export const { setCurrent, setDuration } = timeSlice.actions;
export const { setVerticalScroll, setHorizontalScroll } = scrollSlice.actions;

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    time: timeSlice.reducer,
    scroll: scrollSlice.reducer,
  },
});

// Export the store
export default store;
