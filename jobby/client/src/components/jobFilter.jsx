import React, { useState } from 'react';
import { 
  Flex, 
  Stack,
  Text, 
  Input, 
  Button,
  Select
} from "@chakra-ui/react";

const JobFilter = ({ savedJobs, onFilter }) => {
  const [filterOption, setFilterOption] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleFilter = () => {
    const filteredJobs = savedJobs.filter(job => {
      switch (filterOption) {
        case 'Company':
          return job.company.toLowerCase().includes(filterValue.toLowerCase());
        case 'City':
          return job.city.toLowerCase().includes(filterValue.toLowerCase());
        case 'State':
          return job.state.toLowerCase().includes(filterValue.toLowerCase());
        default:
          return true;
      }
    });
    onFilter(filteredJobs); 
  };

  return (
    <Flex width="100%" justifyContent="center" alignItems="center"> 
      <Stack 
        fontFamily="Verdana" 
        spacing={4} 
        align="center" 
        width="100%"
        maxWidth="600px" 
      >
        <Text fontSize='3xl' align="center" color='#008080'>Application Filter</Text>

        {/* Dropdown Menu */}
        <Select
          placeholder="Select filter option"
          value={filterOption}
          onChange={(e) => {
            setFilterOption(e.target.value);
            setFilterValue('');
          }}
          textAlign="center"
          width="100%"
        >
          <option value="Company">Company</option>
          <option value="City">City</option>
          <option value="State">State</option>
        </Select>

        {/* Text Field for Filter Value */}
        {filterOption && (
          <Input
            placeholder={`Enter ${filterOption}`}
            size="md"
            textAlign="center"
            width="100%"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        )}

        <Button colorScheme='teal' size='md' onClick={handleFilter}>
          Search
        </Button>
      </Stack>
    </Flex>
  );
};

export default JobFilter;
