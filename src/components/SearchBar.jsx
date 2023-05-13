import React from "react";

const SearchBar = ({ handleBack }) => {
  return (
    <div>
      <h1>Search for exercises</h1>
      <button onClick={() => handleBack()}>Return to Select Function!</button>
      <p>hello</p>
    </div>
  );
};

export default SearchBar;
