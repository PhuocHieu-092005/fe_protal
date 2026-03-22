import React from "react";
import JobCard from "./JobCard";

export default function JobGrid({ jobs }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
