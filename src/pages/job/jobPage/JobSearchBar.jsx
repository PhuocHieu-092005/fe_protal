import React, { useState } from "react";
import jobService from "../../../services/jobService";
import { useJobs } from "../../../contexts/JobContext";

export default function JobSearchBar() {
  // State cho Location
  // const [location, setLocation] = useState("Vị trí");
  // const [showLocation, setShowLocation] = useState(false);

  // const locations = ["TP Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Làm việc từ xa"];
  const [keyword,setKeyword]=useState("");
  const { setJobs } = useJobs();
  const handleSearch = async ()=>{
    if(!keyword.trim())
      return;
    try{
      const response = await jobService.searchByTitle(keyword);
      setJobs(response.data.data)
    }catch(err){
      console.log("Lỗi tìm kiếm", err);
      alert("Không thể tìm kiếm lúc này ");
    }
  }
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
            value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}
            placeholder="Tìm kiếm công việc, vị trí, kỹ năng..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-700 outline-none"
          />
        </div>

        {/* Divider */}
        {/* <div className="h-6 w-px bg-slate-200" /> */}

        {/* Location dropdown */}
        {/* <div className="relative">
          <button
            onClick={() => setShowLocation(!showLocation)}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          > */}
            {/* --- Icon SVG Vị trí --- */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-500"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg> */}
            {/* ----------------------- */}

            {/* <span className="max-w-[90px] truncate">{location}</span>
          </button> */}

          {/* {showLocation && (
            <ul className="absolute right-0 z-50 mt-3 w-44 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
              <li>
                <button
                  onClick={() => {
                    setLocation("Vị trí");
                    setShowLocation(false);
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  Tất cả vị trí
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
        </div> */}

        {/* Button Tìm kiếm */}
        <button 
        onClick={handleSearch}
        className="ml-2 h-9 rounded-full bg-slate-900 px-6 text-sm font-medium text-white transition hover:bg-slate-800 shadow-sm">
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}
