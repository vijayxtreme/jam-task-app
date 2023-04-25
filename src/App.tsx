import React, { useState, useRef } from "react";
import { useStorage } from "./hooks/useStorage";
import "./App.css";

function App() {
  const [active, showActive] = useState<boolean>(true);
  const [completed, showCompleted] = useState<boolean>(true);
  const [tasks, saveTasks] = useStorage();

  const taskRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskRef.current?.value) {
      let taskInput = taskRef.current?.value;

      const taskToSave = {
        id: tasks.length + 1,
        message: taskInput,
        done: false,
      };
      const newTaskList = [...tasks, taskToSave];
      taskRef.current.value = "";
      saveTasks(newTaskList);
    }
  };

  const completeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const done = e.target.checked;
    const id = e.target.dataset.id;
    if (id) {
      const newTaskList = [...tasks];
      const foundTask = tasks.find((task) => task.id === parseInt(id));
      if (foundTask) {
        foundTask.done = done;
        saveTasks(newTaskList);
      }
    }
  };

  const deleteTask = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const id = e.currentTarget.dataset.id;
    if (id) {
      saveTasks(
        tasks.filter((task) => {
          return task.id !== parseInt(id);
        })
      );
    }
  };

  return (
    <div className="app">
      <section>
        <h1>What Do You Want To Do?</h1>
        <form onSubmit={handleSubmit}>
          <input
            ref={taskRef}
            name="task"
            type="text"
            placeholder="Enter in your task"
          />
        </form>
      </section>
      {active && (
        <section className="active-tasks">
          {/** Default View */}
          <h2>Your Active Tasks</h2>
          <ul>
            {tasks &&
              tasks
                .filter((task) => !task.done)
                .map((task) => {
                  return (
                    <li key={task.id}>
                      <input
                        type="checkbox"
                        onChange={completeTask}
                        checked={task.done}
                        data-id={task.id?.toString()}
                      />

                      <span>{task.message}</span>
                      {` | `}
                      <button
                        data-id={task.id?.toString()}
                        onClick={deleteTask}
                      >
                        x
                      </button>
                    </li>
                  );
                })}
          </ul>
        </section>
      )}
      {completed && (
        <section className="completed-tasks">
          <h2>Your Completed Tasks</h2>
          <ul>
            {tasks
              .filter((task) => task.done)
              .map((task, index) => {
                return (
                  <li className={`completed`} key={task.id}>
                    <input
                      onChange={completeTask}
                      type="checkbox"
                      checked={task.done}
                      data-id={task.id.toString()}
                    />
                    <span>{task.message}</span>
                    {` | `}
                    <button data-id={task.id?.toString()} onClick={deleteTask}>
                      x
                    </button>
                  </li>
                );
              })}
          </ul>
        </section>
      )}
      <footer>
        <p>
          Show{" "}
          <button
            onClick={() => {
              showActive(true);
              showCompleted(true);
            }}
          >
            All
          </button>{" "}
          |{" "}
          <button
            onClick={() => {
              showActive(true);
              showCompleted(false);
            }}
          >
            Active
          </button>{" "}
          |{" "}
          <button
            onClick={() => {
              showCompleted(true);
              showActive(false);
            }}
          >
            Completed
          </button>{" "}
          Tasks
        </p>
      </footer>
    </div>
  );
}

export default App;
