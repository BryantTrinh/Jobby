import React, { useState, useEffect } from 'react';
import { Select, Text, Flex, Stack } from "@chakra-ui/react";
import JobCard from '../components/jobCard';
import Pagination from '../components/pagination';

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [sortedJobs, setSortedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOrder, setSortOrder] = useState("most_recent");

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/jobs`);
        const data = await response.json();
        console.log(data);

        setSavedJobs(data.data || []);
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };

    fetchSavedJobs();
  }, []);

  useEffect(() => {
    // Sort jobs locally based on selected sortOrder
    const sorted = [...savedJobs].sort((a, b) => {
      if (sortOrder === "most_recent") return b.id - a.id;
      if (sortOrder === "oldest_first") return a.id - b.id;
      return 0;
    });

    setSortedJobs(sorted);
  }, [savedJobs, sortOrder]);
  useEffect(() => {
    setTotalPages(Math.ceil(sortedJobs.length / jobsPerPage));
  }, [sortedJobs, jobsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleJobsPerPageChange = (event) => {
    setJobsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const currentJobs = sortedJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <Flex direction="column" align="center" p={4}>
      <Stack fontFamily="Verdana" mb={5} mt={-20} align="center">
        <h2>
          <Text fontSize="3xl" color="#008080" >Job Documentation & Assistance</Text>
          <Text fontSize="3xl" color="#008080" align="center">Powered by AI</Text>
        </h2>
      </Stack>

      <Text fontSize="5xl" color="red" mb={20}>
        Saved Jobs
      </Text>

      {/* Controls for sorting and jobs per page */}
      <Flex mb={4} justify="space-between" width="100%" maxW="600px">
        <Select 
          value={jobsPerPage} 
          onChange={handleJobsPerPageChange} 
          ml={12}
          textAlign="center" 
          width="175px"
          mb={5}
        >
          <option value={5}>5 Jobs Per Page</option>
          <option value={10}>10 Jobs Per Page</option>
          <option value={25}>25 Jobs Per Page</option>
        </Select>

        <Select 
          value={sortOrder} 
          onChange={(e) => setSortOrder(e.target.value)} 
          textAlign="center" 
          width="300px"
        >
          <option value="oldest_first">Sort by Oldest Saved Jobs</option>
          <option value="most_recent">Sort by Most Recently Saved Jobs</option>
        </Select>
      </Flex>

      {/* Pagination Component */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />

      {/* JobCard for displaying current jobs */}
      <JobCard savedJobs={currentJobs} setSavedJobs={setSavedJobs} />
    </Flex>
  );
}

export default SavedJobs;
