import React from "react";
import { useParams } from "react-router-dom";

const ExercisePage = () => {
  const { id } = useParams();
  return (
    <div>
      <p>{id}</p>
      <p>hello</p>
    </div>
  );
};

export default ExercisePage;
