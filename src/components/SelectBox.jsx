import React from "react";

const SelectBox = ({ bodyPart, onChange }) => {
  return (
    <div className="selection-box">
      <input
        type="checkbox"
        name={bodyPart}
        id={bodyPart}
        onChange={onChange}
      />
      <div>
        <label htmlFor={bodyPart}>{bodyPart}</label>
      </div>
    </div>
  );
};

export default SelectBox;
