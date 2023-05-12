import React, { useState } from "react";
import axios from "axios";

const getData = async () => {
  const [data, setData] = useState([]);

  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_FITNESS_KEY,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    setData(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }

  return data;
};

export default getData;
