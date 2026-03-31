import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Navbar from "./components/Navbar";
import CvCategory from "./pages/cv/cvPage/CvCategory";
import CvDetail from "./pages/cv/cvDetail/CvDetail";
import JobCategory from "./pages/job/jobPage/JobCategory";
import JobDetail from "./pages/job/jobDetail/JobDetail";
import ProjectCategory from "./pages/project/projectPage/ProjectCategory";
import ProjectDetail from "./pages/project/projectDetail/ProjectDetail";
import ProfileCategory from "./pages/profile/profilePage/ProfileCategory";
import OAuthSuccess from "./pages/OAuthSuccess";
// template
import CvEdit from "./pages/template/CvEdit";
import TemplateCategory from "./pages/template/templatePage/TemplateCategory";
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
        <Route path="/project" element={<ProjectCategory />} />
        <Route path="/project/:id" element={<ProjectDetail />} />

        {/*============ Profile====================== */}
        <Route path="/profile" element={<ProfileCategory />} />

        <Route path="/oauth2-success" element={<OAuthSuccess />} />

        {/*============ Template====================== */}
        <Route path="/template" element={<TemplateCategory />} />
        <Route path="/template/edit" element={<CvEdit />} />
        {/* <Route path="/template/:id" element={<CvEdit />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
