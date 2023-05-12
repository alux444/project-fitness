import React, { useState, useEffect } from "react";
import ExerciseDisplay from "./ExerciseDisplay";

const RandomWorkout = ({ exercises }) => {
  const [numbers, setNumbers] = useState([]);
  const length = Object.keys(exercises).length;

  const newNumbers = [];
  const generateNumber = () => {
    while (newNumbers.length < 6) {
      const tempNumber = Math.floor(Math.random() * length);

      if (!newNumbers.includes(tempNumber)) {
        newNumbers.push(tempNumber);
      }
    }
    setNumbers(newNumbers);
  };

  useEffect(() => {
    generateNumber();
  }, []);

  return (
    <div>
      <p>Your Workout Is:</p>
      <div style={{ display: "flex", gap: "20px" }}>
        {numbers === []
          ? null
          : numbers.map((number) => (
              <ExerciseDisplay key={number} exercise={exercises[number]} />
            ))}
      </div>
      <button onClick={() => generateNumber()}>Reroll!</button>
    </div>
  );
};

export default RandomWorkout;
