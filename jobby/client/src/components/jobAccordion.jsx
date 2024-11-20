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
  FormControl,
  FormLabel,
  useDisclosure,
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

function JobAccordion({ savedJobs, setSavedJobs }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    if (selectedJobIndex !== null) {
      setJobDetails(savedJobs[selectedJobIndex]);
    }
  }, [savedJobs, selectedJobIndex]);

  const handleInputChange = (field, value) => {
    const updatedJobs = [...savedJobs];
    if (field === 'state') {
      const updatedState = updatedJobs[selectedJobIndex].state || {};
      updatedState.abbrev = value;
      updatedJobs[selectedJobIndex].state = updatedState;
    } else {
      updatedJobs[selectedJobIndex][field] = value;
    }
    setSavedJobs(updatedJobs);
  };

  const handleEditClick = (index) => {
    setSelectedJobIndex(index);
    setIsEditing(true);
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
        console.log('Saving job with ID:', jobDetails.id);

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

      {/* Modal for editing jobs */}
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
                  />
                </Box>
                <Box>
                  <FormLabel>Job Title:</FormLabel>
                  <Input
                    name="job_title"
                    value={jobDetails.job_title || ''}
                    onChange={(e) => handleInputChange('job_title', e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>City:</FormLabel>
                  <Input
                    name="city"
                    value={jobDetails.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>State:</FormLabel>
                    <Input
                      name="state"
                      value={jobDetails.state?.abbrev || ''}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                    />
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
                Edit
              </Button>
            )}
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default JobAccordion;
