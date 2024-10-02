import React from 'react';
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
  useDisclosure
} from "@chakra-ui/react";
import logo from './assets/Logo.svg';
import './App.css';

function JobAccordion() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  return (
    <Box width="800px" maxWidth="800px" marginBottom="20px" mr={600}>
      <Accordion fontFamily="Verdana" defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }} onClick={onOpen}>
              <Box as='span' flex='1' textAlign='left'>
                Job 1 (Company Name)
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* Modal that opens when AccordionButton is clicked */}
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Job Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <p><strong>Title:</strong> Nexon-Full Stack GM</p>
              <p><strong>Company:</strong> Nexon</p>
              <p><strong>Job URL:</strong> <a href="job-url-populates-here" target="_blank">www.nexon.com/careers/full_stack_GM</a></p>
              <p><strong>Applied Date:</strong> 01/01/2025</p>
              <p><strong>State:</strong> California</p>
              <p><strong>Salary:</strong> $XXX,XXX</p>
              <p><strong>Requirements:</strong> HTML, CSS, React, Python, SQL, PostGres</p>
              <p><strong>Description:</strong>Lorem ipsum odor amet, consectetuer adipiscing elit. Lacinia feugiat neque euismod tempor hac. Cursus nostra ut dui aenean aptent facilisi. Ad conubia sagittis augue lacus per malesuada at sollicitudin. Nulla eget suspendisse senectus sapien pharetra. Lacinia ullamcorper neque accumsan ullamcorper nunc enim praesent pretium. Facilisis vulputate tristique; vel ultrices eget vivamus. Nibh fringilla suspendisse curae cubilia nostra aliquam volutpat. Tristique litora sit accumsan litora volutpat parturient torquent vel. Condimentum congue ut dictum feugiat fringilla vulputate. Senectus magna senectus phasellus habitant imperdiet. Aenean habitant accumsan senectus, nunc penatibus nam. Pretium gravida iaculis mus proin adipiscing est. Eget adipiscing ultrices penatibus libero porttitor varius morbi. Odio imperdiet tempor tellus ultrices sagittis. Bibendum libero facilisis platea elit pharetra habitant. Id sapien felis metus nam ullamcorper at dolor risus tincidunt.</p>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
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
        alignContent="flex-start"
        justifyContent="flex-start"
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
    <Flex width="100%" alignItems="flex-start"> 
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
