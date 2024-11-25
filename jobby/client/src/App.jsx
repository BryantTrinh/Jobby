import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SavedJobs from './pages/SavedJobs';
import JobDetails from './pages/JobDetails';
import Search from './pages/Search';
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
import JobScraper from './components/jobScraper';
import JobCard from './components/jobCard';
import Pagination from './components/pagination';
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
    <Router>
      {/* Navigation Bar */}
      <Flex 
        as="nav" 
        bg="teal.500" 
        p={4} 
        justifyContent="center"
        alignItems="center"
        position="fixed"
        top="0"
        left="0"
        zIndex="10"
        mx="auto"
        width="100vw"
      >
        <Link to="/">
        <Button 
          variant="ghost"
          color="white"
          _hover={{ backgroundColor: 'teal.600' }}
          >
            Home
            </Button>
      </Link>
        <Link to="/jobby/savedJobs">
          <Button 
            variant="ghost" 
            color="white" 
            _hover={{ backgroundColor: 'teal.600' }}
          >
            Saved Jobs
          </Button>
        </Link>

        <Link to="/jobby/search">
          <Button 
            variant="ghost" 
            color="white" 
            _hover={{ backgroundColor: 'teal.600' }}
          >
            Search Through Jobs
          </Button>
        </Link>
      </Flex>

      {/* Main Layout */}
      <Flex
        width="100vw"
        height="100%"
        alignContent="center"
        justifyContent="center"
        p={4}
        direction="column"
      >
        {/* Website Logo */}
        {/* <Stack align="center" mb={4}>
          <Link to="/">
          <Image
            src={logo}
            alt="Website logo"
            width="400px"
            height="300px"
            cursor="pointer"
          />
        </Link>
      </Stack> */}

        {/* Page URL Routes */}
        <Routes>
          <Route path="/" element={
            <>
              <Stack 
                fontFamily="Verdana" 
                mb={10} 
                align="center"
              >
                <h2>
                  <Text fontSize='3xl' color='#008080' mt={-20}>Job Documentation & Assistance</Text>
                  <Text fontSize='3xl' color='#008080' align="center">Powered by AI</Text>
                </h2>
              </Stack>
              
              {/* Job Scraper for testing */}
              <Flex 
                width="100%" 
                justifyContent="center" 
                alignItems="flex-start" 
                mb={20}
              >
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
            </>
          } />
          <Route path="/jobby/savedJobs" element={<SavedJobs />} />
          <Route path="/jobby/job/:jobid" element={<JobDetails />} />
          <Route path="/jobby/search" element={<Search savedJobs={savedJobs} />} />
        </Routes>
      </Flex>
    </Router>
  );
}

export default App;
