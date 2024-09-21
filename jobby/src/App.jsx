import { Heading, Text, Box, Flex, Stack, Input, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button } from "@chakra-ui/react";
import './App.css';

function App() {
  return (
    <Flex
        width={"100vw"}
        Height={"100vh"}
        alignContent={"flex-start"}
        justifyContent={"flex-start"}
        p={4}
        direction="column"
    >
      {/* Save application field and save button */}
      <Flex
        width="100%"
        justifyContent="center" 
        mb={20
      }>
        <Stack spacing={4} direction="row" align="center">
          <Input
            placeholder="Save application via entering in URL"
            size="md"
            width="350px"
          />
          <Button colorScheme='teal' size='md'>
            Save job application
          </Button>
        </Stack>
      </Flex>


      {/* Search field and button */}
  <Stack spacing={4} direction="row" align="flex-start" mb={4}>
        <Input
          placeholder="Search job applications via company name"
          size="md"
          width="350px"
        />
        <Button colorScheme='teal' size='md'>
          Search
        </Button>
      </Stack>

      {/* Accordion container for jobs */}
  <Box width="800px" marginBottom="20px">
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
            
            <Box as='span' flex='1' textAlign='left'>
              Job 1 (Company Name)
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
            
            <Box as='span' flex='1' textAlign='left'>
              Job 2 (Company Name)
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
            <Box as='span' flex='1' textAlign='left'>
              Job 3 (Company Name)
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </AccordionPanel>
      </AccordionItem>

          <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
            
            <Box as='span' flex='1' textAlign='left'>
              Job 4 (Company Name)
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </AccordionPanel>
      </AccordionItem>

          <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
            <Box as='span' flex='1' textAlign='left'>
              Job 5 (Company Name)
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </Box>
</Flex>
  );
}

export default App;