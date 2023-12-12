import "./assets/styles/App.css";
import MainPage from "./pages/MainPage";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserLandingPage from "./pages/UserLandingPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/student" element = { <UserLandingPage /> } ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
