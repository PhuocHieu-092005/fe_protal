import React, { createContext, useState, useContext } from "react";
import jobService from "../services/jobService";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]); 

    const fetchActiveJobs = async () => {
      try {
        const response = await jobService.getAllJobs();
        const data = response.data || [];
        setJobs(data);
      } catch (err) {
        console.error("Lỗi, ", err);
      }
    };

  return (
    <JobContext.Provider value={{ jobs, setJobs,fetchActiveJobs}}>
      {children}
    </JobContext.Provider>
  );
};


export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs phải được dùng bên trong JobProvider");
  }
  return context;
};