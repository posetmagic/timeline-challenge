// Ruler.tsx

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHorizontalScroll } from './State.store'; // Adjust the import path as needed
import { setTime } from './State.store'; // Import setTime action

export const Ruler = () => {
  const dispatch = useDispatch();
  const horizontalScroll = useSelector((state: any) => state.scroll.horizontal); // Replace 'any' with your state type
  const duration = useSelector((state: any) => state.time.duration); // Get duration from Redux

  // Calculate the width based on the duration
  const rulerWidth = duration;

  // Local state to track dragging
  const [isDragging, setIsDragging] = useState(false);

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

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    // Start dragging
    setIsDragging(true);
    updateCurrentTime(event); // Update immediately on mouse down
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      updateCurrentTime(event); // Update while dragging
    }
  };

  const handleMouseUp = () => {
    // Stop dragging
    setIsDragging(false);
  };

  const updateCurrentTime = (event: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    const ruler = document.getElementById('ruler');
    if (ruler) {
      const { left } = ruler.getBoundingClientRect(); // Get the ruler's position
      const clickPosition = event instanceof MouseEvent
        ? event.clientX - left - 15 // If event is a MouseEvent
        : event.nativeEvent.clientX - left - 15; // Otherwise, extract from native event
      const currentTime = Math.max(0, Math.min(clickPosition + horizontalScroll, duration)); // Ensure it's within bounds
      dispatch(setTime(currentTime)); // Update the current time in Redux
    }
  };

  useEffect(() => {
    // Attach mousemove and mouseup event listeners to the window
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]); // Add isDragging to dependencies to ensure the effect runs when dragging starts or stops

  return (
    <div
      id="ruler"
      className="px-4 py-2 min-w-0 
      border-b border-solid border-gray-700 
      overflow-x-auto overflow-y-hidden"
      data-testid="ruler"
      onScroll={handleScroll}
      onMouseDown={handleMouseDown} // Add onMouseDown to initiate dragging
    >
      <div
        className="h-6 rounded-md bg-white/25"
        style={{ width: `${rulerWidth}px` }}
        data-testid="ruler-bar"
      ></div>
    </div>
  );
};
