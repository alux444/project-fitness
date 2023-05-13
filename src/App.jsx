import "./App.css";
import ExercisePage from "./components/ExerciseDisplay";
import SelectExercises from "./components/SelectExercises";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <h1>React Fitness Site</h1>
        <SelectExercises />
        <Routes>
          <Route path="/exercise/:id" component={ExercisePage} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
