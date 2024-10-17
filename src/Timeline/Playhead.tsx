// Playhead.tsx

import { useSelector } from "react-redux";

export const Playhead = () => {
  // Use useSelector to get the time and scroll from the Redux store
  const time = useSelector((state: any) => state.time.current);
  const horizontalScroll = useSelector((state: any) => state.scroll.horizontal); // Get horizontal scroll position from Redux

  // Calculate the actual position of the playhead
  const playheadPosition = time - horizontalScroll;

  // Determine the threshold for hiding the playhead
  const threshold = 316;

  // Check if the playhead should be hidden
  const isHidden = playheadPosition < 0 || playheadPosition > threshold;

  return (
    <>
      {!isHidden && (
        <div
          className="absolute left-[316px] h-full border-l-2 border-solid border-yellow-600 z-10"
          data-testid="playhead"
          style={{ transform: `translateX(calc(${playheadPosition}px - 50%))` }}
        >
          <div className="absolute border-solid border-[5px] border-transparent border-t-yellow-600 -translate-x-1.5" />
        </div>
      )}
    </>
  );
};
