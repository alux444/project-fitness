import React from "react";
import { Link } from "react-router-dom";

const ExerciseDisplay = ({ exercise }) => {
  //maps an inputted exercise object to a display.
  return (
    <div>
      <div>
        <h5>{exercise.name}</h5>
        <small>{exercise.target}</small>
      </div>
      <img src={exercise.gifUrl} style={{ width: "20%", height: "20%" }} />
      <div>
        <button onClick={() => fetchVideos()}>Learn More!</button>
        <Link to={`/exercise/${exercise.name}`}>Go to Component Page</Link>
      </div>
    </div>
  );
};

export default ExerciseDisplay;
