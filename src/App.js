import { Heading } from "@chakra-ui/react";
import { Icon, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { BiBarChartSquare, BiCalendarWeek, BiRun, BiUser } from "react-icons/bi";
import './App.css';
import Customers from './components/Customers';
import Trainings from "./components/Trainings";
import Calendar from "./components/Calendar";
import { useToast } from "@chakra-ui/react";
import Statistics from "./components/Statistics";

function App() {

  const toast = useToast();

  const infoMsg = (title, text, color) => {
    toast({
        title: title,
        description: text,
        status: color,
        position: "top",
        duration: 3000,
        isClosable: true,
      });
}

  return (
    <div className="App">
      <Heading as="h3" size="lg" className="header" bgGradient="linear(to-r, gray.300, teal.400, teal.700)">PersonalTrainer</Heading>
      <Tabs variant="enclosed-colored" colorScheme="green">
        <TabList bgGradient="linear(to-r, gray.300, teal.400, teal.700)">
          <Tab><Icon marginRight='6px' as={BiUser} />Customers</Tab>
          <Tab><Icon marginRight='6px' as={BiRun} />Trainings</Tab>
          <Tab><Icon marginRight='6px' as={BiCalendarWeek} />Calendar</Tab>
          <Tab><Icon marginRight='6px' as={BiBarChartSquare} />Statistics</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            < Customers infoMsg={infoMsg} />
          </TabPanel>
          <TabPanel>
            < Trainings infoMsg={infoMsg} />
          </TabPanel>
          <TabPanel>
            < Calendar />
          </TabPanel>
          <TabPanel>
            < Statistics />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default App;
