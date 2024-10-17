// TimeState.store.tsx

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

// Define the initial state of the time
interface TimeState {
  current: number;
}

// Initial state
const initialState: TimeState = {
  current: 0,
};

// Create a slice of the Redux store
const timeSlice = createSlice({
  name: 'time',  // This should be the name of the slice, e.g., 'time'
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
  },
});

// Export the action to set time
export const { setTime } = timeSlice.actions;

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    time: timeSlice.reducer,  // Use the slice name or an appropriate key here, like 'time'
  },
});

// Export the store
export default store;
