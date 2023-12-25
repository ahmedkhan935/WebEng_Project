import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { CSThemesProvider } from "./assets/theme/CSThemesProvider"; //Custom Clean Slate theme provider
import { ClassroomProvider } from "./context/ClassroomContext";

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
import UserLandingPage from "./pages/UserLandingPage";
import Classroom from "./pages/Classroom";
import Threads from "./pages/Threads";
import Thread from "./pages/Thread";
import CreateCourseForm from "./pages/CreateCourseForm";
import SearchCourses from "./pages/SearchCourses";
import Settings from "./pages/Settings";
import UpdateStudentForm from "./pages/UpdateStudentForm";
import UpdateCourseForm from "./pages/updateCourse";
import ViewLogs from "./pages/ViewLog";
import ViewFeedback from "./pages/viewFeedBack";
import UpdateTeacherForm from "./pages/updateTeacher";
import Classes from "./pages/Classes";
import AdminThread from "./pages/AdminThreadPosts";
import TeacherFeedback from "./pages/TeacherFeedback";
import GiveFeedback from "./pages/giveFeedback";
import AdminThreads from "./pages/AdminThreads";
import PageNotFound from "./pages/PageNotFound";
import AdminLists from "./pages/AdminLists";
import VideoCall from "./pages/MakeVideoCall";
import Attendance from "./pages/Attendance";
import Evaluations from "./pages/Evaluations";
import AssignCourses from "./pages/AssignCourses";
import AddDegree from "./pages/AddDegree";
import ViewDegrees from "./pages/ViewDegrees";
import ViewAttendance from "./pages/ViewAttendance";
import ViewEvaluations from "./pages/ViewEvaluations";
import ViewAllAttendance from "./pages/ViewAllAttendance";
import DegreeCourseSelection from "./pages/DegreeCourseSelection";
import AdminLoginPage from "./pages/AdminLogin";

function App() {
  return (
    <CSThemesProvider>
      <Router>
        <Routes>
          {/* Login Routes */}
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login/student" element={<LoginPage />}></Route>
          <Route path="/login/teacher" element={<LoginPage />}></Route>
          <Route path="/login/admin" element={<AdminLoginPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>

          {/* Student Routes */}
          <Route path="student">
            <Route index element={<UserLandingPage role={"student"} />}></Route>
            <Route path="classes" element={<Classes />}></Route>
            <Route path="classes/:classCode">
              <Route
                index
                element={
                  <ClassroomProvider>
                    <Classroom />
                  </ClassroomProvider>
                }
              ></Route>
              <Route path="videoCall" element={<VideoCall />}></Route>
              <Route path="attendance" element={<ViewAttendance />}></Route>
              <Route path="feedback" element={<GiveFeedback />}></Route>
              <Route path="evaluations" element={<ViewEvaluations />}></Route>
            </Route>
            <Route path="threads" element={<Threads />}></Route>
            <Route path="attendance" element={<ViewAllAttendance />}></Route>
            <Route path="threads/:id" element={<Thread />}></Route>
            <Route path="todos" element={<Thread />}></Route>
            <Route path="settings" element={<Settings />}></Route>
          </Route>

          {/* Teacher Routes */}
          <Route path="teacher">
            <Route index element={<UserLandingPage role={"teacher"} />}></Route>
            <Route path="threads" element={<Threads />}></Route>
            <Route path="threads/:id" element={<Thread />}></Route>
            <Route path="classes" element={<Classes />}></Route>
            <Route path="classes/:classCode">
              <Route
                index
                element={
                  <ClassroomProvider>
                    <Classroom />
                  </ClassroomProvider>
                }
              ></Route>
              <Route path="videoCall" element={<VideoCall />}></Route>
              <Route path="attendance" element={<Attendance />}></Route>
              <Route path="feedback" element={<TeacherFeedback />}></Route>
              <Route path="evaluations" element={<Evaluations />}></Route>
            </Route>
            <Route path="settings" element={<Settings />}></Route>
          </Route>

          {/* Admin Routes */}
          <Route path="/admin">
            <Route index element={<LandingPage />}></Route>
            <Route path="settings" element={<Settings />}></Route>
            <Route path="threads" element={<AdminThreads />}></Route>
            <Route path="threads/:id" element={<AdminThread />}></Route>
            <Route path="addTeacher" element={<AddTeacherForm />}></Route>
            <Route path="addStudent" element={<AddStudentForm />}></Route>
            <Route path="viewTeachers" element={<ViewTeachers />}></Route>
            <Route path="viewStudents" element={<ViewStudents />}></Route>
            <Route
              path="updateStudent/:id"
              element={<UpdateStudentForm />}
            ></Route>
            <Route
              path="updateTeacher/:id"
              element={<UpdateTeacherForm />}
            ></Route>
            <Route path="createCourse" element={<CreateCourseForm />}></Route>
            <Route path="searchCourses" element={<SearchCourses />}></Route>
            <Route
              path="updateCourse/:id"
              element={<UpdateCourseForm />}
            ></Route>
            <Route
              path="viewDegrees/addDegree/:degreeId/selectCourses"
              element={<DegreeCourseSelection />}
            ></Route>

            <Route path="viewLogs" element={<ViewLogs />}></Route>
            <Route path="viewFeedbacks" element={<ViewFeedback />}></Route>
            <Route path="assignCourses" element={<AssignCourses />}></Route>
            <Route path="addDegree" element={<AddDegree />}></Route>
            <Route path="viewDegrees" element={<ViewDegrees />}></Route>
            <Route path="lists" element={<AdminLists />}></Route>
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

          {/* Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </CSThemesProvider>
  );
}

export default App;
