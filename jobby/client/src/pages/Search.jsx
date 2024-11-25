import React, { useState } from 'react';
import { Flex, Stack, Text } from '@chakra-ui/react';
import JobFilter from '../components/jobFilter';

const Search = ({ savedJobs }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleFilter = (filteredResults) => {
    setFilteredJobs(filteredResults);
  };

  return (
    <Flex 
      direction="column" 
      align="center" 
      justify="center" 
      p={4} 
      width="100%"
    >
      <Flex 
        direction="column" 
        align="center" 
        width="100%" 
        maxWidth="800px" 
        mb={30}
      >
        <Text fontSize="5xl" color="red" mt={-20} mb={4}>
          Job Search
        </Text>
        
        {/* Job Filter Component*/}
        <Flex 
          width="100%" 
          justify="center"
        >
          <JobFilter 
            savedJobs={savedJobs} 
            onFilter={handleFilter} 
            width="100%"
            maxWidth="600px" 
          />
        </Flex>
      </Flex>

      {filteredJobs.length > 0 && (
        <Stack spacing={4} width="100%" maxWidth="800px">
          {filteredJobs.map((job) => (
            <Flex 
              key={job.id} 
              borderWidth="1px" 
              borderRadius="lg" 
              padding={4}
              justify="space-between"
            >
              <Text>{job.title}</Text>
              <Text>{job.company}</Text>
              <Text>{job.city}, {job.state}</Text>
            </Flex>
          ))}
        </Stack>
      )}
    </Flex>
  );
};

export default Search;
