import Todo from "./components/Todo";
import Form from "./components/Form";
import Tree from "./components/Tree";
import FilterButton from "./components/FilterButton";
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

  const tasksNoun = taskList.length === 1 ? "task" : "tasks";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);
  

  return (
    <div className="todoapp stack-large">
      <Tree tasks={taskList.length}/>
      <h1>TODO: Grow</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterButtonList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

      {taskList}
    </div>
  );
}

export default App;