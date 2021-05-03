import { Route } from "react-router";
import "./App.css";
import Movie from "./pages/movie";
import Movies from "./pages/movies";
function App() {
  return (
    <div className="App">
      <Route path="/" component={Movies} exact />
      <Route path="/movie/:id" component={Movie} />
    </div>
  );
}

export default App;
