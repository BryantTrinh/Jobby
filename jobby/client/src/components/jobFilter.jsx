import React, { useState } from 'react';
import {
  Box,
  Badge,
  Flex,
  Text,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const JobFilter = () => {
  const [filterOption, setFilterOption] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleFilter = async () => {
    const url = `http://127.0.0.1:8000/api/jobs?${filterOption.toLowerCase()}=${filterValue}`;
    console.log("Fetching jobs from URL:", url);

    setHasSearched(true);

    try {
      const response = await fetch(url);
      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Filtered jobs data:", data);

        if (data.data.length === 0) {
          console.warn("No matching jobs found.");
        }

        setFilteredJobs(data.data);
      } else {
        console.error("Failed to fetch jobs. Status:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <Flex direction="column" align="center" width="100%" maxWidth="800px" mt={10}>
      <Text fontSize='3xl' align="center" color='#008080'>Application Filter</Text>
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

      <Box width="100%" mt={6}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => {
            console.log("Job object:", job);
            return (
              <Box
                key={index}
                border="1px solid #E2E8F0"
                borderRadius="md"
                p={4}
                mb={4}
                backgroundColor="white"
                boxShadow="sm"
              >
                <Flex justifyContent="space-between" alignItems="center" mb={3}>
                  <Link to={`/jobby/job/${job.id}`}>
                    <Text fontSize="xl" fontWeight="bold" color="blue.500" textDecoration="underline" cursor="pointer">
                      {job.job_title}
                    </Text>
                  </Link>

                  <Flex flexDirection="column" alignItems="flex-end" ml={4}>
                    <Text fontSize="md" fontWeight="bold">Date Applied:</Text>
                    <Text>{job.applied ? job.applied : "Not applied yet"}</Text>
                  </Flex>
                </Flex>

                <Flex justifyContent="space-between" alignItems="center" mb={3}>
                  <Flex flexDirection="column" alignItems="flex-start">
                    <Text fontSize="md">Company: {job.company}</Text>
                    {job.state?.name?.toLowerCase() !== 'remote' && (
                      <>
                        <Text fontSize="md">City: {job.city || 'N/A'}</Text>
                        <Text fontSize="md">State: {job.state?.name || 'N/A'}</Text>
                      </>
                    )}
                    {job.state?.name?.toLowerCase() === 'remote' && 
                      <Text fontSize="md">Location: Remote</Text>
                    }
                  </Flex>

                  <Flex justifyContent="flex-end" alignItems="center">
                    <Badge colorScheme="green" fontSize="md" textAlign="center" p={2}>
                      <Flex flexDirection="column" alignItems="center">
                        <Text mb={2}>
                          {job.salary_start && job.salary_end
                            ? `$${job.salary_start.toLocaleString()} - $${job.salary_end.toLocaleString()}`
                            : job.salary_start
                            ? `$${job.salary_start.toLocaleString()}`
                            : job.salary_end
                            ? `$${job.salary_end.toLocaleString()}`
                            : "Salary not specified"
                          }
                        </Text>
                        <Text fontSize="sm" fontWeight="bold">
                          {job.payment_type === 'hourly' ? 'Hourly' : 'Yearly'}
                        </Text>
                      </Flex>
                    </Badge>
                  </Flex>
                </Flex>
              </Box>
            );
          })
        ) : hasSearched && (
          <Text mt={4} fontSize="lg" color="gray.500" textAlign="center">
            No jobs found. Try adjusting your search.
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default JobFilter;
