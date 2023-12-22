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
import Threads from "./pages/Threads";
import Thread from "./pages/Thread";
import CreateCourseForm from "./pages/CreateCourseForm";
import SearchCourses from "./pages/SearchCourses";
import Settings from "./pages/Settings";
//import { ThemeProvider } from "@mui/material";
//import theme from "./assets/theme/theme";
import { CSThemeProvider } from "./assets/theme/CSThemeProvider"; //Custom Clean Slate theme provider

import UpdateStudentForm from "./pages/UpdateStudentForm";
import UpdateCourseForm from "./pages/updateCourse";
import ViewLogs from "./pages/ViewLog";
import ViewFeedback from "./pages/viewFeedBack";
import UpdateTeacherForm from "./pages/updateTeacher";
import Classes from "./pages/Classes";
import AdminThread from "./pages/AdminThread";
import TeacherFeedback from "./pages/TeacherFeedback";
import GiveFeedback from "./pages/giveFeedback";

function App() {
  return (
    <CSThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login/student" element={<LoginPage />}></Route>
          <Route path="/login/teacher" element={<LoginPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/admin/settings" element={<Settings />}></Route>
          <Route path="/student/settings" element={<Settings />}></Route>
          <Route path="/teacher/settings" element={<Settings />}></Route>

          <Route path="student">
            <Route index element={<UserLandingPage role={"student"} />}></Route>
            <Route path="classes" element={<Classes />}></Route>
            <Route path="classes/:classCode" element={<Classroom />}></Route>
            <Route path="threads" element={<Threads />}></Route>
            <Route path="threads/:id" element={<Thread />}></Route>
            <Route path="givefeedback" element={<GiveFeedback />}></Route>
          </Route>

          <Route path="teacher">
            <Route index></Route>
            <Route path="teacherFeedback" element={<TeacherFeedback />}></Route>
          </Route>

          <Route path="/admin">
            <Route index element={<LandingPage />}></Route>
            <Route path="threads/:id" element={<AdminThread />}></Route>
            <Route path="addTeacher" element={<AddTeacherForm />}></Route>
            <Route path="addStudent" element={<AddStudentForm />}></Route>
            <Route
              path="updateStudent/:id"
              element={<UpdateStudentForm />}
            ></Route>
            <Route
              path="updateTeacher/:id"
              element={<UpdateTeacherForm />}
            ></Route>
            <Route path="viewTeachers" element={<ViewTeachers />}></Route>
            <Route path="viewStudents" element={<ViewStudents />}></Route>
            <Route path="createCourse" element={<CreateCourseForm />}></Route>
            <Route path="searchCourses" element={<SearchCourses />}></Route>

            <Route
              path="updateCourse/:id"
              element={<UpdateCourseForm />}
            ></Route>
            <Route path="viewLogs" element={<ViewLogs />}></Route>
            <Route path="viewFeedbacks" element={<ViewFeedback />}></Route>

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
    </CSThemeProvider>
  );
}

export default App;
