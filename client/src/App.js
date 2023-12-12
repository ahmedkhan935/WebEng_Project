import "./assets/styles/App.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
