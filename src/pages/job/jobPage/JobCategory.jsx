import React, { useState } from "react";
import Footer from "../../../layouts/Footer";
import JobHero from "./JobHero";
import JobFilterSidebar from "./JobFilterSidebar";
import JobSectionHeader from "./JobSectionHeader";
import JobGridView from "./JobGridView";
import { JobProvider } from "../../../contexts/JobContext";
import { SlidersHorizontal, X } from "lucide-react";

export default function JobCategory() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <JobProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <main className="flex-grow">
          <JobHero />

          <section className="mx-auto w-[90%] py-8">
            <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
              <JobSectionHeader />

              <button
                type="button"
                onClick={() => setFilterOpen(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm"
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>

            <div className="hidden lg:block">
              <JobSectionHeader />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr]">
              <div className="hidden lg:block">
                <JobFilterSidebar />
              </div>

              <JobGridView />
            </div>
          </section>
        </main>

        <Footer />

        {filterOpen && (
          <>
            <div
              className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setFilterOpen(false)}
            />

            <div className="fixed inset-y-0 left-0 z-[90] w-[76%] max-w-[300px] overflow-y-auto bg-white p-3 shadow-2xl lg:hidden">
              <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Bộ lọc</h2>

                <button
                  type="button"
                  onClick={() => setFilterOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>

              <JobFilterSidebar onApplied={() => setFilterOpen(false)} />
            </div>
          </>
        )}
      </div>
    </JobProvider>
  );
}
