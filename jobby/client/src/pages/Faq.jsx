import React from 'react';
import { Box, Heading, Text, Stack, List, ListItem } from '@chakra-ui/react';

function FAQ() {
  const faqItems = [
    {
      question: 'What is this application about?',
      answer: ['This application helps you manage and track job applications efficiently.'],
    },
    {
      question: 'What websites can I save?',
      answer: ['At the moment, Jobby only supports Indeed.']
    },
    {
      question: 'How can I save a job application?',
      answer: [
        'Start by searching for a job on Indeed.',
        'Click on the job you have applied to and grab the link.',
        'Pass the link into Jobby and press Fetch Job Data.',
        'Confirm the job information and press Save Job.',
        'Press View In Depth Job Details to view full job information.',
      ],
    },
    {
      question: 'Can I edit job details after saving?',
      answer: ['Go to the Saved Jobs page, press the edit button, and save the changes.'],
    },
    {
      question: 'What do I do if I encounter an error?',
      answer: [
        'Ensure you have not already saved the job, as duplicates are not supported.',
        'Use the search bar on Indeed to find jobs rather than selecting from the homepage.',
        'Check your internet connection or refresh the page.',
        'If issues persist, contact support.',
      ],
    },
    {
      question: 'Is there a mobile version of this application?',
      answer: ['Yes, the application is responsive and works on mobile devices.'],
    },
  ];

  return (
    <Box maxWidth="800px" mx="auto" p={6} mt={10}>
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Frequently Asked Questions
      </Heading>
      <Stack spacing={6}>
        {faqItems.map((item, index) => (
          <Box key={index}>
            <Heading as="h2" size="md" mb={2} color="teal.600">
              {item.question}
            </Heading>
            <List spacing={2} pl={4}>
              {item.answer.map((point, i) => (
                <ListItem key={i} listStyleType="disc">
                  <Text>{point}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default FAQ;
