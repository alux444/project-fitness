import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ExercisePage = () => {
  const { id } = useParams();

  const [videos, setVideos] = useState([]);

  //with the youtube api, will call to fetch the data of related vids
  useEffect(() => {
    const fetchVideos = async () => {
      const options = {
        method: "GET",
        url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
        params: { q: `${id} exercise tutorial` },
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
    <div key={video.id}>
      <h5>{video.title}</h5>
      <img
        src={video.bestThumbnail.url}
        height={video.bestThumbnail.height}
        width={video.bestThumbnail.width}
      />
      {/* <iframe
        width="560"
        height="315"
        src={video.url}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe> */}
      <a href={video.url} target="_blank">
        Link to Video!
      </a>
    </div>
  ));

  const test = () => {
    console.log(videos);
  };

  return (
    <div>
      <p>{id}</p>
      <button onClick={test}>test</button>
      {mappedVids}
    </div>
  );
};

export default ExercisePage;
