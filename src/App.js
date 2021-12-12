import { Flex, Heading, Icon, IconButton, useToast, useColorMode } from "@chakra-ui/react";
import { BiBarChartSquare, BiBody, BiCalendarWeek, BiGhost, BiRun, BiUser } from "react-icons/bi";
import './App.css';
import Customers from './components/Customers';
import Trainings from "./components/Trainings";
import Calendar from "./components/Calendar";
import Statistics from "./components/Statistics";
import { Router, Link, Link as ReachLink } from "@reach/router";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

function App() {

  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const infoMsg = (title, text, color) => {
    toast({
        title: title,
        description: text,
        status: color,
        position: "bottom-left",
        duration: 3000,
        isClosable: true,
      });
  }
  const NotFound = () => (
    <div style={{margin: 50}}><b>Sorry, nothing here! </b><Icon as={BiGhost} w={8} h={8}></Icon></div>
  )

  return (
    <div className="App">
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding={6}
          bg="teal.600"
          color="white">
          <Heading as="h1" size="lg" letterSpacing={"tighter"}><Link as={ReachLink} to='/'>Personal <Icon marginRight='6px' w={9} h={9} as={BiBody} />Trainer</Link></Heading>
          <Link as={ReachLink} to='/'><Icon marginRight='6px' as={BiUser} />Customers</Link>
          <Link as={ReachLink} to='trainings'><Icon marginRight='6px' as={BiRun} />Trainings</Link>
          <Link as={ReachLink} to='calendar'><Icon marginRight='6px' as={BiCalendarWeek} />Calendar</Link>
          <Link as={ReachLink} to='statistics'><Icon marginRight='6px' as={BiBarChartSquare} />Statistics</Link>
          <IconButton variant='outline' onClick={toggleColorMode} icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}>
          </IconButton>
        </Flex>
        <Router>
          <Customers path="/" infoMsg={infoMsg} colorMode={colorMode} />
          <Trainings path="trainings" infoMsg={infoMsg} colorMode={colorMode} />
          <Calendar path="calendar" />
          <Statistics path="statistics" />
          <NotFound default />
        </Router>
    </div>
  );
}

export default App;
