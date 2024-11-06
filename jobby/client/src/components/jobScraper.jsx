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

const JobScraper = () => {
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [savedJobs, setSavedJobs] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [city, setCity] = useState('');
  const [salaryStart, setSalaryStart] = useState('');
  const [salaryEnd, setSalaryEnd] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [jobRequirements, setJobRequirements] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/states/');
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  // REGEX for fetch job data. Want to make sure we enter a valid indeed link before being able to press Fetch
  const isValidUrl = (urlString) => {
    const urlPattern = /^(https?:\/\/)?(www\.)?indeed\.com\/jobs\?q=[^&]+&l=[^&]+(&[^&]*)*$/;
    const baseUrlPattern = /^(https?:\/\/)?(www\.)?indeed\.com\/?$/;
    return urlPattern.test(urlString) || baseUrlPattern.test(urlString);
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
      setJobDescription(data.job_description || '');
      setCity(data.city || '');
      setSalaryStart(data.salary_start || 'Not provided');
      setSalaryEnd(data.salary_end || 'Not provided');
      setPaymentType(data.payment_type || 'Not provided');
      setJobRequirements(Array.isArray(data.job_requirements) ? data.job_requirements : []);
      setSelectedState(data.state || '');
      setUrl(data.url || '');

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

  const selectedStateObj = states.find(
    (state) => state.name === selectedState || state.abbrev === selectedState
  );
  const stateId = selectedStateObj ? selectedStateObj.id : null;


  const newJob = {
    job_title: jobTitle,
    company: company,
    job_description: jobDescription,
    job_requirements: jobRequirements,
    payment_type: paymentType,
    salary_start: parseInt(salaryStart) || null,
    salary_end: parseInt(salaryEnd) || null,
    url: url,
    city: city,
    state: stateId || 'CA',
  };

  console.log("New Job to save:", newJob);

  try {
    const response = await fetch('http://127.0.0.1:8000/api/jobs/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error saving job:", errorResponse);
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
        <Button 
          colorScheme="teal" 
          onClick={fetchJobData} 
          isDisabled={loading || !isValidUrl(url)}
        >
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
            {/* Form controls for job data */}
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
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
              />
            </FormControl>

            {/* Remove the state dropdown */}
            <FormControl mt={4}>
              <FormLabel>State</FormLabel>
              <Input 
                value={selectedState} 
                readOnly 
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
              <Input 
                value={paymentType} 
                onChange={(e) => setPaymentType(e.target.value)} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Job Requirements</FormLabel>
              <Textarea 
                value={jobRequirements.join('\n')}
                onChange={(e) => {
                  const requirements = e.target.value.split('\n').map(item => item.trim()).filter(item => item);
                  setJobRequirements(requirements);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleConfirmation}>
              Save Job
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Accordion allowToggle>
        {savedJobs.map((job, index) => (
          <AccordionItem key={job.id || index}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {job.job_title} at {job.company}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Stack>
                <Text>Job Description: {job.description}</Text>
                <Text>Location: {job.city}, {job.state}</Text>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default JobScraper;
