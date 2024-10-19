import React, { useState } from 'react';
import { Flex, Stack, Text, Input, Button } from "@chakra-ui/react";

const JobFilter = ({ savedJobs, onFilter }) => {
const [company, setCompany] = useState('');
const [city, setCity] = useState('');
const [state, setState] = useState('');
const [title, setTitle] = useState('');

const handleFilter = () => {
  const filteredJobs = savedJobs.filter(job => {
    return (
        (company === '' || job.company.toLowerCase().includes(company.toLowerCase())) &&
        (city === '' || job.city.toLowerCase().includes(city.toLowerCase())) &&
        (state === '' || job.state.toLowerCase().includes(state.toLowerCase())) &&
        (title === '' || job.title.toLowerCase().includes(title.toLowerCase()))
      );
    });
  onFilter(filteredJobs); 
  };

 return (
    <Flex width="100%" justifyContent="center" alignItems="center"> 
      <Stack fontFamily="Verdana" spacing={4} align="center" width="300px" ml={100} mr={200}>
        <Text fontSize='3xl' align="center" color='#008080'>Application Filter</Text>

        {/* Company*/}
        <Input
          placeholder="Company name"
          size="md"
          textAlign="center"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        {/* Job Title*/}
        <Input
          placeholder="Job title"
          size="md"
          textAlign="center"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* City*/}
        <Input
          placeholder="City"
          size="md"
          textAlign="center"
          value={city}
          onChange={(e) => setState(e.target.value)}
        />

        {/* State*/}
        <Input
          placeholder="State"
          size="md"
          textAlign="center"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <Button colorScheme='teal' size='md' onClick={handleFilter}>
          Search
        </Button>
      </Stack>
    </Flex>
  );
};

export default JobFilter;
