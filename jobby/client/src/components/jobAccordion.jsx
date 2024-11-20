import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Button,
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  chakra,
  Select,
} from '@chakra-ui/react';

function JobAccordion({ savedJobs, setSavedJobs }) {
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
      updatedJob.state = states.find(state => state.name === value) || {};
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
      <Accordion fontFamily="Verdana" allowMultiple>
        {savedJobs && savedJobs.length > 0 ? (
          savedJobs.map((job, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton
                  _expanded={{ bg: 'tomato', color: 'white' }}
                  onClick={() => handleEditClick(index)}
                >
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontWeight="bold">{job.company}:</Text>
                    <Text>{job.job_title}</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
            </AccordionItem>
          ))
        ) : (
          <Text>No saved jobs available.</Text>
        )}
      </Accordion>

      {/* Modal for viewing/editing jobs */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent maxWidth="900px">
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
                    color="black"  
                    _disabled={{ color: 'black' }}  
                    _focus={{ borderColor: 'teal.500', color: 'black' }}  
                    sx={{
                      cursor: !isEditing ? 'not-allowed' : 'pointer',
                    }}
                  />
                </Box>
                <Box>
                  <FormLabel>Job Title:</FormLabel>
                  <Input
                    name="job_title"
                    value={jobDetails.job_title || ''}
                    onChange={(e) => handleInputChange('job_title', e.target.value)}
                    isDisabled={!isEditing}  
                    color="black"  
                    _disabled={{ color: 'black' }} 
                    _focus={{ borderColor: 'teal.500', color: 'black' }}
                    sx={{
                      cursor: !isEditing ? 'not-allowed' : 'pointer',
                    }}
                  />
                </Box>
                <Box>
                  <FormLabel>City:</FormLabel>
                  <Input
                    name="city"
                    value={jobDetails.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    isDisabled={!isEditing}  
                    color="black"  
                    _disabled={{ color: 'black' }} 
                    _focus={{ borderColor: 'teal.500', color: 'black' }}
                    sx={{
                      cursor: !isEditing ? 'not-allowed' : 'pointer',
                    }}
                  />
                </Box>
                <Box>
                  <FormLabel>State:</FormLabel>
                  <Select
                    name="state"
                    value={jobDetails?.state?.name || ''}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    isDisabled={!isEditing}
                    placeholder="Select State"
                    variant="outline"
                    sx={{
                      color: 'black !important',
                      backgroundColor: !isEditing ? 'white' : 'transparent',
                      borderColor: 'gray.300',
                      padding: '8px',
                      _focus: {
                        borderColor: 'teal.500',
                        color: 'black !important',
                      },
                      _hover: {
                        color: 'black !important',
                      },
                      _disabled: {
                        color: 'black !important',
                        backgroundColor: 'white',
                        cursor: 'not-allowed', 
                      },
                    }}
                  >
                    {states.map((state) => (
                      <option key={state.abbrev} value={state.name} style={{ color: 'black !important' }}>
                        {state.name}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Stack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDeleteJob} mr={3}>
              Delete Job
            </Button>
            {isEditing ? (
              <Button colorScheme="teal" onClick={saveChangesToBackend}>
                Save Changes
              </Button>
            ) : (
              <Button variant="ghost" colorScheme="teal" onClick={() => setIsEditing(true)}>
                Edit Job
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default JobAccordion;
