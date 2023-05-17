import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ExerciseDisplay from "./ExerciseDisplay";

const ExercisePage = ({ exercise, handleClose, allData }) => {
  const [data, setData] = useState(exercise);
  const allExercises = allData;
  const [randomNumber, setRandomNumber] = useState(0);

  const [videos, setVideos] = useState([]);

  //references for top of page (scrolling), and whole popup (for closing popup when an outside area is clicked)
  const topOfPage = useRef(null);
  const wholePage = useRef(null);

  //with the youtube api, will call to fetch the data of related vids
  useEffect(() => {
    topOfPage.current.scrollIntoView({ behavior: "smooth" });
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
  }, [data]);

  //useEffect to detect if the user clicks out of the popup, if so, close the popup.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wholePage.current && !wholePage.current.contains(e.target)) {
        handleClose();
      }
    };

    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //pageOnClick function for changing exercise when another one is clicked
  const pageOnClick = (exercise) => {
    setData(exercise);
    setVideos([]);
  };

  //map the values of videos
  const mappedVids = videos.map((video) => (
    <div key={video.id} className="video">
      <h5>{video.title}</h5>
      <a href={video.url} target="_blank" rel="noreferrer">
        <img
          src={video.bestThumbnail.url}
          height={video.bestThumbnail.height}
          width={video.bestThumbnail.width}
          className="thumbnail"
        />
      </a>
    </div>
  ));

  const similarTarget = allExercises.filter((exercise) =>
    exercise.target.includes(data.target)
  );

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
        className="page-display"
        key={exercise.id}
        exercise={exercise}
        allData={allData}
        pageOnClick={pageOnClick}
      />
    );
  });

  return (
    <div className="exercise-page" ref={wholePage}>
      <button onClick={handleClose} ref={topOfPage}>
        Close
      </button>
      <h3>{data.name}</h3>
      <h5>
        {data.target} / {data.bodyPart}
      </h5>
      <img src={data.gifUrl} className="gif" />
      <div className="video-displays">{mappedVids}</div>
      <h4>Exercises that also target {data.target}</h4>
      <div className="exercise-displays">{displays}</div>
      <button onClick={() => reroll()}>Show me some others!</button>
    </div>
  );
};

export default ExercisePage;
