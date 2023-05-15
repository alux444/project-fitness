import React, {useState, useEffect} from "react";
import axios from "axios";
import ExerciseDisplay from "./ExerciseDisplay";
import Pagination from "./Pagination";

const SearchBar = ({ handleBack }) => {
  const [searchInput, setSearchInput] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([]);

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
  
  var count = 0;
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
          {filteredData.slice(0, 15).map((val) => {
            return (
              <a /*href={val}*/ target="_blank">
                <p>{val.name} </p>
              </a>
            );
          })}
        </div>
      )}
      </div>
      <button onClick={() => handleBack()}>Return to Select Function!</button>
    </div>
  );
};

export default SearchBar;