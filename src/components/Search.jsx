import React, { useState } from "react";

export default function Search() {
  const [location, setLocation] = useState("Location");
  const [showList, setShowList] = useState(false);
  const locations = ["TP Ho Chi Minh", "Ha Noi", "Da Nang"];

  return (
    <div className="group flex items-center rounded-full border border-slate-200 bg-white px-3 py-2 shadow-md max-w-3xl w-full gap-2 transition-all duration-300 hover:border-sky-300 hover:ring-2 hover:ring-sky-300/40 hover:shadow-xl focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-400/40">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 30 30"
        fill="#6B7280"
      >
        <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
      </svg>

      <input
        type="text"
        placeholder="Search job, position, skill..."
        className="flex-1 h-10 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
      />

      <div className="h-8 w-px bg-slate-200" />

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowList((prev) => !prev)}
          className="flex w-[170px] items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10z" />
            <circle cx="12" cy="11" r="2.5" />
          </svg>
          <span className="font-medium">Location:</span>
          <span className="truncate w-[90px]">{location}</span>
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {showList && (
          <ul className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
            <li>
              <button
                onClick={() => {
                  setLocation("Location");
                  setShowList(false);
                }}
                className="w-full text-left rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
              >
                Clear Location
              </button>
            </li>
            {locations.map((loc) => (
              <li key={loc}>
                <button
                  onClick={() => {
                    setLocation(loc);
                    setShowList(false);
                  }}
                  className={`w-full text-left rounded-md px-2 py-1 text-sm ${
                    location === loc
                      ? "bg-slate-100 text-slate-900 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {loc}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        className="bg-slate-900 px-5 h-10 rounded-full text-sm text-white hover:bg-slate-800 transition"
      >
        Search
      </button>
    </div>
  );
}
