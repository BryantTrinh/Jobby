import React, { useState, useEffect } from 'react';
import { Select, Text, Flex } from "@chakra-ui/react";
import JobAccordion from '../components/jobAccordion';
import Pagination from '../components/pagination';

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);


  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/jobs?page_index=${currentPage}&page_size=${jobsPerPage}`);
        const data = await response.json();
        console.log(data);

        // Set the saved jobs and total jobs based off our api
        setSavedJobs(data.data || []); // Setting an empty array if data.data is undefined
        setTotalJobs(data.total_elements || 0);

        // Calculating total pages based on the total number of jobs
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };

    fetchSavedJobs();
  }, [currentPage, jobsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleJobsPerPageChange = (event) => {
    setJobsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <Flex direction="column" align="center" p={4}>
      <Text fontSize="3xl" color="#008080" mb={4}>
        Saved Jobs
      </Text>

      {/* Jobs Per Page Selector and Pagination Controls */}
      <Flex mb={4} justify="center" width="100%">
        <Flex align="center" mr={4}>
          <Select 
            value={jobsPerPage} 
            onChange={handleJobsPerPageChange} 
            textAlign="center"
            width="175px"
          >
            <option value={5}>5 Jobs Per Page</option>
            <option value={10}>10 Jobs Per Page</option>
            <option value={25}>25 Jobs Per Page</option>
          </Select>
        </Flex>

        {/* Pagination Component */}
        <Flex align="center" mt={3}>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </Flex>
      </Flex>

      {/* JobAccordion for displaying saved jobs */}
      <JobAccordion savedJobs={savedJobs} setSavedJobs={setSavedJobs} />
    </Flex>
  );
}

export default SavedJobs;
