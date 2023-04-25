import React, { useState, useRef } from "react";
import { useStorage } from "./hooks/useStorage";
import "./App.css";
import TaskItem from "./components/TaskItem";
import { JumboStyled } from "./components/styled/JumboStyled";
import { Container, FooterStyled } from "./components/styled/Container";
import {
  StyledForm,
  StyledTaskList,
  StyledSection,
} from "./components/styled/TaskStyled";

enum Tabs {
  ACTIVE = "active",
  COMPLETED = "completed",
  ALL = "all",
}

function App() {
  const [active, showActive] = useState<boolean>(true);
  const [completed, showCompleted] = useState<boolean>(true);
  const [tasks, saveTasks] = useStorage();
  const [activeTab, setActiveTab] = useState<string>("all");

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
      <JumboStyled>
        <h1>What Do You Want To Do?</h1>
      </JumboStyled>
      <Container>
        <StyledForm onSubmit={handleSubmit}>
          <input
            id="task"
            ref={taskRef}
            name="task"
            type="text"
            placeholder="Enter a task"
          />
        </StyledForm>
        {active && (
          <StyledSection className="active-tasks">
            <h2>Active</h2>
            <StyledTaskList>
              {tasks &&
                tasks
                  .filter((task) => !task.done)
                  .map((task) => {
                    return (
                      <TaskItem
                        className="active"
                        key={task.id}
                        task={task}
                        completeTask={completeTask}
                        deleteTask={deleteTask}
                      />
                    );
                  })}
            </StyledTaskList>
          </StyledSection>
        )}
        {completed && (
          <StyledSection className="completed-tasks">
            <h2>Completed</h2>
            <StyledTaskList>
              {tasks
                .filter((task) => task.done)
                .map((task, index) => {
                  return (
                    <TaskItem
                      className="completed"
                      key={task.id}
                      task={task}
                      completeTask={completeTask}
                      deleteTask={deleteTask}
                    />
                  );
                })}
            </StyledTaskList>
          </StyledSection>
        )}
        <FooterStyled>
          <p>
            <button
              onClick={() => {
                showActive(true);
                showCompleted(true);
                setActiveTab("all");
              }}
            >
              <span className={`${activeTab === Tabs.ALL ? `highlight` : ``}`}>
                All
              </span>
            </button>{" "}
            |{" "}
            <button
              onClick={() => {
                showActive(true);
                showCompleted(false);
                setActiveTab("active");
              }}
            >
              <span
                className={`${activeTab === Tabs.ACTIVE ? `highlight` : ``}`}
              >
                Active
              </span>
            </button>{" "}
            |{" "}
            <button
              onClick={() => {
                showCompleted(true);
                showActive(false);
                setActiveTab("completed");
              }}
            >
              <span
                className={`${activeTab === Tabs.COMPLETED ? `highlight` : ``}`}
              >
                Completed
              </span>
            </button>{" "}
          </p>
        </FooterStyled>
      </Container>
    </div>
  );
}

export default App;
