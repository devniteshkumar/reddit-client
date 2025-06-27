import React from "react";
import Lane from './lane.jsx'

function LContainer() {
  const numLanes = 2;
  const lanes = Array.from({ length: numLanes });

  return (
    <div className="flex-grow mr-[100px] flex">
      {lanes.map((_, index) => (
        <div
          key={index}
          style={{ width: `${100 / numLanes}%` }}
        >
          <Lane />
        </div>
      ))}
    </div>
  );
}

export default LContainer;
