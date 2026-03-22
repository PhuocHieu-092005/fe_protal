import React, { useState } from "react";
import JobCard from "./JobCard";
import Pagination from "../../../components/common/Pagination";

export default function JobGridView() {
  const jobs = [
    {
      id: 1,
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
      company: "FPT Software",
      title: "Frontend Developer Intern",
      location: "Ho Chi Minh City",
      type: "Internship",
      level: "Fresher",
      salary: "$200 - $400",
      postedAt: "2 days ago",
      tags: ["ReactJS", "TailwindCSS", "JavaScript"],
    },
    {
      id: 2,
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
      company: "VNG Corporation",
      title: "Backend Developer",
      location: "Ho Chi Minh City",
      type: "Full-time",
      level: "Junior",
      salary: "$700 - $1200",
      postedAt: "1 day ago",
      tags: ["NodeJS", "Express", "MongoDB"],
    },
    {
      id: 3,
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
      company: "Shopee",
      title: "UI/UX Designer",
      location: "Remote",
      type: "Part-time",
      level: "Junior",
      salary: "$400 - $700",
      postedAt: "3 days ago",
      tags: ["Figma", "Prototype", "Research"],
    },
    {
      id: 4,
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      company: "Tiki",
      title: "Full Stack Developer",
      location: "Hanoi",
      type: "Full-time",
      level: "Mid-level",
      salary: "$900 - $1500",
      postedAt: "5 hours ago",
      tags: ["ReactJS", "NodeJS", "PostgreSQL"],
    },
    {
      id: 5,
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
      company: "Zalo",
      title: "Mobile App Developer",
      location: "Da Nang",
      type: "Full-time",
      level: "Junior",
      salary: "$800 - $1300",
      postedAt: "4 days ago",
      tags: ["Flutter", "Firebase", "Dart"],
    },
    {
      id: 6,
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      company: "KMS Technology",
      title: "Data Analyst Intern",
      location: "Ho Chi Minh City",
      type: "Internship",
      level: "Fresher",
      salary: "$250 - $450",
      postedAt: "6 days ago",
      tags: ["SQL", "Python", "Power BI"],
    },
    {
      id: 7,
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
      company: "Techcombank",
      title: "Java Developer",
      location: "Hanoi",
      type: "Full-time",
      level: "Junior",
      salary: "$600 - $1000",
      postedAt: "2 days ago",
      tags: ["Java", "Spring Boot", "MySQL"],
    },
    {
      id: 8,
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
      company: "VNPay",
      title: "QA Tester",
      location: "Remote",
      type: "Part-time",
      level: "Fresher",
      salary: "$300 - $500",
      postedAt: "1 week ago",
      tags: ["Testing", "Postman", "Manual QA"],
    },
    {
      id: 9,
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
      company: "FPT Telecom",
      title: "DevOps Engineer",
      location: "Ho Chi Minh City",
      type: "Full-time",
      level: "Mid-level",
      salary: "$1000 - $1800",
      postedAt: "8 hours ago",
      tags: ["Docker", "Kubernetes", "Linux"],
    },
    {
      id: 10,
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      company: "Momo",
      title: "Product Designer",
      location: "Ho Chi Minh City",
      type: "Full-time",
      level: "Junior",
      salary: "$700 - $1100",
      postedAt: "2 days ago",
      tags: ["Figma", "UI/UX", "Design System"],
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="w-full flex flex-col min-h-[700px]">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 flex-1">
        {currentJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </section>

      <div className="flex justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
