// TrackList.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVerticalScroll } from './State.store'; // Adjust the import path as needed

export const TrackList = () => {
  const dispatch = useDispatch();
  const verticalScroll = useSelector((state: any) => state.scroll.vertical); // Replace 'any' with your state type

  useEffect(() => {
    // Set the scroll position when the component mounts
    const container = document.getElementById('track-list');
    if (container) {
      container.scrollTop = verticalScroll;
    }
  }, [verticalScroll]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = event.currentTarget;
    dispatch(setVerticalScroll(scrollTop));
  };

  return (
    <div
      id="track-list"
      className="grid grid-flow-row auto-rows-[40px]
      border-r border-solid border-r-gray-700 
      overflow-auto"
      data-testid="track-list"
      onScroll={handleScroll}
    >
      {['Track A', 'Track B', 'Track C', 'Track D', 'Track E', 'Track F', 'Track G', 'Track H', 'Track I', 'Track J'].map((track) => (
        <div className="p-2" key={track}>
          <div>{track}</div>
        </div>
      ))}
    </div>
  );
};
