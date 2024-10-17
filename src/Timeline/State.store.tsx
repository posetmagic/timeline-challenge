// State.store.tsx

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

// Define the initial state of the time and scrolls
interface TimeState {
  current: number;
}

interface ScrollState {
  vertical: number;  // for vertical scroll
  horizontal: number; // for horizontal scroll
}

// Initial states
const initialTimeState: TimeState = {
  current: 0,
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
    setTime: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
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
export const { setTime } = timeSlice.actions;
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
