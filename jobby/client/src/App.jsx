import React from 'react';
import {
  Heading,
  Text,
  Box,
  Flex,
  Stack,
  Input,
  Button,
  Image,
} from "@chakra-ui/react";
import logo from './assets/Logo.svg';
import JobScraper from './JobScraper';
import JobAccordion from './JobAccordion';
import JobFilter from './JobFilter';
import './App.css';

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

      <Stack 
      fontFamily="Verdana" 
      mb={10} 
      align="center" 
      mt={-100}
      >
        <h2>
          <Text fontSize='3xl' color='#008080'>Job Documentation & Assistance</Text>
          <Text fontSize='3xl' color='#008080' align="center">Powered by AI</Text>
        </h2>
      </Stack>

      {/* Save application field and save button */}
      <Stack 
      fontFamily="Verdana" 
      spacing={4} align="center" 
      mb={20} 
      width="100%"
      >
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
      
    <Flex 
      width="100%" 
      justifyContent="center" 
      alignItems="flex-start" 
      mb={20}>
  
      {/* Job Filter*/}
      <Stack
        fontFamily="Verdana"
        spacing={4}
        align="flex-start"
        width="50px"
        ml={4}
      >
        <JobFilter />
      </Stack>

      {/* Job Scraper for testing */}
      <Stack 
      fontFamily="Verdana" 
      spacing={4} 
      align="center" 
      width="100%"
      maxWidth="1200px"
    >
        <JobScraper />
      </Stack>
    </Flex>

        {/* Job Accordion Component*/}
      <Stack
        fontFamily="Verdana"
        spacing={4}
        align="center"
        width="50%"
        ml={250}
      >
        <JobAccordion />
      </Stack>
    </Flex>
  );
}

export default App;
