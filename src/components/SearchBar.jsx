import React, {useState, useEffect} from "react";
import axios from "axios";

const SearchBar = ({ handleBack }) => {
  const [searchInput, setSearchInput] = useState("")

  function handleChange(event) {
    setSearchInput(event.target.value)
    console.log(event.target.value)
  }

  useEffect(() => {
    const searchVideos = async () => {
      const options = {
        method: 'GET',
        url: 'https://youtube-search-results.p.rapidapi.com/youtube-search/',
        params: {q: `${searchInput} tutorial`},
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_FITNESS_KEY,
          'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
        }
     };

      try {
        const response = await axios.request(options);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      };
    }
      searchVideos();
  }, []);


  return (
    <div>
      <div className="search-bar">
        <input
          className="search-bar--search"
          type="text"
          placeholder="Search for exercises"
          onChange={handleChange}
          value={searchInput}
        />
      </div>
      
      <button onClick={() => handleBack()}>Return to Select Function!</button>
      <p>hello</p>
    </div>
  );
};

export default SearchBar;
