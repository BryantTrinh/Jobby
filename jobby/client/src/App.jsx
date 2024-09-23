import { Heading, Text, Box, Flex, Stack, Input, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, Icon, Image } from "@chakra-ui/react";
import logo from './assets/Logo.svg';
import './App.css';

function App() {
  return (
    <Flex
        width="100vw"
        height="100vh"
        alignContent="flex-start"
        justifyContent="flex-start"
        p={4}
        direction="column"
    >

    <Stack align="center">
      <Image
        src={logo}
        alt="Website logo"
        // boxSize="500px"
      />
    </Stack>


      {/* Save application field and save button */}
      <Stack spacing={4} align="center" mb={20} width="100%">
        <Input
          placeholder="Save application via entering in URL"
          size="md"
          width="350px"
          textAlign="center"
        />
        <Button colorScheme='teal' size='md'>
          Save job application
        </Button>
      </Stack>


        {/* Container for search field and accordion */}
      <Flex width="100%" mb={20}> 
          <Stack spacing={4} align="center" width="450px" mr={50}>
            <Input
              placeholder="Search job applications via company name"
              size="md"
              textAlign="center"
            />
            <Button colorScheme='teal' size='md'>
              Search
            </Button>
          </Stack>

    <Flex justifyContent="flex-start" width="100%">
      <Box width="800px" maxWidth="800px" marginBottom="20px" ml="200px">
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
    </Flex>
  </Flex>
      );
    }

export default App;