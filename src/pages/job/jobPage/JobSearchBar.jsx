import React, { useState } from "react";

export default function JobSearchBar() {
  // State cho Location
  const [location, setLocation] = useState("Location");
  const [showLocation, setShowLocation] = useState(false);

  // Thêm State cho Job Type
  const [jobType, setJobType] = useState("Job type");
  const [showJobType, setShowJobType] = useState(false);

  const locations = ["Ho Chi Minh City", "Hanoi", "Da Nang", "Remote"];
  const jobTypes = ["Internship", "Part-time", "Full-time", "Freelancer"];

  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center gap-2 w-full max-w-4xl rounded-full border border-slate-200 bg-white px-3 py-2 shadow-md transition-all duration-300 hover:border-sky-300 hover:ring-2 hover:ring-sky-300/40 hover:shadow-xl">
        {/* Search input */}
        <div className="flex flex-1 items-center">
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
            placeholder="Search job, position, skill..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-700 outline-none"
          />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200" />

        {/* Location dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLocation(!showLocation);
              setShowJobType(false); // Đóng menu kia nếu đang mở
            }}
            className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            📍
            <span className="font-medium">Location:</span>
            <span className="max-w-[90px] truncate">{location}</span>
          </button>

          {showLocation && (
            <ul className="absolute right-0 z-50 mt-3 w-44 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
              <li>
                <button
                  onClick={() => {
                    setLocation("Location");
                    setShowLocation(false);
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  Clear
                </button>
              </li>

              {locations.map((loc) => (
                <li key={loc}>
                  <button
                    onClick={() => {
                      setLocation(loc);
                      setShowLocation(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      location === loc
                        ? "bg-slate-100 font-semibold text-slate-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {loc}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200" />

        {/* Custom Job type dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowJobType(!showJobType);
              setShowLocation(false); // Đóng menu kia nếu đang mở
            }}
            className="flex items-center gap-2 bg-transparent px-2 py-1 text-sm text-slate-700 hover:text-slate-900 outline-none"
          >
            <span className="truncate max-w-[90px]">{jobType}</span>
            {/* Icon mũi tên chỉ xuống */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${showJobType ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showJobType && (
            <ul className="absolute right-0 z-50 mt-4 w-40 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
              <li>
                <button
                  onClick={() => {
                    setJobType("Job type");
                    setShowJobType(false);
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  Clear
                </button>
              </li>
              {jobTypes.map((type) => (
                <li key={type}>
                  <button
                    onClick={() => {
                      setJobType(type);
                      setShowJobType(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      jobType === type
                        ? "bg-slate-100 font-semibold text-slate-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Button */}
        <button className="ml-2 h-9 rounded-full bg-slate-900 px-6 text-sm font-medium text-white transition hover:bg-slate-800 shadow-sm">
          Search
        </button>
      </div>
    </div>
  );
}
