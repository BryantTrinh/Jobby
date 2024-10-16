import React, { useState } from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormLabel,
  Input,
  Text,
  Textarea,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';

function JobAccordion() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [overlay, setOverlay] = useState(null);

  const OverlayTwo = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px'
    />
  );


  const [jobDetails, setJobDetails] = useState({
    title: 'Nexon-Full Stack GM',
    company: 'Nexon',
    url: 'www.nexon.com/careers/full_stack_GM',
    appliedDate: '01/01/2025',
    state: 'California',
    salary: '$XXX,XXX',
    requirements: 'HTML, CSS, React, Python, SQL, PostGres',
    description: 'Lorem ipsum odor amet, consectetuer adipiscing elit...'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

// Job accordion
  return (
    <Box width="800px" maxWidth="800px" marginBottom="20px" mr={600}>
      <Accordion fontFamily="Verdana" defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }} 
            onClick={() => {
              setOverlay(<OverlayTwo />);
              onOpen();
            }}
            >
              <Box as='span' flex='1' textAlign='left'>
                {jobDetails.company}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}></AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* Modal that opens when job accordion is clicked */}
<Modal isOpen={isOpen} onClose={onClose}>
  {overlay}
  <ModalContent>
    <ModalHeader textAlign="center">{isEditing ? 'Edit Job Details' : 'Job Details'}</ModalHeader>
    <ModalCloseButton />

    <ModalBody>
      <Stack spacing={4}>
        {/* Job Title */}
        <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
          <FormLabel>Job Title:</FormLabel>
          {isEditing ? (
            <Input
              name="title"
              placeholder="Job Title"
              value={jobDetails.title}
              onChange={handleInputChange}
            />
          ) : (
            <Text>{jobDetails.title}</Text>
          )}
        </Box>

        {/* Company */}
        <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
          <FormLabel>Company:</FormLabel>
          {isEditing ? (
            <Input
              name="company"
              placeholder="Company"
              value={jobDetails.company}
              onChange={handleInputChange}
            />
          ) : (
            <Text>{jobDetails.company}</Text>
          )}
        </Box>

        {/* Job URL */}
        <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
          <FormLabel>Job URL:</FormLabel>
          {isEditing ? (
            <Input
              name="url"
              placeholder="Job URL"
              value={jobDetails.url}
              onChange={handleInputChange}
            />
          ) : (
            <a href={jobDetails.url} target="_blank" rel="noopener noreferrer">
              {jobDetails.url}
            </a>
          )}
        </Box>

        {/* Applied Date */}
        <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
          <FormLabel>Applied Date:</FormLabel>
          {isEditing ? (
            <Input
              name="appliedDate"
              placeholder="Applied Date"
              value={jobDetails.appliedDate}
              onChange={handleInputChange}
            />
          ) : (
            <Text>{jobDetails.appliedDate}</Text>
          )}
        </Box>

        {/* State */}
        <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
          <FormLabel>State:</FormLabel>
          {isEditing ? (
            <Input
              name="state"
              placeholder="State"
              value={jobDetails.state}
              onChange={handleInputChange}
            />
          ) : (
            <Text>{jobDetails.state}</Text>
          )}
        </Box>

        {/* Salary */}
        <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
          <FormLabel>Salary:</FormLabel>
          {isEditing ? (
            <Input
              name="salary"
              placeholder="Salary"
              value={jobDetails.salary}
              onChange={handleInputChange}
            />
          ) : (
            <Text>{jobDetails.salary}</Text>
          )}
        </Box>

        {/* Requirements */}
        <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
          <FormLabel>Requirements:</FormLabel>
          {isEditing ? (
            <Input
              name="requirements"
              placeholder="Requirements"
              value={jobDetails.requirements}
              onChange={handleInputChange}
            />
          ) : (
            <Text>{jobDetails.requirements}</Text>
          )}
        </Box>

        {/* Description */}
        <Box border={isEditing ? "5px solid tomato" : "5px solid teal"} p={4} borderRadius="md">
          <FormLabel>Description:</FormLabel>
          {isEditing ? (
            <Textarea
              name="description"
              placeholder="Description"
              value={jobDetails.description}
              onChange={handleInputChange}
            />
          ) : (
            <Text>{jobDetails.description}</Text>
          )}
        </Box>
      </Stack>
    </ModalBody>

    <ModalFooter>
      {isEditing ? (
        <>
          <Button colorScheme='teal' onClick={toggleEditMode}>
            Save Changes
          </Button>
          <Button variant='ghost' ml={3} onClick={toggleEditMode}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Button variant='ghost' colorScheme='teal' onClick={toggleEditMode}>
            Edit
          </Button>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </>
      )}
    </ModalFooter>
  </ModalContent>
</Modal>
</Box>
  );
}

export default JobAccordion;