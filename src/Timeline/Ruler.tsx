// Ruler.tsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHorizontalScroll } from './State.store'; // Adjust the import path as needed

export const Ruler = () => {
  const dispatch = useDispatch();
  const horizontalScroll = useSelector((state: any) => state.scroll.horizontal); // Replace 'any' with your state type

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

  return (
    <div
      id="ruler"
      className="px-4 py-2 min-w-0 
      border-b border-solid border-gray-700 
      overflow-x-auto overflow-y-hidden"
      data-testid="ruler"
      onScroll={handleScroll}
    >
      <div className="w-[2000px] h-6 rounded-md bg-white/25" data-testid="ruler-bar"></div>
    </div>
  );
};
