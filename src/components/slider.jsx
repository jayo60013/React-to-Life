import React from "react";
import ReactSlider from "react-slider";
import '../styles/slider.css';

const Slider = (props) => {
  return (
    <ReactSlider
      className="horizontal-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      {...props}
    />
  );
};

export default Slider;
