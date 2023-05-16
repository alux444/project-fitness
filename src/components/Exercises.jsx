import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ExerciseDisplay from "./ExerciseDisplay";
import RandomWorkout from "./RandomWorkout";
import Pagination from "./Pagination";

const Exercises = ({ targets, cancel }) => {
  const [randomWorkout, setRandomWorkout] = useState(false);
  const [desiredAmount, setDesiredAmount] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const topOfDisplays = useRef(null);

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
    setDesiredAmount(desiredAmount + 1);
  };

  const decreaseExercises = (e) => {
    e.preventDefault();
    if (desiredAmount > 1) {
      setDesiredAmount(desiredAmount - 1);
    }
  };

  //get current exercises
  const indexOfLastExercise = currentPage * 12;
  const indexOfFirstExercise = indexOfLastExercise - 12;
  const currentExercises = filteredExercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  //paginate layout
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //exercise displays
  const displays = currentExercises.map((exercise) => {
    return (
      <ExerciseDisplay key={exercise.id} exercise={exercise} allData={data} />
    );
  });

  return (
    <div>
      <div>
        <button onClick={cancel}>Close Search</button>
      </div>
      <div className="submitted">
        {randomWorkout ? (
          <div>
            <RandomWorkout
              exercises={filteredExercises}
              targets={toFilter}
              desiredAmount={{ desiredAmount }}
              allData={data}
            />

            <button onClick={close}>Close</button>
          </div>
        ) : (
          <form>
            <button onClick={generateWorkout}>
              Generate a random workout!
            </button>
            <div>
              <small>
                This will generate {desiredAmount} exercise
                {desiredAmount === 1 ? null : "s"} for each selection!
              </small>
              <div>
                <button onClick={increaseExercises}>Increase this!</button>
                <button onClick={decreaseExercises}>Decrease this!</button>
              </div>
            </div>
          </form>
        )}
        <h3 ref={topOfDisplays}>Checkout other related exercises!</h3>
        <div className="exercise-container">{displays}</div>
        <Pagination
          totalDisplay={filteredExercises.length}
          displaysPerPage="12"
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Exercises;
