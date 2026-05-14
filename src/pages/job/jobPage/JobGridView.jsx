import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Pagination from "../../../components/common/Pagination";
import jobService from "../../../services/jobService";
import { useJobs } from "../../../contexts/JobContext";

export default function JobGridView() {
  const { jobs, setJobs } = useJobs();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchActiveJobs = async () => {
      try {
        const response = await jobService.getAllJobs();
        const data = response.data || [];
        setJobs(data);
      } catch (err) {
        console.error("Lỗi, ", err);
      }
    };

    fetchActiveJobs();
  }, []);

  const totalPages = Math.ceil((jobs.length || 0) / itemsPerPage);

  let currentJobs = [];
  if (jobs.length > 0) {
    currentJobs = jobs.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  }

  return (
    <div className="w-full flex flex-col min-h-[700px]">
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
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
