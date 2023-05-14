import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ExerciseDisplay from "./ExerciseDisplay";

const ExercisePage = ({ exercise, handleClose, allData }) => {
  const data = exercise;
  const allExercises = allData;
  const [randomNumber, setRandomNumber] = useState(0);

  const [videos, setVideos] = useState([]);

  //with the youtube api, will call to fetch the data of related vids
  useEffect(() => {
    const fetchVideos = async () => {
      const options = {
        method: "GET",
        url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
        params: { q: `${data.name} exercise tutorial` },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_YOUTUBE_KEY,
          "X-RapidAPI-Host": "youtube-search-results.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setVideos(Object.values(response.data.items).slice(0, 4));
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      console.log(videos);
    };
    fetchVideos();
  }, []);

  //map the values of videos
  const mappedVids = videos.map((video) => (
    <div key={video.id} style={{ display: "inline-block" }}>
      <h5>{video.title}</h5>
      <a href={video.url} target="_blank" rel="noreferrer">
        <img
          src={video.bestThumbnail.url}
          height={video.bestThumbnail.height}
          width={video.bestThumbnail.width}
          style={{ width: "50%", height: "50%" }}
        />
      </a>
    </div>
  ));

  const similarTarget = allExercises.filter((exercise) =>
    exercise.target.includes(data.target)
  );

  const test = () => {
    console.log(videos);
    console.log(data);
    console.log(allExercises);
  };

  //randomly generate 3 exercises that have the same target muscles to display
  const getRandomNumber = () => {
    const num = Math.floor(Math.random() * (similarTarget.length - 4));
    return num;
  };

  const currentExercises = similarTarget.slice(randomNumber, randomNumber + 3);

  const reroll = () => {
    setRandomNumber(getRandomNumber());
  };

  //exercise displays
  const displays = currentExercises.map((exercise) => {
    return (
      <ExerciseDisplay
        key={exercise.id}
        exercise={exercise}
        allData={allData}
      />
    );
  });

  return (
    <div className="exercise-page">
      <button onClick={handleClose}>Close</button>
      <h3>{data.name}</h3>
      <h5>
        {data.target} / {data.bodyPart}
      </h5>
      <img src={data.gifUrl} />
      <button onClick={test}>test</button>
      <div className="exercise-displays">{mappedVids}</div>
      <h4>Exercises that also target {data.target}</h4>
      <div className="exercise-displays">{displays}</div>
      <button onClick={() => reroll()}>Show me some others!</button>
    </div>
  );
};

export default ExercisePage;
