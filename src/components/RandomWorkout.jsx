import React, { useState, useEffect } from "react";
import ExerciseDisplay from "./ExerciseDisplay";
import { all } from "axios";

const RandomWorkout = ({ exercises, targets, desiredAmount }) => {
  const [workout, setWorkout] = useState([]);
  const [seperatedExercises, setSeperatedExercises] = useState({});
  const [randomNumbers, setRandomNumbers] = useState({});

  //destructuring the large exercise array into one for each respective bodypart.
  const allParts = targets;

  const mapAll = () => {
    const mappedTargets = [];
    for (let i = 0; i < allParts.length; i++) {
      mappedTargets.push(
        exercises.filter((exercise) => exercise.target.includes(allParts[i]))
      );
    }
    console.log(mappedTargets);
    setSeperatedExercises(mappedTargets);
  };

  //generates an array of non repeated numbers, based on an inputted length and desired length of the array.
  const generateNumber = (lengthOfMappedTargets, desiredAmount) => {
    const newNumbers = [];
    while (newNumbers.length < desiredAmount) {
      const tempNumber = Math.floor(Math.random() * lengthOfMappedTargets);

      if (!newNumbers.includes(tempNumber)) {
        newNumbers.push(tempNumber);
      }
    }
    console.log(newNumbers);
    return newNumbers;
  };

  const amount = desiredAmount;

  const test = (e) => {
    console.log(seperatedExercises);
    console.log(randomNumbers);
    console.log(randomNumbers[0][2]);
  };

  //creates a number arrays variable, containing 2 seperate arrays of numbers for each respective exercise to be mapped

  const mapNumbers = () => {
    const numberArrays = [];
    for (let i = 0; i < allParts.length; i++) {
      numberArrays.push(
        generateNumber(
          Object.keys(seperatedExercises[i]).length,
          amount.desiredAmount
        )
      );
    }
    setRandomNumbers(numberArrays);
  };

  //finally, map everything to get a display for the random exercises.
  const createWorkout = () => {
    const work = [];
    for (let i = 0; i < allParts.length; i++) {
      for (let j = 0; j < amount.desiredAmount; j++) {
        work.push(seperatedExercises[i][randomNumbers[i][j]]);
      }
    }
    return work;
  };

  //upon rendering, runs all necessary functions
  useEffect(() => {
    mapAll();
    mapNumbers();
    setWorkout(createWorkout());
  }, []);

  //maps the final workout to the display
  const program = workout.map((exercise) => (
    <ExerciseDisplay key={exercise.id} exercise={exercise} />
  ));

  const reroll = () => {
    mapNumbers();
    setWorkout(createWorkout());
  };

  return (
    <div>
      <button onClick={test}>aaa</button>
      <p>Your Workout Is:</p>
      <div style={{ display: "flex", gap: "20px" }}>{program}</div>
      <button onClick={() => reroll()}>Reroll!</button>
    </div>
  );
};

export default RandomWorkout;
