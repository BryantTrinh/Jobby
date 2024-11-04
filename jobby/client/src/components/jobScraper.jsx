import React, { useEffect, useState } from 'react';
import {
  Box,
  Input,
  Button,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Progress,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  Text,
} from "@chakra-ui/react";
import JobAccordion from './jobAccordion';

const JobScraper = () => {
  const [url, setUrl] = useState('');
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [savedJobs, setSavedJobs] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State variables for editable job data
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');


  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const fetchJobData = async () => {
    setLoading(true);
    setProgress(0);
    let intervalId;

    intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 99) {
          return prevProgress + 1;
        } else {
          return prevProgress;
        }
      });
    }, 190);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/scrape/?url=${encodeURIComponent(url)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url })
      });
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      
      console.log("Fetched job data:", data);

      setJobTitle(data.job_title || '');
      setCompany(data.company || '');
      setCity(data.city || '');
      setState(data.state || '');
      setSalary(data.salary || 'Not provided');
      setDescription(data.job_description || '');
      
      setProgress(100);
      onOpen();
    } catch (error) {
      console.error("Error fetching job data:", error);
      setJobData(null);
      setProgress(100);
    } finally {
      setLoading(false);
      clearInterval(intervalId);
    }
  };

const handleConfirmation = async () => {
    const newJob = { 
        job_title: jobTitle, 
        company: company, 
        city: city, 
        state: state, 
        salary: salary, 
        job_description: description,
        url: url
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/api/jobs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newJob),
        });

        if (!response.ok) {
            throw new Error(`Error saving job: ${response.statusText}`);
        }

        const savedJob = await response.json();
        console.log("Job saved successfully:", savedJob);
        

        setSavedJobs((prevJobs) => [...prevJobs, savedJob]);
        
    } catch (error) {
        console.error("Error saving job data:", error);
    }

    onClose();
};

  return (
    <Box>
      <Input
        placeholder="Enter job listing URL"
        value={url}
        onChange={handleUrlChange}
      />
      <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
        <Button colorScheme="teal" onClick={fetchJobData} isDisabled={loading}>
          {loading ? `Loading: ${progress}%` : "Fetch Job Data"}
        </Button>
        {loading && (
          <Progress
            value={progress}
            size="sm"
            width="100px"
            ml={4}
            colorScheme="teal"
          />
        )}
      </Box>

      {/* Job Data Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="1000px" textAlign="center">
          <ModalHeader>Confirm Job Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            {/* Job Title */}
            <FormControl>
              <FormLabel>Job Title</FormLabel>
              <Input 
                value={jobTitle} 
                onChange={(e) => setJobTitle(e.target.value)} 
              />
            </FormControl>

            {/* Company */}
            <FormControl mt={4}>
              <FormLabel>Company</FormLabel>
              <Input 
                value={company} 
                onChange={(e) => setCompany(e.target.value)} 
              />
            </FormControl>

            {/* City */}
            <FormControl mt={4}>
              <FormLabel>City</FormLabel>
              <Input 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
              />
            </FormControl>

            {/* State */}
            <FormControl mt={4}>
              <FormLabel>State</FormLabel>
              <Input 
                value={state} 
                onChange={(e) => setState(e.target.value)} 
              />
            </FormControl>

            {/* Salary */}
            <FormControl mt={4}>
              <FormLabel>Salary</FormLabel>
              <Input 
                value={salary} 
                onChange={(e) => setSalary(e.target.value)} 
              />
            </FormControl>

            {/* Description */}
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                resize="none"
                height="500px"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleConfirmation}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <JobAccordion savedJobs={savedJobs} setSavedJobs={setSavedJobs} />

    </Box>
  );
};

export default JobScraper;