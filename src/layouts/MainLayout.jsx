import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-base-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="footer footer-center p-4 bg-base-200 text-base-content">
        <p>© 2024 - Nhóm Hiếu, An, Tâm - Khoa CNTT</p>
      </footer>
    </div>
  );
};
export default MainLayout;