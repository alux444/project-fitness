import React, { useState, useEffect } from "react";
import axios from "axios";

const Exercises = () => {
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

  const target = "quads";
  const newss = data.filter((exercise) => exercise.target === target);
  console.log(newss);

  return (
    <div>
      <p>hello</p>
      <button>aaa</button>
    </div>
  );
};

export default Exercises;
