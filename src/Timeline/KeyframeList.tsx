// KeyframeList.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHorizontalScroll } from './State.store'; // Adjust the import path as needed
import { Segment } from "./Segment";

export const KeyframeList = () => {
  const dispatch = useDispatch();
  const horizontalScroll = useSelector((state: any) => state.scroll.horizontal); // Replace 'any' with your state type

  useEffect(() => {
    // Set the scroll position when the component mounts
    const container = document.getElementById('keyframe-list');
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
      id="keyframe-list"
      className="px-4 min-w-0 overflow-auto"
      data-testid="keyframe-list"
      onScroll={handleScroll}
    >
      {[...Array(10)].map((_, index) => (
        <Segment key={index} />
      ))}
    </div>
  );
};
