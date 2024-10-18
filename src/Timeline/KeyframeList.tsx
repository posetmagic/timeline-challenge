// KeyframeList.tsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHorizontalScroll, setVerticalScroll } from './State.store';
import { Segment } from "./Segment";

export const KeyframeList = () => {
  const dispatch = useDispatch();
  const horizontalScroll = useSelector((state: any) => state.scroll.horizontal);
  const verticalScroll = useSelector((state: any) => state.scroll.vertical);

  useEffect(() => {
    const container = document.getElementById('keyframe-list');
    if (container) {
      container.scrollLeft = horizontalScroll;
    }
  }, [horizontalScroll]);

  useEffect(() => {
    const container = document.getElementById('keyframe-list');
    if (container) {
      container.scrollTop = verticalScroll;
    }
  }, [verticalScroll]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollTop } = event.currentTarget;
    dispatch(setHorizontalScroll(scrollLeft));
    dispatch(setVerticalScroll(scrollTop));
  };

  //
  // better design: should not set to 10 but follow the number of Track List Number
  // skip due to not in homework item
  //

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
