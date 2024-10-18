// Playhead.tsx

import { useSelector } from "react-redux";

export const Playhead = () => {
  // Use useSelector to get the time and scroll values from the Redux store
  const time = useSelector((state: any) => state.time.current);
  const horizontal = useSelector((state: any) => state.scroll.horizontal);

  // Calculate the value for the transform
  const transformValue = time - horizontal;

  // Determine if the Playhead should be hidden
  const isHidden = transformValue < 0;

  return (
    <div
      className={`absolute left-[316px] h-full border-l-2 border-solid border-yellow-600 z-10 ${isHidden ? "hidden" : ""}`}
      data-testid="playhead"
      style={{
        transform: `translateX(calc(${time}px - 50% - ${horizontal}px))`
      }}
    >
      <div className="absolute border-solid border-[5px] border-transparent border-t-yellow-600 -translate-x-1.5" />
    </div>
  );
};
