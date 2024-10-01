import { Heading, Text, Box, Flex, Stack, Input, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, Icon, Image, Grid, GridItem } from "@chakra-ui/react";
import logo from './assets/Logo.svg';
import './App.css';

function App() {
  return (
    <Flex
        width="100vw"
        height="100%"
        alignContent="flex-start"
        justifyContent="flex-start"
        p={4}
        direction="column"
    >

    {/* Website Logo */}
    <Stack align="center">
      <Image
        src={logo}
        alt="Website logo"
        
        boxSize="350px"
      />
    </Stack>

    <Stack fontFamily="Verdana" mb={10} align="center" mt={-100}>
      <h2>
      <Text fontSize='3xl' color='#008080'>Job Documentation & Assistance</Text>
      <Text fontSize='3xl' color='#008080' align="center">Powered by AI</Text>
      </h2>
    </Stack>


      {/* Save application field and save button */}
      <Stack fontFamily="Verdana" spacing={4} align="center" mb={20} width="100%">
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
      <Flex width="100%"alignItems="flex-start"> 
          <Stack fontFamily="Verdana" spacing={4} align="center" width="300px" ml={100} mr={200}>
          <Text fontSize='3xl' align="center" color='#008080'>Application Filter</Text>
            <Input
              placeholder="Company name"
              size="md"
              textAlign="center"
            />
            <Button colorScheme='teal' size='md'>
              Search
            </Button>
          </Stack>

      {/* Job Accordion Container */}
      <Box width="800px" maxWidth="800px" marginBottom="20px" mr={600}>
        <Accordion fontFamily="Verdana" defaultIndex={[0]} allowMultiple>
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

                {/* Grid container for job information */}
                <Grid
                  h='auto'
                  templateRows='repeat(6, 1fr)'
                  templateColumns='repeat(4, 1fr)'
                  gap={4}
              >
                {/* Company Name */}
                <GridItem 
                colSpan={4} 
                bg='papayawhip' 
                display="flex" 
                flexDirection="column"
                alignItems="center" justifyContent="center" 
                > 
                <Text fontWeight="bold" fontSize="lg" mb={2}>Company Name:</Text> 
                <Text fontSize="md">Nexon</Text>
                </GridItem>

                  {/* Job Title */}
                <GridItem 
                  colSpan={4} 
                  bg='lightblue' 
                  display="flex" 
                  flexDirection="column" 
                  alignItems="center" 
                  justifyContent="center"
                >
                  <Text fontWeight="bold" fontSize="lg" mb={2}>Job Title:</Text>
                  <Text fontSize="md">Full Stack Developer</Text>
                </GridItem>

                {/* Description */}
                <GridItem
                  colSpan={4}
                  bg='lightgreen'
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  >
                    <Text fontWeight="bold" fontSize="lg" mb={2}>Description:</Text>
                    <Text fontSize="md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                  </GridItem>

                   {/* Requirements */}
                  <GridItem 
                    colSpan={4} 
                    bg='lightcoral' 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center" 
                    justifyContent="center"
                  >
                    <Text fontWeight="bold" fontSize="lg" mb={2}>Requirements:</Text>
                    <Text fontSize="md">HTML, CSS, JavaScript</Text>
                  </GridItem>

                    {/* Salary */}
                  <GridItem 
                    colSpan={4} 
                    bg='lightyellow' 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center" 
                    justifyContent="center"
                  >
                    <Text fontWeight="bold" fontSize="lg" mb={2}>Salary:</Text>
                    <Text fontSize="md">$1,000,000</Text>
                  </GridItem>

                    {/* Applied Date */}
                  <GridItem 
                    colSpan={4} 
                    bg='lightpink' 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center" 
                    justifyContent="center"
                  >
                    <Text fontWeight="bold" fontSize="lg" mb={2}>Applied Date:</Text>
                    <Text fontSize="md">Sept 01, 2024</Text> 
                  </GridItem>
              </Grid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Flex>
    </Flex>
      );
    }

export default App;