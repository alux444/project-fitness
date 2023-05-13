import React from "react";
import axios from "axios";

export const getAllExercises = () => {
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_FITNESS_KEY,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  const getData = async () => {
    try {
      const response = await axios.request(options);
      const data = response.data;
      console.log(response.data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const exercises = getData();

  return exercises;
};
