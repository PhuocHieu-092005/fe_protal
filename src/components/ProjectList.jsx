import React from "react";
import ProjectCard from "./ProjectCard";

// Giả lập dữ liệu đồ án (6 projects)
const projectsData = [
  {
    id: 1,
    title: "Hệ thống Quản lý Bệnh viện",
    author: "Nguyễn Văn A",
    techStack: ["ASP.NET Core", "ReactJS", "SQL Server"],
    views: 1250,
    downloads: 45,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description:
      "Nền tảng quản lý hồ sơ bệnh nhân, lịch hẹn bác sĩ và quy trình khám chữa bệnh trực tuyến.",
  },
  {
    id: 2,
    title: "AI Nhận Diện Phương Tiện Giao Thông",
    author: "Trần Thị B",
    techStack: ["Python", "PyTorch", "FastAPI", "Docker"],
    views: 980,
    downloads: 30,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description:
      "Ứng dụng trí tuệ nhân tạo phát hiện và phân loại phương tiện từ camera giao thông.",
  },
  {
    id: 3,
    title: "E-commerce Nền tảng Bán Hàng Trực Tuyến",
    author: "Lê Văn C",
    techStack: ["Spring Boot", "Angular", "PostgreSQL", "AWS"],
    views: 1520,
    downloads: 55,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    description:
      "Website thương mại điện tử tích hợp thanh toán trực tuyến và quản lý đơn hàng.",
  },
  {
    id: 4,
    title: "Ứng dụng Đặt Vé Xe Khách Chuyên Nghiệp",
    author: "Phạm Thị D",
    techStack: ["Node.js", "Express", "MongoDB", "Flutter"],
    views: 870,
    downloads: 25,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    description:
      "Hệ thống đặt vé xe khách theo thời gian thực với bản đồ chỗ ngồi tương tác.",
  },
  {
    id: 5,
    title: "Blockchain Tracking Tài Sản Công Nghiệp",
    author: "Hoàng Văn E",
    techStack: ["Solidity", "Truffle", "ReactJS", "Web3.js"],
    views: 1100,
    downloads: 38,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    description:
      "Hệ thống theo dõi nguồn gốc và quản lý chuỗi cung ứng dựa trên Blockchain.",
  },
  {
    id: 6,
    title: "Data Analytics Dashboard Dữ Liệu Lớn",
    author: "Đỗ Thị F",
    techStack: ["Grafana", "Prometheus", "InfluxDB", "Docker"],
    views: 750,
    downloads: 18,
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    description:
      "Bảng điều khiển trực quan hóa dữ liệu hiệu suất hệ thống từ nhiều nguồn.",
  },
];

// Component chính ProjectList
const ProjectList = () => {
  // Hàng 1: 4 project đầu
  const row1 = [...projectsData.slice(0, 4), ...projectsData.slice(0, 4)];
  // Hàng 2: 2 project còn lại
  const row2 = [
    ...projectsData.slice(4, 6),
    ...projectsData.slice(4, 6),
    ...projectsData.slice(4, 6),
  ];

  return (
    // Thêm py-20 để có không gian cho card scale lên không bị chạm biên trên/dưới
    <div className="mx-auto w-full max-w-7xl py-20 bg-white relative">
      <style>{`
        .marquee-forward { animation: scrollForward 23s linear infinite; }
        .marquee-reverse { animation: scrollReverse 23s linear infinite; }
        
        @keyframes scrollForward {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scrollReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .marquee-container:hover .marquee-inner {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div className="text-center mb-12 px-4">
        <h1 className="text-3xl text-slate-900 font-bold tracking-tight">
          Đồ án sinh viên nổi bật
        </h1>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto italic">
          Các giải pháp công nghệ sáng tạo được đánh giá cao bởi Khoa.
        </p>
      </div>

      <div className="flex flex-col gap-10 overflow-hidden py-4">
        <div className="marquee-container relative flex overflow-visible group">
          <div className="flex marquee-forward marquee-inner">
            {row1.map((project, index) => (
              <div
                key={`row1-${index}`}
                className="w-[310px] mx-4 flex-shrink-0 transition-all duration-300 hover:scale-105 hover:z-50"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Hàng 2 */}
        <div className="marquee-container relative flex overflow-visible group">
          <div className="flex marquee-reverse marquee-inner">
            {row2.map((project, index) => (
              <div
                key={`row2-${index}`}
                className="w-[310px] mx-4 flex-shrink-0 transition-all duration-300 hover:scale-105 hover:z-50"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hiệu ứng mờ biên: Nâng z-index cao hơn card thường nhưng thấp hơn card đang hover */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />
    </div>
  );
};

export default ProjectList;
