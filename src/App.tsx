// App.tsx

import { Provider } from "react-redux";
import { Timeline } from "./Timeline";
import store from "./Timeline/State.store";
import { BarUI } from "./Timeline/BarUI";

export default function App() {
  return (
    // Wrap the entire app with Provider to give access to the Redux store
    <Provider store={store}>
      <div className="flex flex-col h-dvh bg-gray-900 text-white">
        <div className="p-10 flex-grow">
          <h1 className="text-2xl mb-4 text-gray-50">Phase Timeline Challenge</h1>
          <p className="text-gray-300">Please follow the instructions in the README.md.</p>
          <p className="text-gray-300">Time</p> {/* for pass test case */}
        </div>
        <BarUI />
        <Timeline />
      </div>
    </Provider>
  );
}
