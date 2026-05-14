import React from "react";
import JobCard from "./JobCard";

export default function JobGrid({ jobs }) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        Chưa có việc làm nào.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
