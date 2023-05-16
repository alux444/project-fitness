import React, { useState } from "react";
import SelectBox from "./SelectBox";
import SearchBar from "./SearchBar";
import Exercises from "./Exercises";

const SelectExercises = () => {
  //creates a state for if data is submitted
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState(false);

  //initially sets every selected exercise to false.
  const initial = {
    //legs
    abductors: false,
    adductors: false,
    glutes: false,
    hamstrings: false,
    quads: false,
    calves: false,
    //chest and shoulders
    pectorals: false,
    delts: false,
    //arms
    biceps: false,
    triceps: false,
    forearms: false,
    //back
    upperBack: false,
    traps: false,
    lats: false,
    scapulae: false,
    //other
    abs: false,
    spine: false,
    serratus: false,
    cardio: false,
  };

  const legs = [
    "abductors",
    "adductors",
    "glutes",
    "hamstrings",
    "quads",
    "calves",
  ];
  const arms = ["pectorals", "delts", "biceps", "triceps", "forearms"];
  const back = ["upper back", "traps", "scapulae", "lats"];
  const other = ["abs", "spine", "serratus", "cardio"];

  const [selectedMuscles, setSelectedMuscles] = useState(initial);
  const [final, setFinal] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(selectedMuscles);
    const submittedMuscles = Object.keys(selectedMuscles).filter(
      (key) => selectedMuscles[key]
    );
    setFinal(submittedMuscles);
    if (submitted === true) {
      cancelSearch();
    }
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  const handleSelect = (e) => {
    const { name } = e.target;
    setSelectedMuscles({ ...selectedMuscles, [name]: !selectedMuscles[name] });
  };

  const handleToSearch = () => {
    setSearch(!search);
    setSubmitted(false);
  };

  const cancelSearch = () => {
    setSubmitted(false);
  };

  const mappedLegs = legs.map((muscle) => {
    return <SelectBox bodyPart={muscle} onChange={handleSelect} />;
  });
  const mappedArms = arms.map((muscle) => {
    return <SelectBox bodyPart={muscle} onChange={handleSelect} />;
  });
  const mappedBack = back.map((muscle) => {
    return <SelectBox bodyPart={muscle} onChange={handleSelect} />;
  });
  const mappedOther = other.map((muscle) => {
    return <SelectBox bodyPart={muscle} onChange={handleSelect} />;
  });

  return (
    <div>
      {search ? (
        <SearchBar handleBack={handleToSearch} />
      ) : (
        <>
          <h2>Select your muscle groups</h2>
          <button onClick={() => handleToSearch()}>
            Or use our search function!
          </button>
          <form>
            <div className="selections">
              {mappedLegs}
              {mappedArms}
              {mappedBack}
              {mappedOther}
            </div>
            <div>
              <button onClick={handleFormSubmit}>Submit</button>
            </div>
          </form>
        </>
      )}
      {submitted ? <Exercises targets={final} cancel={cancelSearch} /> : null}
    </div>
  );
};

export default SelectExercises;
