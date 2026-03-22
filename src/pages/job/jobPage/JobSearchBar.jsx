import React from "react";

export default function JobSearchBar() {
  return (
    <div className="rounded-3xl bg-white p-3 shadow-2xl">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto]">
        <div className="flex items-center rounded-2xl border border-slate-200 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search by job title, technology, or company..."
            className="w-full bg-transparent px-3 py-4 text-slate-700 outline-none"
          />
        </div>

        <select className="rounded-2xl border border-slate-200 px-4 py-4 text-slate-700 outline-none">
          <option>Select location</option>
          <option>Ho Chi Minh City</option>
          <option>Hanoi</option>
          <option>Da Nang</option>
          <option>Remote</option>
        </select>

        <select className="rounded-2xl border border-slate-200 px-4 py-4 text-slate-700 outline-none">
          <option>Job type</option>
          <option>Internship</option>
          <option>Part-time</option>
          <option>Full-time</option>
          <option>Freelancer</option>
        </select>

        <button className="rounded-2xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-slate-800">
          Search
        </button>
      </div>
    </div>
  );
}
