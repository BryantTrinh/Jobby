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
  Link,
} from "@chakra-ui/react";
import { ChakraProvider } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

const JobScraper = () => {
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [isJobSaved, setIsJobSaved] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [city, setCity] = useState('');
  const [salaryStart, setSalaryStart] = useState('');
  const [salaryEnd, setSalaryEnd] = useState('');
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [paymentType, setPaymentType] = useState('');
  const [jobRequirements, setJobRequirements] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [url, setUrl] = useState('');
  const toast = useToast();

const fetchStates = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/states/');
    if (!response.ok) throw new Error('Error fetching states');
    const data = await response.json();
    setStates(data);
  } catch (error) {
    console.error("Error fetching states:", error);
    toast({
      title: "Failed to fetch states",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
};

useEffect(() => {
  fetchPaymentTypes();
  fetchStates();
}, []);


  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  // REGEX for fetch job data. Want to make sure we enter a valid indeed link before being able to press Fetch
  const isValidUrl = (urlString) => {
    const urlPattern = /^(https?:\/\/)?(www\.)?indeed\.com\/(?:q-[^&]+-l-[^&]+|jobs)\?.*$/;
    return urlPattern.test(urlString);
  };

  const fetchJobData = async () => {
    setLoading(true);
    setIsJobSaved(false);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/scrape/?url=${encodeURIComponent(url)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);

      const data = await response.json();
      console.log("State abbreviation:", data.state);

    setJobTitle(data.job_title || '');
    setCompany(data.company || '');
    setJobDescription(data.job_description || '');
    setSelectedState(data.state || '');
    setCity(data.city || '');
    setSalaryStart(data.salary_start || null);
    setSalaryEnd(data.salary_end || null);
    setPaymentType(data.payment_type);
    setJobRequirements(Array.isArray(data.job_requirements) ? data.job_requirements : []);

    onOpen();
    } catch (error) {
      console.error("Error fetching job data:", error);
      toast({
        title: "Failed to fetch job data",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Code for saving to DB
const handleConfirmation = async () => {
  if (!selectedState) {
    console.error("State is missing or invalid:", selectedState);
    toast({
      title: "Failed to save job, job could already be saved. If not, please try again!",
      description: "State is missing or invalid.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return;
  }

  const newJob = {
    job_title: jobTitle,
    company: company,
    job_description: jobDescription,
    job_requirements: jobRequirements,
    payment_type: paymentType,
    salary_start: salaryStart || null,
    salary_end: salaryEnd || null,
    url: url,
    city: city,
    state: selectedState,
  };

    console.log("Saving Job Data:", newJob);
    console.log("Selected State Abbreviation:", selectedState);
    console.log("Payment Type being saved:", paymentType);

  try {
    const response = await fetch('http://127.0.0.1:8000/api/jobs/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob),
    });
    if (!response.ok) throw new Error(`Error saving job: ${response.statusText}`);
    const savedJob = await response.json();
    console.log("Saved Job:", savedJob);
    setSavedJobs((prevJobs) => [...prevJobs, savedJob]);

    setIsJobSaved(true);
    toast({
      title: "Job saved successfully!",
      status: "success",
      duration: 10000,
      isClosable: true,
    });
  } catch (error) {
    console.error("Error saving job data:", error);
    toast({
      title: "Failed to save, job is already be saved",
      description: "If not, please try again!",
      status: "error",
      duration: 10000,
      isClosable: true,
    });
  }
};

  // Adding this code to allow user to select hourly or yearly in the dropdown before saving job.
  const fetchPaymentTypes = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/payment/type/');
    if (!response.ok) throw new Error('Error fetching payment types');
    const data = await response.json();
    setPaymentTypes(data);
  } catch (error) {
    console.error("Error fetching payment types:", error);
    toast({
      title: "Failed to fetch payment types",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
};

  return (
    <Box>
      <Input
        placeholder="Enter job listing URL"
        value={url}
        onChange={handleUrlChange}
      />
      <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
        <Button 
          colorScheme="teal" 
          onClick={fetchJobData} 
          isDisabled={loading || !isValidUrl(url)}
        >
          {loading ? "Loading..." : "Fetch Job Data"}
        </Button>
        {loading && (
          <Progress
            size="sm"
            width="100px"
            ml={4}
            colorScheme="teal"
            isIndeterminate
          />
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="1000px" textAlign="center">
          <ModalHeader>Confirm Job Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Job Title</FormLabel>
              <Input 
                value={jobTitle} 
                onChange={(e) => setJobTitle(e.target.value)} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Company</FormLabel>
              <Input 
                value={company} 
                onChange={(e) => setCompany(e.target.value)} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>City</FormLabel>
              <Input 
                value={city || ''}
                onChange={(e) => setCity(e.target.value)} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>State</FormLabel>
              <Input 
                value={selectedState || ''}
                onChange={(e) => setSelectedState(e.target.value)}  
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Salary Start</FormLabel>
              <Input 
                value={salaryStart} 
                onChange={(e) => setSalaryStart(e.target.value)} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Salary End</FormLabel>
              <Input 
                value={salaryEnd} 
                onChange={(e) => setSalaryEnd(e.target.value)} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Job Description</FormLabel>
              <Textarea 
                value={jobDescription} 
                onChange={(e) => setJobDescription(e.target.value)} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Payment Type</FormLabel>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input 
                  value={paymentType} 
                  isReadOnly
                  style={{ 
                    marginRight: '25px', 
                    padding: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    width: 'auto',
                    
                  }}
                />
                <select 
                  value={paymentType} 
                  onChange={(e) => setPaymentType(e.target.value)} 
                  style={{ 
                    padding: '5px', 
                    width: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                >
                  <option value="">Select Payment Type</option>
                  <option value="Per Year">Year</option>
                  <option value="Per Hour">Hour</option>
                </select>
              </div>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Job Requirements</FormLabel>
              <Textarea 
                value={jobRequirements.join(', ')} 
                onChange={(e) => setJobRequirements(e.target.value.split(', '))}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleConfirmation}>
              Save Job
            </Button>
              {isJobSaved && savedJobs.length > 0 && (
                <Button
                  colorScheme="teal"
                  mr={3}
                  onClick={() => {
                    const jobId = savedJobs[savedJobs.length - 1].id;
                    const jobDetailsUrl = `http://127.0.0.1:8000/api/jobs/${jobId}`;
                    window.location.href = jobDetailsUrl;
                    console.log('Redirecting to job details:', jobDetailsUrl);
                  }}
                >
                  View In Depth Job Details
                </Button>
              )}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default JobScraper;
