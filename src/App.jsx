import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Navbar from "./components/Navbar";
import CvCategory from "./pages/cv/cvPage/CvCategory";
import CvDetail from "./pages/cv/cvDetail/CvDetail";
import JobCategory from "./pages/job/jobPage/JobCategory";
import JobDetail from "./pages/job/jobDetail/JobDetail";
import ProjectCategory from "./pages/project/projectPage/ProjectCategory";
import ProjectDetail from "./pages/project/projectDetail/ProjectDetail";
// Import Profile
import ProfileCategory from "./pages/profile/profilesDetail/ProfileCategory";
import OAuthSuccess from "./pages/OAuthSuccess";
// Template
import CvEdit from "./pages/template/CvEdit";
import TemplateCategory from "./pages/template/templatePage/TemplateCategory";

// Các trang dành cho Doanh nghiệp
import JobManage from "./pages/job/company/JobManage";
import CreateJob from "./pages/job/company/CreateJob";

// Import quản lý project sinhvien
import CreateProject from "./pages/project/projectManage/CreateProject";
import MyProjects from "./pages/project/projectManage/MyProjects";

// import my-wallets
import MyWallet from "./pages/wallet/MyWallet";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/*============ Home ====================== */}
        <Route path="/" element={<MainLayout />} />
        {/*============ CV ====================== */}
        <Route path="/cv" element={<CvCategory />} />
        <Route path="/cv/:id" element={<CvDetail />} />
        {/*============ Job ====================== */}
        <Route path="/job" element={<JobCategory />} />
        {/* ĐẶT CÁC ROUTE CỐ ĐỊNH TRÊN ROUTE BIẾN SỐ (:id) */}
        <Route path="/job/manage" element={<JobManage />} />
        <Route path="/job/create" element={<CreateJob />} />
        <Route path="/job/:id" element={<JobDetail />} />
        {/*============ Project ====================== */}
        <Route path="/project" element={<ProjectCategory />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        {/*============ Profile ====================== */}
        <Route path="/profile" element={<ProfileCategory />} />
        <Route path="/oauth2-success" element={<OAuthSuccess />} />
        {/*============ Template ====================== */}
        <Route path="/template" element={<TemplateCategory />} />
        <Route path="/template/edit" element={<CvEdit />} />
        {/*============ project student ====================== */}
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/project/create" element={<CreateProject />} />
        {/*============ wallets student ====================== */}
        <Route path="/my-wallet" element={<MyWallet />} />
      </Routes>
    </Router>
  );
}

export default App;
