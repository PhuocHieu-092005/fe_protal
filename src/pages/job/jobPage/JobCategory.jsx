import React from "react";
import Footer from "../../../layouts/Footer";
import JobHero from "./JobHero";
import JobFilterSidebar from "./JobFilterSidebar";
import JobSectionHeader from "./JobSectionHeader";
import JobGridView from "./JobGridView";
import { JobProvider } from "../../../contexts/JobContext";

export default function JobCategory() {
  return (
    <JobProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <main className="flex-grow">
          <JobHero />
          <section className="mx-auto max-w-7xl px-6 py-10">
            <JobSectionHeader />

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
              <JobFilterSidebar />
              <JobGridView />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </JobProvider>
  );
}
