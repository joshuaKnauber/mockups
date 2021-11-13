import React from 'react';
import { Range } from 'react-range';

export default function Slider({ value, setValue, min, max, step=1 }) {

  return (
    <Range
      step={step}
      min={min}
      max={max}
      values={[value]}
      onChange={(values) => setValue(values[0]) }
      renderTrack={({ props, children }) => (
        <div
          className="rangeBackground"
        >
          <div
            ref={props.ref}
            className="rangeTrack"
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          className="rangeThumb"
        ></div>
      )}
    />
  );
}