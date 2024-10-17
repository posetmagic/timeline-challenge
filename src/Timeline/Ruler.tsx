// Ruler.tsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHorizontalScroll } from './State.store'; // Adjust the import path as needed
import { setTime } from './State.store'; // Import setTime action

export const Ruler = () => {
  const dispatch = useDispatch();
  const horizontalScroll = useSelector((state: any) => state.scroll.horizontal); // Replace 'any' with your state type
  const duration = useSelector((state: any) => state.time.duration); // Get duration from Redux

  // Calculate the width based on the duration
  const rulerWidth = duration;

  useEffect(() => {
    // Set the scroll position when the component mounts
    const container = document.getElementById('ruler');
    if (container) {
      container.scrollLeft = horizontalScroll;
    }
  }, [horizontalScroll]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft } = event.currentTarget;
    dispatch(setHorizontalScroll(scrollLeft));
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX } = event; // Get the x coordinate of the mouse click
    const ruler = document.getElementById('ruler');

    if (ruler) {
      const { left } = ruler.getBoundingClientRect(); // Get the ruler's position
      const clickPosition = clientX - left - 15; // Calculate the click position relative to the ruler
      const currentTime = Math.max(0, Math.min(clickPosition + horizontalScroll, duration)); // Ensure it's within bounds
      dispatch(setTime(currentTime)); // Update the current time in Redux
    }
  };

  return (
    <div
      id="ruler"
      className="px-4 py-2 min-w-0 
      border-b border-solid border-gray-700 
      overflow-x-auto overflow-y-hidden"
      data-testid="ruler"
      onScroll={handleScroll}
      onClick={handleClick}
    >
      <div
        className="h-6 rounded-md bg-white/25"
        style={{ width: `${rulerWidth}px` }}
        data-testid="ruler-bar"
      ></div>
    </div>
  );
};
