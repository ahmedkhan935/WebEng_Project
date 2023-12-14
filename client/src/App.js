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
import ViewStudents from "./pages/ViewStudentS";
import ViewTeachers from "./pages/ViewTeachers";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserLandingPage from "./pages/UserLandingPage";
import Classroom from "./pages/Classroom";

import { ThemeProvider } from "@mui/material";
import theme from "./assets/theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>

          <Route path="student">
            <Route index element={<UserLandingPage />}></Route>
            <Route path="classes/:id" element={<Classroom />}></Route>
          </Route>

          <Route path="/admin">
            <Route index element={<LandingPage />}></Route>
            <Route path="addTeacher" element={<AddTeacherForm />}></Route>
            <Route path="addStudent" element={<AddStudentForm />}></Route>
            <Route path="viewTeachers" element={<ViewTeachers />}></Route>
            <Route path="viewStudents" element={<ViewStudents />}></Route>

            <Route path="list">
              <Route path="debar" element={<DebarList />}></Route>
              <Route path="warning" element={<WarningList />}></Route>
              <Route path="deans" element={<DeansList />}></Route>
              <Route path="rectors" element={<RectorsList />}></Route>
              <Route path="medalHolders" element={<MedalHoldersPage />}></Route>
              <Route path="teachers" element={<ViewTeachers />}></Route>
              <Route path="students" element={<ViewStudents />}></Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
