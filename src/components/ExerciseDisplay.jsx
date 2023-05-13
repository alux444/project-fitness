import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExerciseDisplay = ({ exercise }) => {
  const [videos, setVideos] = useState([]);
  const [showVideos, setShowVideos] = useState(false);
  //with the youtube api, will call to fetch the data of related vids
  const fetchVideos = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
      params: { q: `${exercise.name} exercise tutorial` },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_YOUTUBE_KEY,
        "X-RapidAPI-Host": "youtube-search-results.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setVideos(response.data);
    } catch (error) {
      console.error(error);
    }
    console.log(videos);
  };
  //maps an inputted exercise object to a display.
  return (
    <div>
      <div>
        <h5>{exercise.name}</h5>
        <small>{exercise.target}</small>
      </div>
      <img src={exercise.gifUrl} style={{ width: "20%", height: "20%" }} />
      <div>
        <button onClick={() => fetchVideos()}>Learn More!</button>
        <Link to={`/exercise/${exercise.id}`}>Go to Component Page</Link>
      </div>
    </div>
  );
};

export default ExerciseDisplay;
