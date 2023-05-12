import React from "react";

const ExerciseDisplay = ({ exercise }) => {
  return (
    <div>
      <div>
        <h5>{exercise.name}</h5>
        <small>{exercise.target}</small>
      </div>
      <img src={exercise.gifUrl} style={{ width: "20%", height: "20%" }} />
    </div>
  );
};

export default ExerciseDisplay;
