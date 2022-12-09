import Todo from "./components/Todo";
import Form from "./components/Form";
import Tree from "./components/Tree";
import FilterButton from "./components/FilterButton";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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
  const [tasks, setTasks] = useState(props.tasks);
  
  const [selfCare, setSelfCare] = useState([{ id: `todo-1`, name: "Zumba", completed: true },
  { id: `todo-2`, name: "Meal prep", completed: false },
  { id: `todo-3`, name: "Journal", completed: false }]);
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
    console.log(tasks)
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

  const taskList = tasks
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

    const selfCareList = selfCare
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

  const tasksNoun = taskList.length === 1 ? "task" : "tasks";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
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
      <AppBar style={{ background: "#458f54" }} position="static">
        <Toolbar variant="dense">
          <ThemeProvider theme={theme}>
            <Typography fontFamily="Montserrat" variant="h1" color="black">TODO:&nbsp;</Typography>
            <Typography fontFamily="Montserrat" variant="h1">Grow</Typography>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      <Tree tasks={taskList.length}
                selfCare={3}/>

      <div className="columns">
        <div className="column">
          {/* Work */}
          <div className="todoapp stack-small">
            <Form title={"Work"} addTask={addTask}/>
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
          {/* Self */}
          <div className="todoapp stack-small">
            <Form title={"Self"} addTask={addTask}/>
            <div className="filters btn-group stack-exception">
              {filterButtonList}
            </div>
            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
              {`${selfCareList.length} ${tasksNoun} remaining`}
            </h2>

            {selfCareList}
          </div>
        </div>
      </div>

    </div>
    
  );
}

export default App;