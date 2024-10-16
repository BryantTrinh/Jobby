import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

const JobScraper = () => {
  const [url, setUrl] = useState('');
  const [jobData, setJobData] = useState(null);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const fetchJobData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/scrape/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }), 
      });
      const data = await response.json();
      setJobData(data); 
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  return (
    <Box>
      <Input
        placeholder="TEST FOR JSON DATA HERE"
        value={url}
        onChange={handleUrlChange}
        mb={2}
      />

      <Box textAlign="center" mb={2}>
        <Button onClick={fetchJobData} colorScheme='teal'>
          Fetch Job Data
        </Button>
      </Box>

      {jobData && (
        <Box mt={4} p={4} borderWidth={1} borderRadius="md">
          <Text fontSize="xl" fontWeight="bold">Job Details:</Text>
          <pre>{JSON.stringify(jobData, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};

export default JobScraper;