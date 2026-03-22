import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={job.logo}
            alt={job.company}
            className="h-14 w-14 rounded-2xl border border-slate-100 object-cover p-2"
          />

          <div>
            <p className="text-sm text-slate-500">{job.company}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">
              {job.title}
            </h3>
          </div>
        </div>

        <button className="rounded-full border border-slate-200 p-2 text-slate-500 hover:border-slate-900 hover:text-slate-900">
          ♥
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1.5">
          {job.location}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5">
          {job.type}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5">
          {job.level}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-lg font-bold text-slate-900">{job.salary}</p>
        <p className="mt-1 text-sm text-slate-500">Posted {job.postedAt}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {job.tags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Link
          to={`/job/${job.id}`}
          className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
        >
          View Details
        </Link>

        <button className="flex-1 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
          Apply Now
        </button>
      </div>
    </div>
  );
}
