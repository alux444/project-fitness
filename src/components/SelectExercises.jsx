import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox";
import Exercises from "./Exercises";

const SelectExercises = () => {
  const [submitted, setSubmitted] = useState(false);

  const initial = {
    //legs
    abductors: false,
    adductors: false,
    glutes: false,
    hamstrings: false,
    quads: false,
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
    scapula: false,
    //other
    abs: false,
    spine: false,
    serratus: false,
    cardio: false,
  };

  const legs = ["abductors", "adductors", "glutes", "hamstrings", "quads"];
  const arms = ["chest", "shoulders", "biceps", "triceps", "forearms"];
  const back = ["upperBack", "traps", "scapula", "lats"];
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
