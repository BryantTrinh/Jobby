import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filterValue, setFilterValue] = useState('most_recent');

  useEffect(() => {
    fetchJobs(currentPage, filterValue);
  }, [currentPage, filterValue]);

  const fetchJobs = async (page, filter) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/jobs?page=${page}`);
      const data = await response.json();
      const sortedJobs = sortJobs(data.jobs, filter);
      setJobs(sortedJobs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const sortJobs = (jobs, filter) => {
    return jobs.sort((a, b) => {
      const appliedA = new Date(a.applied);
      const appliedB = new Date(b.applied);
      return filter === 'most_recent' ? appliedB - appliedA : appliedA - appliedB;
    });
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <div>
        {jobs.map((job) => (
          <div key={job.id}>
            <h3>{job.job_title}</h3>
            <p>{job.company}</p>
            <p>Applied: {new Date(job.applied).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
