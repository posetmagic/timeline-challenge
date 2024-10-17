// TimeState.store.tsx

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

// Define the initial state of the time
interface TimeState {
  time: number;
}

// Initial state
const initialState: TimeState = {
  time: 0,
};

// Create a slice of the Redux store
const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
  },
});

// Export the action to set time
export const { setTime } = timeSlice.actions;

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    time: timeSlice.reducer,
  },
});

// Export the store
export default store;
