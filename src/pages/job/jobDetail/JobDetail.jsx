import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../../layouts/Footer";
import ApplyJobModal from "./ApplyJobModal";

export default function JobDetail() {
  const { id } = useParams();
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const jobData = {
    id,
    title: "Frontend Developer Intern",
    company: "FPT Software",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    location: "Ho Chi Minh City",
    type: "Internship",
    level: "Fresher",
    salary: "$200 - $400",
    postedAt: "2 days ago",
    deadline: "30/04/2026",
    applicants: 24,
    description:
      "We are looking for a Frontend Developer Intern to join our product team. You will work with modern web technologies to build responsive interfaces and support the development of scalable internal systems.",
    requirements: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Experience with ReactJS is a plus",
      "Familiar with Git and teamwork workflow",
      "Good problem-solving mindset",
      "Able to read technical documentation in English",
    ],
    benefits: [
      "Internship allowance and performance bonus",
      "Opportunity to work with experienced mentors",
      "Modern working environment",
      "Chance to become full-time employee after internship",
      "Hands-on experience with real projects",
    ],
    skills: ["ReactJS", "TailwindCSS", "JavaScript", "Git", "REST API"],
    companyInfo:
      "FPT Software is one of the leading technology companies in Vietnam, providing digital transformation, software development, and IT services for global clients.",
    relatedJobs: [
      {
        id: 2,
        title: "Backend Developer",
        company: "VNG Corporation",
        location: "Ho Chi Minh City",
      },
      {
        id: 3,
        title: "UI/UX Designer",
        company: "Shopee",
        location: "Remote",
      },
      {
        id: 4,
        title: "Full Stack Developer",
        company: "Tiki",
        location: "Hanoi",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow">
        <section className="mx-auto max-w-7xl px-6 pt-24 pb-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-900">
              Home
            </Link>
            <span>/</span>
            <Link to="/job" className="hover:text-slate-900">
              Jobs
            </Link>
            <span>/</span>
            <span className="text-slate-900">{jobData.title}</span>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <img
                      src={jobData.logo}
                      alt={jobData.company}
                      className="h-16 w-16 rounded-2xl border border-slate-100 object-cover p-2"
                    />

                    <div>
                      <p className="text-sm text-slate-500">
                        {jobData.company}
                      </p>
                      <h1 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
                        {jobData.title}
                      </h1>

                      <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                        <span className="rounded-full bg-slate-100 px-3 py-1.5">
                          {jobData.location}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1.5">
                          {jobData.type}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1.5">
                          {jobData.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-2xl font-bold text-slate-900">
                      {jobData.salary}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Posted {jobData.postedAt}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Job Type</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {jobData.type}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Deadline</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {jobData.deadline}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Applicants</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {jobData.applicants} candidates
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Job Description
                </h2>
                <p className="mt-4 leading-7 text-slate-600">
                  {jobData.description}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Requirements
                </h2>
                <ul className="mt-4 space-y-3 text-slate-600">
                  {jobData.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-900" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">Benefits</h2>
                <ul className="mt-4 space-y-3 text-slate-600">
                  {jobData.benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-900" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Required Skills
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {jobData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-slate-900">
                    Related Jobs
                  </h2>
                  <Link
                    to="/job"
                    className="text-sm font-medium text-slate-600 hover:text-slate-900"
                  >
                    View all
                  </Link>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {jobData.relatedJobs.map((job) => (
                    <Link
                      key={job.id}
                      to={`/job/${job.id}`}
                      className="rounded-2xl border border-slate-200 p-4 transition hover:border-slate-900 hover:shadow-sm"
                    >
                      <p className="text-sm text-slate-500">{job.company}</p>
                      <h3 className="mt-1 text-lg font-semibold text-slate-900">
                        {job.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        {job.location}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Salary Range</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {jobData.salary}
                </p>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => setIsApplyOpen(true)}
                    className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Apply Now
                  </button>

                  <button className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900">
                    Save Job
                  </button>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-6 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Location</span>
                    <span className="font-medium text-slate-900">
                      {jobData.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Type</span>
                    <span className="font-medium text-slate-900">
                      {jobData.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Level</span>
                    <span className="font-medium text-slate-900">
                      {jobData.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Deadline</span>
                    <span className="font-medium text-slate-900">
                      {jobData.deadline}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">
                  About Company
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {jobData.companyInfo}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ApplyJobModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        jobTitle={jobData.title}
        company={jobData.company}
      />
    </div>
  );
}
