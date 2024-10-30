import React, { useState, useEffect } from 'react';
import {
  Flex,
  Stack,
  Input,
  Button,
  Image,
  Select,
  Text,
} from "@chakra-ui/react";
import logo from './assets/Logo.svg';
import JobScraper from './JobScraper';
import JobAccordion from './JobAccordion';
import JobFilter from './JobFilter';
import Pagination from './Pagination';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [savedJobs, setSavedJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/jobs?page_index=${currentPage}&page_size=${jobsPerPage}`);
        const data = await response.json();
        setSavedJobs(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [currentPage, jobsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleJobsPerPageChange = (event) => {
    setJobsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <Flex
      width="100vw"
      height="100%"
      alignContent="center"
      justifyContent="center"
      p={4}
      direction="column"
    >
      {/* Website Logo */}
      <Stack align="center">
        <Image
          src={logo}
          alt="Website logo"
          boxSize="350px"
        />
      </Stack>

      <Stack 
        fontFamily="Verdana" 
        mb={10} 
        align="center" 
        mt={-100}
      >
        <h2>
          <Text fontSize='3xl' color='#008080'>Job Documentation & Assistance</Text>
          <Text fontSize='3xl' color='#008080' align="center">Powered by AI</Text>
        </h2>
      </Stack>

      {/* Save application field and save button */}
      <Stack 
        fontFamily="Verdana" 
        spacing={4} align="center" 
        mb={20} 
        width="100%"
      >
        <Input
          placeholder="Save application via entering in URL"
          size="md"
          width="350px"
          textAlign="center"
        />
        <Button colorScheme='teal' size='md'>
          Save job application
        </Button>
      </Stack>
      
      <Flex 
        width="100%" 
        justifyContent="center" 
        alignItems="flex-start" 
        mb={20}
      >
        {/* Job Filter*/}
        <Stack
          fontFamily="Verdana"
          spacing={4}
          align="flex-start"
          width="50px"
          ml={4}
        >
          <JobFilter />
        </Stack>

        {/* Job Scraper for testing */}
        <Stack 
          fontFamily="Verdana" 
          spacing={4} 
          align="center" 
          width="100%"
          maxWidth="1200px"
        >
          <JobScraper />
        </Stack>
      </Flex>

      {/* Items per page selector */}
      <Flex justifyContent="center" mb={4}>
        <Select
          textAlign="center"
          width="250px"
          value={jobsPerPage}
          onChange={handleJobsPerPageChange}
        >
          <option value={5}>5 Jobs Per Page</option>
          <option value={10}>10 Jobs Per Page</option>
          <option value={25}>25 Jobs Per Page</option>
        </Select>
      </Flex>

      {/* Job Accordions with Pagination */}
      <Stack align="center" width="100%" maxWidth="1200px">
        <JobAccordion 
          savedJobs={savedJobs}
          setSavedJobs={setSavedJobs}
        />
      </Stack>

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </Flex>
  );
}

export default App;
