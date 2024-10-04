import React, { useState } from 'react';
import {
  Heading,
  Text,
  Box,
  Flex,
  Stack,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Icon,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  FormLabel,
  useDisclosure
} from "@chakra-ui/react";
import logo from './assets/Logo.svg';
import './App.css';

function JobAccordion() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const [isEditing, setIsEditing] = useState(false);

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
            <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }} onClick={onOpen}>
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
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">{isEditing ? 'Edit Job Details' : 'Job Details'}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {isEditing ? (
              <Stack spacing={4}>
                <Box>
                  <FormLabel>Job Title:</FormLabel>
                  <Input
                    name="title"
                    placeholder="Job Title"
                    value={jobDetails.title}
                    onChange={handleInputChange}
                  />
                </Box>
                
                <Box>
                  <FormLabel>Company:</FormLabel>
                  <Input
                    name="company"
                    placeholder="Company"
                    value={jobDetails.company}
                    onChange={handleInputChange}
                  />
                </Box>
                
                <Box>
                  <FormLabel>Job URL:</FormLabel>
                  <Input
                    name="url"
                    placeholder="Job URL"
                    value={jobDetails.url}
                    onChange={handleInputChange}
                  />
                </Box>
                
                <Box>
                  <FormLabel>Applied Date:</FormLabel>
                  <Input
                    name="appliedDate"
                    placeholder="Applied Date"
                    value={jobDetails.appliedDate}
                    onChange={handleInputChange}
                  />
                </Box>
                
                <Box>
                  <FormLabel>State:</FormLabel>
                  <Input
                    name="state"
                    placeholder="State"
                    value={jobDetails.state}
                    onChange={handleInputChange}
                  />
                </Box>
                
                <Box>
                  <FormLabel>Salary:</FormLabel>
                  <Input
                    name="salary"
                    placeholder="Salary"
                    value={jobDetails.salary}
                    onChange={handleInputChange}
                  />
                </Box>
                
                <Box>
                  <FormLabel>Requirements:</FormLabel>
                  <Input
                    name="requirements"
                    placeholder="Requirements"
                    value={jobDetails.requirements}
                    onChange={handleInputChange}
                  />
                </Box>
                
                <Box>
                  <FormLabel>Description:</FormLabel>
                  <Textarea
                    name="description"
                    placeholder="Description"
                    value={jobDetails.description}
                    onChange={handleInputChange}
                  />
                </Box>
              </Stack>
            ) : (
              <Box>
                <p><strong>Title:</strong> {jobDetails.title}</p>
                <p><strong>Company:</strong> {jobDetails.company}</p>
                <p><strong>Job URL:</strong> <a href={jobDetails.url} target="_blank" rel="noopener noreferrer">{jobDetails.url}</a></p>
                <p><strong>Applied Date:</strong> {jobDetails.appliedDate}</p>
                <p><strong>State:</strong> {jobDetails.state}</p>
                <p><strong>Salary:</strong> {jobDetails.salary}</p>
                <p><strong>Requirements:</strong> {jobDetails.requirements}</p>
                <p><strong>Description:</strong> {jobDetails.description}</p>
              </Box>
            )}
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

function App() {
  return (
    <Flex
        width="100vw"
        height="100%"
        alignContent="center"
        justifyContent="center"
        p={4}
        direction="column"
    >

    {/* Website Logo */}
    <Stack align="center">
      <Image
        src={logo}
        alt="Website logo"
        boxSize="350px"
      />
    </Stack>

    <Stack fontFamily="Verdana" mb={10} align="center" mt={-100}>
      <h2>
        <Text fontSize='3xl' color='#008080'>Job Documentation & Assistance</Text>
        <Text fontSize='3xl' color='#008080' align="center">Powered by AI</Text>
      </h2>
    </Stack>

    {/* Save application field and save button */}
    <Stack fontFamily="Verdana" spacing={4} align="center" mb={20} width="100%">
      <Input
        placeholder="Save application via entering in URL"
        size="md"
        width="350px"
        textAlign="center"
      />
      <Button colorScheme='teal' size='md'>
        Save job application
      </Button>
    </Stack>

    {/* Container for search field and accordion */}
    <Flex width="100%" justifyContent="center" alignItems="center"> 
      <Stack fontFamily="Verdana" spacing={4} align="center" width="300px" ml={100} mr={200}>
        <Text fontSize='3xl' align="center" color='#008080'>Application Filter</Text>
        <Input
          placeholder="Company name"
          size="md"
          textAlign="center"
        />
        <Button colorScheme='teal' size='md'>
          Search
        </Button>
      </Stack>

      {/* Include the JobAccordion component */}
      <JobAccordion />
    </Flex>
  </Flex>
  );
}

export default App;
