import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserLandingPage from "./pages/UserLandingPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/student" element = { <UserLandingPage /> } ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
