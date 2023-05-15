import React, {useState, useEffect} from "react";
import axios from "axios";
import ExerciseDisplay from "./ExerciseDisplay";
import Pagination from "./Pagination";


const SearchBar = ({ handleBack }) => {
  const [searchInput, setSearchInput] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  function handleChange(event) {
    setSearchInput(event.target.value)
    setFilteredData(data.filter((val) => {
      if (val.name.toLowerCase().includes(searchInput.toLowerCase())) {
        return val
      }
    }))
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
 
  //paginate layout
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setTimeout(() => {
      topOfDisplays.current.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  };


  //get current exercises
  const indexOfLastExercise = currentPage * 12;
  const indexOfFirstExercise = indexOfLastExercise - 12;
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
      <div className="search-bar">
        <input
          className="search-bar--input"
          type="text"
          placeholder="Enter exercise"
          onChange={handleChange}
          value={searchInput}
        />
     
      {filteredData.length != 0 && (
        <div>
          {filteredData.map((val) => {
            return (
              <ExerciseDisplay
                exercise={val}
                allData={data}
              />
            );
          })}
        </div>
      )}
      <Pagination
        totalDisplay={filteredData.length}
        displaysPerPage="12"
        paginate={paginate}
        currentPage={currentPage}
      />
      </div>
      <button onClick={() => handleBack()}>Return to Select Function!</button>
    </div>
  );
};


export default SearchBar;