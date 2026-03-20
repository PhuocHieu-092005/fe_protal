import React from "react";

export default function CvFilterSidebar() {
  const technologies = [
    "ReactJS",
    "NodeJS",
    "Java",
    "C#",
    "PHP",
    "Laravel",
    "VueJS",
    "NextJS",
    "TypeScript",
    "MongoDB",
  ];

  return (
    <aside className="w-1/4 top-6 max-h-[480px] overflow-y-auto bg-white border rounded-xl p-5">
      {" "}
      {/* Header */}
      <div className="border-b pb-3">
        <h2 className="text-lg font-semibold text-gray-900">Filter CV</h2>
        <p className="text-xs text-gray-500">Refine candidate search</p>
      </div>
      {/* MSSV */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
          Student ID
        </label>
        <input
          type="text"
          placeholder="Enter student ID..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
          focus:outline-none focus:ring-1 focus:ring-black focus:border-black
          transition"
        />
      </div>
      {/* Position */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
          Position
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
          focus:outline-none focus:ring-1 focus:ring-black focus:border-black
          bg-white"
        >
          <option value="">Position</option>
          <option value="backend">Backend Developer</option>
          <option value="frontend">Frontend Developer</option>
          <option value="fullstack">Fullstack Developer</option>
          <option value="uiux">UI/UX Designer</option>
        </select>
      </div>
      {/* Technologies */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
          Technologies
        </label>

        <div className="max-h-40 overflow-y-auto pr-1 space-y-2 border border-gray-200 rounded-md p-3">
          {technologies.map((tech) => (
            <label
              key={tech}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-black"
            >
              <input
                type="checkbox"
                value={tech}
                className="w-4 h-4 border-gray-300 rounded 
                focus:ring-black accent-black"
              />
              {tech}
            </label>
          ))}
        </div>
      </div>
      {/* Actions */}
      <div className="flex gap-3 pt-2 border-t">
        <button
          className="flex-1 bg-black text-white text-sm font-medium py-2 rounded-md 
          hover:bg-gray-900 transition"
        >
          Apply Filter
        </button>

        <button
          className="flex-1 border border-gray-300 text-gray-700 text-sm font-medium py-2 rounded-md 
          hover:bg-gray-100 transition"
        >
          Reset
        </button>
      </div>
    </aside>
  );
}
