import React from "react";

const RandomWorkout = ({ exercises }) => {
  const numbers = [];
  const length = Object.keys(exercises).length;

  const generateNumber = () => {
    while (numbers.length < 10) {
      const thisNumb = Math.floor(Math.random() * length);
      if (!numbers.includes(thisNumb)) {
        numbers.push(thisNumb);
      }
    }
  };

  generateNumber();
  console.log(numbers);

  return (
    <div>
      <p>Your Workout Is:</p>
    </div>
  );
};

export default RandomWorkout;
