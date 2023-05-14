import React, { useState, useEffect } from "react";
import ExerciseDisplay from "./ExerciseDisplay";

const RandomWorkout = ({ exercises, targets, desiredAmount, allData }) => {
  const [workout, setWorkout] = useState([]);
  const [seperatedExercises, setSeperatedExercises] = useState({});
  const [randomNumbers, setRandomNumbers] = useState({});
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(false);
  const [error, setError] = useState(false);

  // if (error) {
  //   return (
  //     <div>
  //       <p>
  //         Sorry, one of the bodyparts you listed doesnt have enough exercises.
  //       </p>
  //     </div>
  //   );
  // }

  const allParts = targets;
  const amount = desiredAmount;

  //upon rendering, runs all necessary functions
  useEffect(() => {
    //destructuring the large exercise array into one for each respective bodypart.
    const mapAll = () => {
      console.log(allParts.length);
      const mappedTargets = [];
      for (let i = 0; i < allParts.length; i++) {
        mappedTargets.push(
          exercises.filter((exercise) => exercise.target.includes(allParts[i]))
        );
      }
      console.log("mapped");

      for (let i = 0; i < allParts.length; i++) {
        let errors = 0;
        if (mappedTargets[i].length < desiredAmount.desiredAmount) {
          setError(true);
          console.log("error set to true");
          errors++;
        }
        if (errors === 0) {
          setSeperatedExercises(mappedTargets);
        }
      }
    };

    setTimeout(() => {
      mapAll();
    }, 2000);
  }, []);

  useEffect(() => {
    //creates a number arrays variable, containing 2 seperate arrays of numbers for each respective exercise to be mapped
    const mapNumbers = () => {
      console.log(seperatedExercises);
      const numberArrays = [];
      for (let i = 0; i < allParts.length; i++) {
        numberArrays.push(
          generateNumber(
            Object.keys(seperatedExercises[i]).length,
            amount.desiredAmount
          )
        );
      }
      console.log("generated");
      setRandomNumbers(numberArrays);
    };

    console.log(seperatedExercises);
    if (Object.keys(seperatedExercises).length > 0) {
      mapNumbers();
      console.log("mapping");
    }
  }, [seperatedExercises, reset]);

  useEffect(() => {
    //finally, map everything to get a display for the random exercises.
    const createWorkout = () => {
      console.log(randomNumbers);
      const work = [];
      for (let i = 0; i < allParts.length; i++) {
        for (let j = 0; j < amount.desiredAmount; j++) {
          work.push(seperatedExercises[i][randomNumbers[i][j]]);
        }
      }
      return work;
    };

    setTimeout(() => {
      if (randomNumbers.length > 0) {
        setWorkout(createWorkout());
      }
    });
    setLoading(false);
  }, [randomNumbers]);

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

  //maps the final workout to the display
  const program = workout.map((exercise) => {
    return (
      <ExerciseDisplay
        key={exercise.id}
        exercise={exercise}
        allData={allData}
      />
    );
  });

  const reroll = () => {
    setReset(!reset);
  };

  return (
    <div>
      {error ? (
        <div>
          <small>
            Sorry, one of your exercises didn't have enough exercises avaliable.
          </small>
        </div>
      ) : (
        <div>
          {loading ? <p>Loading...</p> : <p>Your Workout Is:</p>}
          <div className="selections">{program}</div>
          <button onClick={() => reroll()}>Reroll!</button>
        </div>
      )}
    </div>
  );
};

export default RandomWorkout;
