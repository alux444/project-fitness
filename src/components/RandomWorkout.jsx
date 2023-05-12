import React, { useState, useEffect } from "react";
import ExerciseDisplay from "./ExerciseDisplay";
import { all } from "axios";

const RandomWorkout = ({ exercises, targets, desiredAmount }) => {
  const [workout, setWorkout] = useState([]);

  //destructuring the large exercise array into one for each respective bodypart.
  const allParts = targets;
  const mappedTargets = [];

  const mapAll = () => {
    for (let i = 0; i < allParts.length; i++) {
      mappedTargets.push(
        exercises.filter((exercise) => exercise.target.includes(allParts[i]))
      );
    }
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
    return newNumbers;
  };

  const amount = desiredAmount;

  const test = (e) => {
    console.log(workout);
  };

  //creates a number arrays variable, containing 2 seperate arrays of numbers for each respective exercise to be mapped
  const numberArrays = [];
  const mapNumbers = () => {
    for (let i = 0; i < allParts.length; i++) {
      numberArrays.push(
        generateNumber(
          Object.keys(mappedTargets[i]).length,
          amount.desiredAmount
        )
      );
    }
  };

  //finally, map everything to get a display for the random exercises.
  const createWorkout = () => {
    const work = [];
    for (let i = 0; i < allParts.length; i++) {
      for (let j = 0; j < amount.desiredAmount; j++) {
        work.push(mappedTargets[i][j]);
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
