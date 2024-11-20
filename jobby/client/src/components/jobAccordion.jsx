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
  const [overlay, setOverlay] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);

  const OverlayTwo = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px'
    />
  );

  const toggleEditMode = () => {
    if (isEditing) {
      onClose();
    }
    setIsEditing(!isEditing);
  };

  const handleEditClick = (index) => {
    setSelectedJobIndex(index);
    setIsEditing(true);
    onOpen();
  };

  const handleDeleteJob = () => {
    setSavedJobs((prevJobs) => prevJobs.filter((_, index) => index !== selectedJobIndex));
    onClose();
  }

  // Fetch job details when opening the modal
  useEffect(() => {
    if (selectedJobIndex !== null) {
      const jobId = savedJobs[selectedJobIndex].id;
      fetch(`http://127.0.0.1:8000/api/jobs/${jobId}`)
        .then(response => response.json())
        .then(data => {
          setJobDetails(data);
        })
        .catch(error => console.error('Error fetching job details:', error));
    }
  }, [selectedJobIndex]);

  return (
    <Box width="800px" maxWidth="800px" mb="20px" mt="10">
      <Accordion fontFamily="Verdana" allowMultiple>
        {savedJobs && savedJobs.length > 0 ? (
          savedJobs.map((job, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton 
                  _expanded={{ bg: 'tomato', color: 'white' }} 
                  onClick={() => {
                    setSelectedJobIndex(index);
                    onOpen();
                  }}
                >
                  <Box as='span' flex='1' textAlign='left'>
                    <Text fontWeight="bold">{job.company}:</Text> 
                    <Text> {job.job_title} </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
            </AccordionItem>
          ))
        ) : (
            <></>
          )}
      </Accordion>

      {/* Modal that opens when job accordion is clicked */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        {overlay}
        <ModalContent maxWidth="900px">
          <ModalHeader textAlign="center">{isEditing ? 'Edit Job Details' : 'Job Details'}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>

              {/* Company */}
            <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
              <FormLabel>Company:</FormLabel>
              <Input
                name="company"
                placeholder="Company"
                value={isEditing ? savedJobs[selectedJobIndex].company : jobDetails?.company}
                onChange={(e) => {
                  const newJobs = [...savedJobs];
                  newJobs[selectedJobIndex].company = e.target.value;
                  setSavedJobs(newJobs);
                }}
              />
            </Box>
            
            <Stack spacing={4}>
              {selectedJobIndex !== null && jobDetails && (
                <>
                  {/* Job Title */}
                  <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
                    <FormLabel>Job Title:</FormLabel>
                    <Input
                      name="title"
                      placeholder="Job Title"
                      value={isEditing ? savedJobs[selectedJobIndex]?.job_title || '' : jobDetails?.job_title || ''}
                      onChange={(e) => {
                        const newJobs = [...savedJobs];
                        newJobs[selectedJobIndex].job_title = e.target.value;
                        setSavedJobs(newJobs);
                      }}
                    />
                  </Box>

                  {/* City */}
                  <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
                    <FormLabel>City:</FormLabel>
                    <Input
                      name="city"
                      placeholder="City"
                      value={isEditing ? savedJobs[selectedJobIndex].city : jobDetails.city}
                      onChange={(e) => {
                        const newJobs = [...savedJobs];
                        newJobs[selectedJobIndex].city = e.target.value;
                        setSavedJobs(newJobs);
                      }}
                    />
                  </Box>

                  {/* State */}
                  <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
                    <FormLabel>State:</FormLabel>
                    <Input
                      name="state"
                      placeholder="State"
                      value={isEditing ? savedJobs[selectedJobIndex].state : jobDetails?.state?.name}
                      onChange={(e) => {
                        const newJobs = [...savedJobs];
                        newJobs[selectedJobIndex].state = e.target.value;
                        setSavedJobs(newJobs);
                      }}
                    />
                  </Box>
                </>
              )}
            </Stack>
          </ModalBody>

    <ModalFooter>
      <Button colorScheme='red' onClick={handleDeleteJob} mr={3}>Delete Job</Button>
      {isEditing ? (
        <Button colorScheme='teal' onClick={toggleEditMode}> Save Changes</Button>
      ) : (
        <Button variant='ghost' colorScheme='teal' onClick={toggleEditMode}>Edit</Button>
      )}
      <Button
                  colorScheme="teal"
                  mr={3}
                  onClick={() => {
                    const jobId = savedJobs.id;
                    const jobDetailsUrl = `http://127.0.0.1:8000/api/jobs/${jobId}`;
                    window.location.href = jobDetailsUrl;
                    console.log('Redirecting to job details:', jobDetailsUrl);
                  }}
                >
                  View In Depth Job Details
                </Button>
      <Button colorScheme='blue' onClick={onClose}>Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </Box>
  );
}

export default JobAccordion;
