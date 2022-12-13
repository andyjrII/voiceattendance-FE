import { Routes, Route } from 'react-router-dom';
import Lecturer from './pages/Lecturer';
import Missing from './pages/Missing';
import StaffRegister from './pages/StaffRegister';
import StudentRegister from './pages/StudentRegister';
import Unauthorized from './pages/Unauthorized';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Home from './pages/Home'; 
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import { UserProvider } from './context/UserContext';
import TakeAttendance from './pages/TakeAttendance';
import useAlan from './hooks/useAlan';

function App() {
  useAlan()
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="/" element={<Home />} />
            <Route path="staff-register" element={<StaffRegister />} />
            <Route path="student-register" element={<StudentRegister />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            
            {/* we want to protect these routes */}
            <Route element={<RequireAuth />} >
              <Route path="lecturer" element={<Lecturer />} />
              <Route path="attendance" element={<TakeAttendance />} />
              <Route path="students" element={<Students />} />
              <Route path="courses" element={<Courses />} />
            </Route>
                   
            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
      </Routes>
  </UserProvider>
  );
}

export default App;
