import { useState, useEffect } from "react";
import { Task } from "../interfaces/Task";

export const useStorage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    ) as Task[];
    setTasks(savedTasks);
  }, []);

  const saveTasks = (tasks: Task[]) => {
    setTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  return [tasks, saveTasks] as const;
};
