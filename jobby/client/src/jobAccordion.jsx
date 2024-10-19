import React, { useState } from 'react';
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
  Textarea,
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

  return (
    <Box width="800px" maxWidth="800px" marginBottom="20px">
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
                    {job.company}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              </AccordionPanel>
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
            <Stack spacing={4}>
              {selectedJobIndex !== null && savedJobs[selectedJobIndex] && (
                <>
                  {/* Job Title */}
                  <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
                    <FormLabel>Job Title:</FormLabel>
                    <Input
                      name="title"
                      placeholder="Job Title"
                      value={isEditing ? savedJobs[selectedJobIndex].jobTitle : savedJobs[selectedJobIndex].jobTitle}
                      onChange={(e) => {
                        const newJobs = [...savedJobs];
                        newJobs[selectedJobIndex].jobTitle = e.target.value;
                        setSavedJobs(newJobs);
                      }}
                    />
                  </Box>

                  {/* Company */}
                  <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
                    <FormLabel>Company:</FormLabel>
                    <Input
                      name="company"
                      placeholder="Company"
                      value={isEditing ? savedJobs[selectedJobIndex].company : savedJobs[selectedJobIndex].company}
                      onChange={(e) => {
                        const newJobs = [...savedJobs];
                        newJobs[selectedJobIndex].company = e.target.value;
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
                      value={isEditing ? savedJobs[selectedJobIndex].city : savedJobs[selectedJobIndex].city}
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
                      value={isEditing ? savedJobs[selectedJobIndex].state : savedJobs[selectedJobIndex].state}
                      onChange={(e) => {
                        const newJobs = [...savedJobs];
                        newJobs[selectedJobIndex].state = e.target.value;
                        setSavedJobs(newJobs);
                      }}
                    />
                  </Box>

                  {/* Salary */}
                  <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
                    <FormLabel>Salary:</FormLabel>
                    <Input
                      name="salary"
                      placeholder="Salary"
                      value={isEditing ? savedJobs[selectedJobIndex].salary : savedJobs[selectedJobIndex].salary}
                      onChange={(e) => {
                        const newJobs = [...savedJobs];
                        newJobs[selectedJobIndex].salary = e.target.value;
                        setSavedJobs(newJobs);
                      }}
                    />
                  </Box>

                  {/* Description */}
                  <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
                    <FormLabel>Description:</FormLabel>
                    <Textarea
                      height="500px"
                      name="description"
                      placeholder="Job Description"
                      value={isEditing ? savedJobs[selectedJobIndex].description : savedJobs[selectedJobIndex].description}
                      onChange={(e) => {
                        const newJobs = [...savedJobs];
                        newJobs[selectedJobIndex].description = e.target.value;
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
      <Button colorScheme='blue' onClick={onClose}>Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </Box>
  );
}

export default JobAccordion;