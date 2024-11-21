import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  useDisclosure,
  Stack,
  Text,
  Select,
  Badge,
  Flex,
  Input,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function JobCard({ savedJobs, setSavedJobs }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [states, setStates] = useState([]);

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/states/');
        if (response.ok) {
          const data = await response.json();
          setStates(data);
        } else {
          console.error('Failed to fetch states');
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    }

    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedJobIndex !== null) {
      const job = savedJobs[selectedJobIndex];
      setJobDetails({
        ...job,
        state: job.state || { abbrev: '', name: '' },
      });
    }
  }, [savedJobs, selectedJobIndex]);

  const handleInputChange = (field, value) => {
    const updatedJobs = [...savedJobs];
    const updatedJob = updatedJobs[selectedJobIndex];

    if (field === 'state') {
      updatedJob.state = states.find((state) => state.name === value) || {};
    } else {
      updatedJob[field] = value;
    }

    updatedJobs[selectedJobIndex] = updatedJob;
    setSavedJobs(updatedJobs);
    setJobDetails(updatedJob);
  };

  const handleEditClick = (index) => {
    setSelectedJobIndex(index);
    setIsEditing(false);
    onOpen();
  };

  const handleDeleteJob = () => {
    setSavedJobs((prevJobs) => prevJobs.filter((_, index) => index !== selectedJobIndex));
    onClose();
  };

  const saveChangesToBackend = async () => {
    if (jobDetails?.id) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/jobs/${jobDetails.id}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jobDetails),
        });
        console.log('Job details being saved:', jobDetails);

        if (!response.ok) {
          throw new Error('Failed to save changes.');
        }

        const updatedJob = await response.json();
        setSavedJobs((prevJobs) =>
          prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
        );
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    }
    setIsEditing(false);
    onClose();
  };

  return (
    <Box width="800px" maxWidth="800px" mb="20px" mt="10">
      {savedJobs && savedJobs.length > 0 ? (
        savedJobs.map((job, index) => (
          <Box
            key={index}
            border="1px solid #E2E8F0"
            borderRadius="md"
            p={4}
            mb={4}
            backgroundColor="white"
            boxShadow="sm"
          >
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text fontSize="xl" fontWeight="bold">
                {job.job_title}
              </Text>
              <Badge colorScheme="green" fontSize="md">
                <Text textAlign="center"> Salary: </Text>
                {job.salary_start && job.salary_end
                  ? `$${job.salary_start.toLocaleString()} - $${job.salary_end.toLocaleString()}`
                  : job.salary_start
                  ? `$${job.salary_start.toLocaleString()}`
                  : job.salary_end
                  ? `$${job.salary_end.toLocaleString()}`
                  : 'Salary not specified'}
              </Badge>
            </Flex>
            <Flex justifyContent="space-between" mb={2}>
              <Text>Company: {job.company}</Text>
              <Text>City: {job.city}</Text>
            </Flex>
            <Flex justifyContent="space-between" mb={2}>
              <Text>State: {job.state?.name || 'N/A'}</Text>
              <Text>Applied: {job.applied || 'Not applied yet'}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Button
                colorScheme="blue"
                onClick={() => {
                  const jobDetailsUrl = `http://127.0.0.1:8000/api/jobs/${job.id}`;
                  window.location.href = jobDetailsUrl;
                }}
              >
                View Job Details
              </Button>
              <Button colorScheme="teal" onClick={() => handleEditClick(index)}>
                Edit Job
              </Button>
              <IconButton
                aria-label="Delete job"
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => {
                  setSelectedJobIndex(index);
                  handleDeleteJob();
                }}
              />
            </Flex>
          </Box>
        ))
      ) : (
        <Text>No saved jobs available.</Text>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {isEditing ? 'Edit Job Details' : 'Job Details'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {jobDetails && (
              <Stack spacing={4}>
                <Box>
                  <FormLabel>Company:</FormLabel>
                  <Input
                    name="company"
                    value={jobDetails.company || ''}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    isDisabled={!isEditing}
                  />
                </Box>
                <Box>
                  <FormLabel>Job Title:</FormLabel>
                  <Input
                    name="job_title"
                    value={jobDetails.job_title || ''}
                    onChange={(e) => handleInputChange('job_title', e.target.value)}
                    isDisabled={!isEditing}
                  />
                </Box>
                <Box>
                  <FormLabel>City:</FormLabel>
                  <Input
                    name="city"
                    value={jobDetails.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    isDisabled={!isEditing}
                  />
                </Box>
                <Box>
                  <FormLabel>State:</FormLabel>
                  <Select
                    name="state"
                    value={jobDetails?.state?.name || ''}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    isDisabled={!isEditing}
                  >
                    {states.map((state) => (
                      <option key={state.abbrev} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Stack>
            )}
          </ModalBody>
          <ModalFooter>
            {isEditing ? (
              <Button colorScheme="teal" onClick={saveChangesToBackend}>
                Save Changes
              </Button>
            ) : (
              <Button colorScheme="teal" onClick={() => setIsEditing(true)}>
                Edit Job
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default JobCard;
