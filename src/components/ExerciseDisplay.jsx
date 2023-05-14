import React, { useState } from "react";
import ExercisePage from "./ExercisePage";

const ExerciseDisplay = ({ exercise, allData }) => {
  const [more, setMore] = useState(false);

  const handleMore = () => {
    console.log(more);
    setMore(!more);
  };

  //maps an inputted exercise object to a display.
  return (
    <div className="exercise-item">
      <div>
        <h5>{exercise.name}</h5>
        <small>{exercise.target}</small>
      </div>
      <img src={exercise.gifUrl} style={{ width: "40%", height: "40%" }} />
      <div className="parent">
        <button onClick={() => handleMore()}>Learn More!</button>

        {more ? (
          <ExercisePage
            exercise={exercise}
            handleClose={handleMore}
            allData={allData}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ExerciseDisplay;
