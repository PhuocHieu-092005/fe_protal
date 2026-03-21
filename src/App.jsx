import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Navbar from "./components/Navbar";
import CvCategory from "./pages/cv/cvPage/CvCategory";
import CvDetail from "./pages/cv/cvDetail/CvDetail";
import JobCategory from "./pages/job/jobPage/JobCategory";
import JobDetail from "./pages/job/jobDetail/jobDetail";
import ProjectCaterogy from "./pages/project/projectPage/ProjectCaterogy";
import ProjectDetail from "./pages/project/projectDetail/ProjectDetail";
import TemplateCategory from "./pages/template/templatePage/TemplateCategory";
import ProfileCategory from "./pages/profile/profilePage/ProfileCategory";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/*============ Home====================== */}
        <Route path="/" element={<MainLayout />} />
        {/*============ CV====================== */}
        <Route path="/cv" element={<CvCategory />} />
        <Route path="/cv/:id" element={<CvDetail />} />
        {/*============ Job====================== */}
        <Route path="/job" element={<JobCategory />} />
        <Route path="/job/:id" element={<JobDetail />} />
        {/*============ Project====================== */}
        <Route path="/project" element={<ProjectCaterogy />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        {/*============ Template====================== */}
        <Route path="/template" element={<TemplateCategory />} />
        {/*============ Profile====================== */}
        <Route path="/profile" element={<ProfileCategory />} />
      </Routes>
    </Router>
  );
}

export default App;
