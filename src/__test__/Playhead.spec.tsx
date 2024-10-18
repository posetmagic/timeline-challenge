// src/__tests__/Playhead.spec.tsx

import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Playhead } from "../Timeline/Playhead";

//
// core check, is there "hidden"
//

// Create a simple mock reducer
const mockReducer = (state = { time: { current: 100 }, scroll: { horizontal: 200 } }) => state;

const store = configureStore({ reducer: mockReducer }); // Use configureStore

describe("Playhead Component", () => {
  it('should contain "hidden" in className when appropriate', () => {
    const { container } = render(
      <Provider store={store}>
        <Playhead />
      </Provider>
    );
    
    // Check if "hidden" is in the className of the rendered element
    expect(container.innerHTML).toContain("hidden");
  });
});
