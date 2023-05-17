import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ExerciseDisplay from "./ExerciseDisplay";
import Pagination from "./Pagination";

const SearchBar = ({ handleBack }) => {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const topPage = useRef(null);

  function handleChange(event) {
    setSearchInput(event.target.value);
    setCurrentPage(1);
  }

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

  //filtering data
  const filteredData = data.filter((val) => {
    if (val.name.toLowerCase().includes(searchInput.toLowerCase())) {
      return val;
    }
  });

  //paginate layout
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setTimeout(() => {
      topPage.current.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  //get current exercises
  const indexOfLastExercise = currentPage * 16;
  const indexOfFirstExercise = indexOfLastExercise - 16;
  const currentExercises = filteredData.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  //exercise displays
  const displays = currentExercises.map((exercise) => {
    return (
      <ExerciseDisplay key={exercise.id} exercise={exercise} allData={data} />
    );
  });

  return (
    <div>
      <button ref={topPage} onClick={() => handleBack()}>
        Return to Select Function!
      </button>
      <div className="search-bar">
        <input
          className="search-bar--input"
          type="text"
          placeholder="Enter exercise"
          onChange={handleChange}
          value={searchInput}
        />
      </div>

      {filteredData.length != 0 ? (
        <div>
          <div className="exercise-container">{displays}</div>

          <Pagination
            totalDisplay={filteredData.length}
            displaysPerPage="16"
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      ) : (
        <p>Sorry, no exercises matched your search :(</p>
      )}
    </div>
  );
};

export default SearchBar;
