import React from "react";
import '../styles/brushes.css';

const Brushes = (props) => {
  const { options, selectedBrush, onChange } = props;

  return (
    <div>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            id={option.value}
            name={option.name}
            value={option.value}
            checked={parseInt(selectedBrush) === option.value}
            onChange={onChange}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
}

export default Brushes;
