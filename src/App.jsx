import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Navbar from "./components/Navbar";
import CvCategory from "./pages/cv/cvPage/CvCategory";
import CvDetail from "./pages/cv/cvDetail/CvDetail";
import JobCategory from "./pages/job/jobPage/JobCategory";
import JobDetail from "./pages/job/jobDetail/JobDetail";
import ProjectCategory from "./pages/project/projectPage/ProjectCategory";
import ProjectDetail from "./pages/project/projectDetail/ProjectDetail";
import ProfileCategory from "./pages/profile/profilesDetail/ProfileCategory";
import OAuthSuccess from "./pages/OAuthSuccess";
import CvEdit from "./pages/template/CvEdit";
import TemplateCategory from "./pages/template/templatePage/TemplateCategory";

import JobManage from "./pages/job/company/JobManage";
import CreateJob from "./pages/job/company/CreateJob";

import CreateProject from "./pages/project/projectManage/CreateProject";
import EditProject from "./pages/project/projectManage/EditProject";
import MyProjects from "./pages/project/projectManage/MyProjects";

import MyWallet from "./pages/wallet/MyWallet";
import EditJob from "./pages/job/company/EditJob";
import ApplicationList from "./pages/job/company/ApplicationList";
import FavoriteJobs from "./pages/job/student/FavoriteJobs";
import ApprovedApplicants from "./pages/job/company/ApplicationApproved";
import PaymentResult from "./pages/payment/PaymentResult";
import AIChatWidget from "./components/AIChatWidget";


function App() {
  return (
    <Router>
      <Navbar />
      <AIChatWidget />
      <Routes>
        <Route path="/" element={<MainLayout />} />

        <Route path="/cv" element={<CvCategory />} />
        <Route path="/cv/:id" element={<CvDetail />} />

        <Route path="/job" element={<JobCategory />} />

        <Route path="/job/edit/:id" element={<EditJob />} />
        <Route path="/companies/jobs/:id/applications" element={<ApplicationList/>} />
        <Route path="/students/job/favorites" element={<FavoriteJobs/>} />
        <Route path="/company/applications/approved" element={<ApprovedApplicants/>} />
        {/* ĐẶT CÁC ROUTE CỐ ĐỊNH TRÊN ROUTE BIẾN SỐ (:id) */}

        <Route path="/job/manage" element={<JobManage />} />
        <Route path="/job/create" element={<CreateJob />} />
        <Route path="/job/:id" element={<JobDetail />} />

        <Route path="/project" element={<ProjectCategory />} />
        <Route path="/project/:id" element={<ProjectDetail />} />

        <Route path="/profile" element={<ProfileCategory />} />
        <Route path="/oauth2-success" element={<OAuthSuccess />} />

        <Route path="/template" element={<TemplateCategory />} />
        <Route path="/template/edit" element={<CvEdit />} />
        <Route path="/template/edit/:id" element={<CvEdit />} />

        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/project/create" element={<CreateProject />} />
        <Route path="/project/edit/:id" element={<EditProject />} />

        <Route path="/my-wallet" element={<MyWallet />} />
        <Route path="/payment-success" element={<PaymentResult type="success" />} />
        <Route path="/payment-cancel" element={<PaymentResult type="cancel" />} />
        <Route path="/payment-failed" element={<PaymentResult type="failed" />} />
      </Routes>
    </Router>
  );
}

export default App;
