import "./App.css";
import SelectExercises from "./components/SelectExercises";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="all-items">
      <Header />
      <SelectExercises />
      <Footer />
    </div>
  );
}

export default App;
