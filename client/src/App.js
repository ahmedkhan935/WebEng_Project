import "./App.css";
import MainPage from "./pages/MainPage";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
