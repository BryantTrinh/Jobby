import React from 'react';
import { useParams } from 'react-router-dom';

function JobDetails() {
  const { jobid } = useParams();

  return (
    <div>
      <h1>Job Details</h1>
      <p>Details for job ID: {jobid}</p>
    </div>
  );
}

export default JobDetails;