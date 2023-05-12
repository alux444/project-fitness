import React from "react";

const SelectBox = ({ bodyPart, onChange }) => {
  return (
    <div>
      <label htmlFor={bodyPart}>{bodyPart}</label>
      <input
        type="checkbox"
        name={bodyPart}
        id={bodyPart}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectBox;
