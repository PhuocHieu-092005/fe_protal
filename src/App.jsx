import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Navbar from "./components/Navbar";
import CvCategory from "./pages/cv/CvCategory";
// import ProjectList from "./components/ProjectList";
// import PostList from "./components/PostList";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        {/* <Route path="/job" element={<PostList />} /> */}
        <Route path="/cv" element={<CvCategory />} />
        {/* <Route path="/project" element={<ProjectList />} /> */}
        {/* <Route path="/template" element={<div>Template Page</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
