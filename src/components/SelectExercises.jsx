import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox";
import Exercises from "./Exercises";

const SelectExercises = () => {
  //creates a state for if data is submitted
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitted(true);
  };

  const handleSelect = (e) => {
    const { name } = e.target;
    setSelectedMuscles({ ...selectedMuscles, [name]: !selectedMuscles[name] });
  };

  const mappedLegs = legs.map((muscle) => (
    <SelectBox bodyPart={muscle} onChange={handleSelect} />
  ));
  const mappedArms = arms.map((muscle) => (
    <SelectBox bodyPart={muscle} onChange={handleSelect} />
  ));
  const mappedBack = back.map((muscle) => (
    <SelectBox bodyPart={muscle} onChange={handleSelect} />
  ));
  const mappedOther = other.map((muscle) => (
    <SelectBox bodyPart={muscle} onChange={handleSelect} />
  ));

  return (
    <div>
      <h1>Select your muscle groups</h1>
      <form>
        <div style={{ display: "inline-block" }}>
          {mappedLegs}
          {mappedArms}
          {mappedBack}
          {mappedOther}
        </div>
        <div>
          <button onClick={handleFormSubmit}>Submit</button>
        </div>
      </form>
      {submitted ? <Exercises targets={final} /> : null}
    </div>
  );
};

export default SelectExercises;
