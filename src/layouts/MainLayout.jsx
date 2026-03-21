import CvList from "../components/CvList";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Header from "./Header";
import BannerHero from "./BannerHero";
import ProjectList from "../components/ProjectList";
import PostList from "../components/PostList";
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Header />
      <BannerHero />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
        <PostList />
        <ProjectList />
        <CvList />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
