import React, { useState, useEffect } from "react";
import axios from "axios";
import ExerciseDisplay from "./ExerciseDisplay";
import RandomWorkout from "./RandomWorkout";

const Exercises = ({ targets }) => {
  const [data, setData] = useState([]);
  const [randomWorkout, setRandomWorkout] = useState(false);

  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_FITNESS_KEY,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.request(options);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const toFilter = targets;

  const filteredExercises = data.filter((exercise) => {
    for (let i = 0; i < toFilter.length; i++) {
      if (exercise.target.includes(toFilter[i])) {
        return exercise;
      }
    }
  });

  const displays = filteredExercises.map((exercise) => (
    <ExerciseDisplay key={exercise.id} exercise={exercise} />
  ));

  const generateWorkout = (e) => {
    e.preventDefault();
    setRandomWorkout(true);
  };

  const close = (e) => {
    e.preventDefault();
    setRandomWorkout(false);
  };

  return (
    <div>
      <form>
        <button onClick={generateWorkout}>Generate a random workout!</button>
      </form>
      {randomWorkout ? (
        <div>
          <RandomWorkout exercises={filteredExercises} />

          <button onClick={close}>Close</button>
        </div>
      ) : null}
      <h3>Checkout other related exercises!</h3>
      {displays}
    </div>
  );
};

export default Exercises;
