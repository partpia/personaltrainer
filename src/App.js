import { Flex, Heading, Icon, useToast } from "@chakra-ui/react";
import { BiBarChartSquare, BiBody, BiCalendarWeek, BiRun, BiUser } from "react-icons/bi";
import './App.css';
import Customers from './components/Customers';
import Trainings from "./components/Trainings";
import Calendar from "./components/Calendar";
import Statistics from "./components/Statistics";
import { Router, Link, Link as ReachLink } from "@reach/router";

function App() {

  const toast = useToast();

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
        </Flex>
        <Router>
          <Customers path="/" infoMsg={infoMsg} />
          <Trainings path="trainings" infoMsg={infoMsg}/>
          <Calendar path="calendar" />
          <Statistics path="statistics" />
        </Router>
    </div>
  );
}

export default App;
