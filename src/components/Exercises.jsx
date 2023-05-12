import React, { useState, useEffect } from "react";
import axios from "axios";

const Exercises = ({ targets }) => {
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
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const a = () => {
    console.log(data);
    console.log(aa);
  };

  const toFilter = targets;

  const filteredExercises = data.filter((exercise) => {
    for (let i = 0; i < toFilter.length; i++) {
      if (exercise.target.includes(toFilter[i])) {
        return exercise;
      }
    }
  });

  return (
    <div>
      <p>hello</p>
      <button onClick={a}>aaa</button>
    </div>
  );
};

export default Exercises;
