import React from "react";

const ExerciseDisplay = ({ exercise }) => {
  return (
    <div>
      <h3>{exercise.name}</h3>
      <img src={exercise.gifUrl} style={{ width: "20%", height: "20%" }} />
    </div>
  );
};

export default ExerciseDisplay;
