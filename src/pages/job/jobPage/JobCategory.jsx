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

          <section className="mx-auto w-[90%] py-8">
            <JobSectionHeader />

            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr]">
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
