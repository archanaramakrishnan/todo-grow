import Todo from "./components/Todo";
import Form from "./components/Form";
import Tree from "./components/Tree";
import FilterButton from "./components/FilterButton";
import ParkRoundedIcon from '@mui/icons-material/ParkRounded';
import LocalFloristRoundedIcon from '@mui/icons-material/LocalFloristRounded';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
//A tiny, secure, URL-friendly, unique string ID generator for JavaScript.
import { nanoid } from "nanoid";
import React, { useState, useRef, useEffect } from "react";

//Inspired by React todo list project on MDN web docs https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning



function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const useLocalStorage = (storageKey, fallbackState) => {
    const [value, setValue] = useState(
      JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
    );
  
    useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);
  
    return [value, setValue];
  }

  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [selfCare, setSelfCare] = useLocalStorage("selfCare", []);

  const completedSelfCareCount = selfCare.filter(FILTER_MAP["Completed"]).length;
  const pendingSelfCareCount = selfCare.filter(FILTER_MAP["Active"]).length;

  const completedWorkCount = tasks.filter(FILTER_MAP["Completed"]).length;
  const pendingWorkCount = tasks.filter(FILTER_MAP["Active"]).length;
  const [filter, setFilter] = useState('All');

  const filterButtonList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
      />
  ));

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const updatedTasks = tasks.map((task) => {
      if(id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if(id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function addSelfCare(name) {
    const newSelfCare = { id: `self-${nanoid()}`, name, completed: false };
    setSelfCare([...selfCare, newSelfCare]);
  }

  function deleteSelfCare(id) {
    const remainingSelfCare = selfCare.filter((task) => id !== task.id);
    setSelfCare(remainingSelfCare);
  }

  function editSelfCare(id, newName) {
    const updatedSelfCare = selfCare.map((task) => {
      if(id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setSelfCare(updatedSelfCare);
  }

  function toggleSelfCareCompleted(id) {
    const updatedSelfCare = selfCare.map((task) => {
      if(id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setSelfCare(updatedSelfCare);
  }

  // function componentDidMount() {
  //   // called when the component is first mounted
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  //   localStorage.setItem("selfCare", JSON.stringify(selfCare));
  // }

  // function componentDidUpdate() {
  //   // called when there are updates in the component e.g., state changes
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  //   localStorage.setItem("selfCare", JSON.stringify(selfCare));
  // }

  const taskList = tasks.reverse()
        .filter(FILTER_MAP[filter])
        .map((task) => (
            <Todo name={task.name} 
                  completed={task.completed} 
                  id={task.id}
                  key={task.id}
                  toggleTaskCompleted={toggleTaskCompleted}
                  deleteTask={deleteTask}
                  editTask={editTask}
                />
              )
            );

    const selfCareList = selfCare.reverse()
        .filter(FILTER_MAP[filter])
        .map((task) => (
            <Todo name={task.name} 
                  completed={task.completed} 
                  id={task.id}
                  key={task.id}
                  toggleTaskCompleted={toggleSelfCareCompleted}
                  deleteTask={deleteSelfCare}
                  editTask={editSelfCare}
                />
              )
            );

  const tasksNoun = taskList.length === 1 ? "task" : "tasks";
  const headingText = `${pendingWorkCount} ${tasksNoun} remaining`;
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  const theme = createTheme();

  theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    },
  };

  return (
    <div>
      <AppBar style={{ background: "#458f54"}} position="static">
        <Toolbar variant="dense">
          <ThemeProvider theme={theme}>
            <Typography fontFamily="Montserrat" variant="h1" color="black">TODO:&nbsp;</Typography>
            <Typography fontFamily="Montserrat" variant="h1">Grow</Typography>
          </ThemeProvider>
        </Toolbar>
      </AppBar>

      
      <Tree tasks={completedWorkCount}
            selfCare={completedSelfCareCount}/>

      <h2 id="date">{Date().split(" ").slice(0,4).join(" ")}</h2>
      <div className="columns">
        <div className="column">
          {/* Work */}

          

          <div className="todoapp stack-small">
            <Form title={"Work"} icon={ParkRoundedIcon} addTask={addTask}/>
            <div className="filters btn-group stack-exception">
              {filterButtonList}
            </div>
            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
              {headingText}
            </h2>

            {taskList}
          </div>
        </div>

        <div className="column">
          {/* middle space for tree */}
          
        </div>
        <div className="column">
          {/* middle space for tree */}
          
        </div>

        <div className="column">
          {/* Self */}
          <div className="todoapp selfapp stack-small">
            <Form title={"Self"} icon={LocalFloristRoundedIcon} addTask={addSelfCare}/>
            <div className="filters btn-group stack-exception">
              {filterButtonList}
            </div>
            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
              {`${pendingSelfCareCount} ${pendingSelfCareCount === 1 ? "task" : "tasks"} remaining`}
            </h2>

            {selfCareList}
          </div>
        </div>
      </div>
      <h4 id="instructions">Check off items off of your productivity and self care list to grow a healthy, beautiful tree! Keep growing a little bit everyday with your tree ^_^ </h4>

    </div>
    
  );
}

export default App;