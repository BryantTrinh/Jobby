import React, { useState, useEffect } from 'react';
import { Select, Flex, Grid } from "@chakra-ui/react";
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
        const response = await fetch('http://127.0.0.1:8000/api/jobs');
        const data = await response.json();
        setSavedJobs(data.data || []);
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };

    fetchSavedJobs();
  }, []);

  useEffect(() => {
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
    <Flex
      justifyContent="center"
      direction="column"
      align="center"
      p={4}
      minHeight="100vh"
      maxWidth="1600px"
      mx="auto"
    >
      {/* Job Cards Container */}
      <Flex
        justifyContent="center"
        width="120%"
        maxHeight="calc(100vh - 250px)"
        overflowY="auto"
        mt={4}
      >
        <Grid
          templateColumns="repeat(auto-fit, minmax(700px, 1fr))"
          gap={6}
          width="100%"
          maxW="1600px"
        >
          {currentJobs.map((job, index) => (
            <JobCard key={index} savedJobs={[job]} setSavedJobs={setSavedJobs} />
          ))}
        </Grid>
      </Flex>

      {/* Controls Section */}
   <Flex
    justify="center"
    width="100%"
    maxW="600px"
    gap={4}
    mt={6}
    mb={4}
  >
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

  {/* Pagination Section */}
  <Flex justifyContent="center" width="100%" my={4}>
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  </Flex>
</Flex>
  );
}

export default SavedJobs;
