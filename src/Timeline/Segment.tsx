// Segment.tsx

import React from "react";
import { useSelector } from "react-redux";

export const Segment: React.FC = () => {
  // Get the duration from the Redux store
  const duration = useSelector((state: any) => state.time.duration);

  // Calculate the width based on the duration
  const segmentWidth = duration;

  return (
    <div style={{ width: `${segmentWidth}px` }} className="py-2" data-testid="segment">
      <div className="h-6 rounded-md bg-white/10"></div>
    </div>
  );
};
