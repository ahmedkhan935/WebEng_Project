import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import AddTeacherForm from "./pages/AddTeacherForm";
import AddStudentForm from "./pages/AddStudentFrom";
import MedalHoldersPage from "./pages/MedalHoldersPage";
import DebarList from "./pages/DebarList";
import WarningList from "./pages/WarningList";
import DeansList from "./pages/DeansList";
import RectorsList from "./pages/RectorsList";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserLandingPage from "./pages/UserLandingPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/student" element={<UserLandingPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/adminpanel" element={<LandingPage />}></Route>
          <Route path="/addTeacherForm" element={<AddTeacherForm />}></Route>
          <Route path="/addStudentForm" element={<AddStudentForm />}></Route>
          <Route path="/medalHolders" element={<MedalHoldersPage />}></Route>
          <Route path="/debarlist" element={<DebarList />}></Route>
          <Route path="/warninglist" element={<WarningList />}></Route>
          <Route path="/deanslist" element={<DeansList />}></Route>
          <Route path="/rectorslist" element={<RectorsList />}></Route>
          <Route path="/landingPage" element={<LandingPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
