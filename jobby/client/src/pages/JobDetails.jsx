import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, Spinner, Button, Input, Textarea, Select, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

function JobDetails() {
  const { jobid } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState({});
  const [states, setStates] = useState([]);
  const [paymentType, setPaymentType] = useState('hourly');
  const toast = useToast();

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/jobs/${jobid}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data);
          setEditedJob({
            ...data,
            // state: data.state?.name || '',
            state: data.state,
            job_requirements: data.job_requirements || '',
            salary_start: data.salary_start || '',
            salary_end: data.salary_end || '',
            payment_type: data.payment_type || 'hourly',
          });
          setPaymentType(data.payment_type || 'hourly');
        } else {
          setError('Failed to fetch job details.');
        }
      } catch (err) {
        setError('An error occurred while fetching job details.');
      } finally {
        setLoading(false);
      }
    }

    async function fetchStates() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/states/');
        if (!response.ok) throw new Error('Error fetching states');
        const data = await response.json();
        const remoteState = { name: "Remote", abbrev: "REM" };
        setStates([remoteState, ...data]);
      } catch (error) {
        console.error("Error fetching states:", error);
        toast({
          title: "Failed to fetch states",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }

    fetchJobDetails();
    fetchStates();
  }, [jobid]);

const handleInputChange = (e) => {
  const { name, value, type } = e.target;

  if (type === "select-one" && name === "state") {
    const selectedState = states.find(state => state.name === value);
    console.log("State selected:", selectedState);
    setEditedJob({
      ...editedJob,
      state: selectedState ? selectedState : '',
      
    });
  } else {
    setEditedJob({ ...editedJob, [name]: value });
  }
};

const handleEditToggle = async () => {
  if (isEditing) {
    const jobData = {
      job_title: editedJob.job_title,
      company: editedJob.company,
      job_description: editedJob.job_description,
      state: editedJob.state,
      city: editedJob.city,
      salary_start: editedJob.salary_start || null,
      salary_end: editedJob.salary_end || null,
      payment_type: paymentType,
      job_requirements: editedJob.job_requirements,
      url: job.url,
    };
  
    console.log("JSON data sent", jobData);
    console.log("Data being sent to the backend:", JSON.stringify(jobData, null, 2));

    try {
      const jobUrl = `http://127.0.0.1:8000/api/jobs/${jobid}/`;

      const response = await fetch(jobUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const updatedJob = await response.json();
        setJob(updatedJob);
        toast({
          title: 'Job saved.',
          description: 'The job details were successfully updated.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Save failed.',
          description: 'An error occurred while saving the job details.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Save failed.',
        description: 'An error occurred while saving the job details.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }
  setIsEditing(!isEditing);
};

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  return (
    <Box maxWidth="800px" mx="auto" p={6} border="1px solid #E2E8F0" borderRadius="md" boxShadow="md" mt={10}>
      <Flex justifyContent="space-between" alignItems="flex-start" mb={10}>
        <Flex flexDirection="column" alignItems="flex-start" flex="1">
          <Text fontSize="lg" fontWeight="bold">Job Title:</Text>
          <Input
            name="job_title"
            value={editedJob.job_title || ''}
            isReadOnly={!isEditing}
            onChange={handleInputChange}
            mb={5}
          />

          <Text fontSize="lg" fontWeight="bold">Company:</Text>
          <Input
            name="company"
            value={editedJob.company || ''}
            isReadOnly={!isEditing}
            onChange={handleInputChange}
            mb={5}
          />

          <Text fontSize="lg" fontWeight="bold">City:</Text>
          <Input
            name="city"
            value={editedJob.city || ''}
            isReadOnly={!isEditing}
            onChange={handleInputChange}
            mb={2}
          />

          <Text fontSize="lg" fontWeight="bold">State:</Text>
          {isEditing ? (
            <Select
              name="state"
              value={editedJob.state || ''}
              onChange={handleInputChange}
              mb={2}
            >
              {states.map((state, index) => (
                <option key={state.name + index} value={state.name}>
                  {state.name}
                </option>
              ))}
            </Select>
          ) : (
            <Input
              name="state"
              value={job.state?.name || 'N/A'}
              isReadOnly
              mb={2}
            />
          )}

          <Text fontSize="lg" fontWeight="bold">Date Applied:</Text>
          <Input
            name="applied"
            value={editedJob.applied || ''}
            isReadOnly={!isEditing}
            onChange={handleInputChange}
            mb={5}
          />

          <Text fontSize="lg" fontWeight="bold" mb={2}>Salary Range:</Text>
          <Flex mb={5}>
            <Input
              name="salary_start"
              value={editedJob.salary_start || ''}
              isReadOnly={!isEditing}
              onChange={handleInputChange}
              placeholder="Start Salary"
              mb={2}
              mr={2}
            />
            <Input
              name="salary_end"
              value={editedJob.salary_end || ''}
              isReadOnly={!isEditing}
              onChange={handleInputChange}
              placeholder="End Salary"
              mb={2}
            />
          </Flex>

          <Text fontSize="lg" fontWeight="bold" mb={2}>Payment Type:</Text>
          <Select
            name="payment_type"
            value={paymentType}
            onChange={handlePaymentTypeChange}
            isReadOnly={!isEditing}
            mb={5}
          >
            <option value="hourly">Hourly</option>
            <option value="yearly">Yearly</option>
          </Select>
        </Flex>
      </Flex>

      <Text fontSize="lg" fontWeight="bold" mb={2}>Job Description:</Text>
      <Textarea
        name="job_description"
        value={editedJob.job_description || ''}
        isReadOnly={!isEditing}
        onChange={handleInputChange}
        mb={5}
        height="200px"
      />

      <Text fontSize="lg" fontWeight="bold" mb={2}>Job Requirements:</Text>
      <Textarea
        name="job_requirements"
        value={editedJob.job_requirements || ''}
        isReadOnly={!isEditing}
        onChange={handleInputChange}
        mb={5}
        height="200px"
      />

      <Button
        colorScheme={isEditing ? "green" : "blue"}
        onClick={handleEditToggle}
      >
        {isEditing ? "Save" : "Edit"}
      </Button>
    </Box>
  );
}

export default JobDetails;
