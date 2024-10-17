import React, { useState } from 'react';
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
  Spinner,
} from "@chakra-ui/react";

const JobScraper = () => {
  const [url, setUrl] = useState('');
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State variables for editable job data
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');

  // Created function to handle changes in URL input / Update URL state with user's input value
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const fetchJobData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/scrape/?url=${encodeURIComponent(url)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      // Parsing response data as a JSON
      const data = await response.json();
      setJobData(data);

      // Initialize editable fields with fetched data
      setJobTitle(data.job_title || '');
      setCompany(data.company || '');
      setLocation(data.job_location || '');
      setSalary(data.salary || 'Not provided');
      setDescription(data.job_description || '');
      
      // Opens a modal to display our job data
      onOpen();
    } catch (error) {
      console.error("Error fetching job data:", error);
      setJobData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmation = () => {
    console.log("User confirms job data is correct:", {
      jobTitle,
      company,
      location,
      salary,
      description,
    });
    onClose();
  };

  return (
    <Box>
      <Input
        placeholder="Enter job listing URL"
        value={url}
        onChange={handleUrlChange}
      />
      <Box display="flex" alignItems="center">
        <Button onClick={fetchJobData} isDisabled={loading}>
          {loading ? "Please wait, loading job data" : "Fetch Job Data"}
        </Button>
        {loading && <Spinner size="sm" ml={2} />}
      </Box>

      {/* Job Data Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="1000px">
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

            {/* Location */}
            <FormControl mt={4}>
              <FormLabel>Location</FormLabel>
              <Input 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
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
              Confirm
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default JobScraper;
