import "./App.css";
import ExercisePage from "./components/ExercisePage";
import SelectExercises from "./components/SelectExercises";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SelectExercises />} />
          <Route path="/exercise/:id" element={<ExercisePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
