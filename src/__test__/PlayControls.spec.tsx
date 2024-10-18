// src/__tests__/PlayControls.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { PlayControls } from "../Timeline/PlayControls"; // Adjust the import based on your structure
import store from "../Timeline/State.store"; // Adjust according to your actual reducer file

//
// core check, is there "select"
//

describe("PlayControls Component", () => {
  test("focuses current input and calls select()", () => {
    render(
      <Provider store={store}>
        <PlayControls />
      </Provider>
    );

    // Get the current input
    const currentInput = screen.getByTestId("current-time-input") as HTMLInputElement;

    // Create a spy for the select method
    const selectSpy = jest.spyOn(currentInput, 'select');

    // Simulate the focus event
    fireEvent.focus(currentInput);

    // Use a timeout to allow the focus to propagate
    setTimeout(() => {
      // Assert that the input is focused
      expect(currentInput).toHaveFocus();

      // Assert that select() was called when the input was focused
      expect(selectSpy).toHaveBeenCalled();

      // Cleanup the spy
      selectSpy.mockRestore();
    }, 0);
  });
});
