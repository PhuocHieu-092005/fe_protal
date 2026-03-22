import React from "react";
import JobSearchBar from "./JobSearchBar";

export default function JobHero() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-slate-950/60" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center text-white">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm backdrop-blur">
              Career opportunities for IT students
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
              Find the right job for your skills and career goals
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base text-slate-200 md:text-lg">
              Explore jobs, internships, and collaboration opportunities from
              companies. Connect employers with student CVs and projects more
              efficiently.
            </p>

            <div className="mt-10">
              <JobSearchBar />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-200">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                ReactJS
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                NodeJS
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                UI/UX
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                Laravel
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                Java
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
