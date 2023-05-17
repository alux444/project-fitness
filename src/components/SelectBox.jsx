import React from "react";

const SelectBox = ({ bodyPart, onChange }) => {
  return (
    <div className="selection-box">
      <label htmlFor={bodyPart} className="material-checkbox">
        <input
          type="checkbox"
          name={bodyPart}
          id={bodyPart}
          onChange={onChange}
        />
        <span className="checkmark" />
        {bodyPart}
      </label>
    </div>
  );
};

export default SelectBox;
