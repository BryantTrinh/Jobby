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
        const existingStates = data.some(state => state.abbrev === remoteState.abbrev);
        if (!existingStates) {
          data.unshift(remoteState);
        }
        setStates(data);
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
    const { name, value } = e.target;
    if (name === "state") {
      const selectedState = states.find((state) => state.abbrev === value);
      setEditedJob({
        ...editedJob,
        state: selectedState || editedJob.state,
      });
    } else {
      setEditedJob({ ...editedJob, [name]: value });
    }
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const saveJob = async () => {
    const jobData = {
      job_title: editedJob.job_title,
      company: editedJob.company,
      job_description: editedJob.job_description,
      state: editedJob.state?.abbrev || editedJob.state,
      city: editedJob.city,
      salary_start: editedJob.salary_start || null,
      salary_end: editedJob.salary_end || null,
      payment_type: editedJob.payment_type,
      job_requirements: editedJob.job_requirements,
      url: job.url,
    };

    console.log("JSON data sent", jobData);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/jobs/${jobid}/`, {
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
        const responseText = await response.text();
        throw new Error(`Error saving job: ${responseText}`);
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

    setIsEditing(false);
  };

  const handlePaymentTypeChange = (e) => {
    const selectedType = e.target.value;
    setEditedJob({ ...editedJob, payment_type: selectedType });
    setPaymentType(selectedType);
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
              value={editedJob.state?.abbrev || ''}
              onChange={handleInputChange}
              mb={2}
            >
              {states.map((state) => (
                <option key={state.abbrev} value={state.abbrev}>
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
            isReadOnly
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
            value={editedJob.payment_Type}
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
        onClick={isEditing ? saveJob : toggleEditing}
      >
        {isEditing ? "Save" : "Edit"}
      </Button>
    </Box>
  );
}

export default JobDetails;
