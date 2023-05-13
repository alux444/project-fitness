import React, { useState, useEffect } from "react";
import axios from "axios";
import ExerciseDisplay from "./ExerciseDisplay";
import RandomWorkout from "./RandomWorkout";

const Exercises = ({ targets }) => {
  const [randomWorkout, setRandomWorkout] = useState(false);
  const [desiredAmount, setDesiredAmount] = useState(3);

  //api call to get all exercises as an object
  const [data, setData] = useState([]);

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
        console.log(response.data);
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

  const displays = filteredExercises.map((exercise) => {
    return <ExerciseDisplay key={exercise.id} exercise={exercise} />;
  });

  const generateWorkout = (e) => {
    e.preventDefault();
    setRandomWorkout(true);
  };

  const close = (e) => {
    e.preventDefault();
    setRandomWorkout(false);
  };

  const increaseExercises = (e) => {
    e.preventDefault();
    if (desiredAmount < 6) {
      setDesiredAmount(desiredAmount + 1);
    }
  };

  const decreaseExercises = (e) => {
    e.preventDefault();
    if (desiredAmount > 1) {
      setDesiredAmount(desiredAmount - 1);
    }
  };

  return (
    <div>
      {randomWorkout ? (
        <div>
          <RandomWorkout
            exercises={filteredExercises}
            targets={toFilter}
            desiredAmount={{ desiredAmount }}
          />

          <button onClick={close}>Close</button>
        </div>
      ) : (
        <form>
          <button onClick={generateWorkout}>Generate a random workout!</button>
          <div>
            <small>
              This will generate {desiredAmount} exercise
              {desiredAmount === 1 ? null : "s"} for each selection! Maximum of
              6
            </small>
            <div>
              <button onClick={increaseExercises}>Increase this!</button>
              <button onClick={decreaseExercises}>Decrease this!</button>
            </div>
          </div>
        </form>
      )}
      <h3>Checkout other related exercises!</h3>
      {displays}
    </div>
  );
};

export default Exercises;
