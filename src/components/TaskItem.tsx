import { Task } from "../interfaces/Task";

const TaskItem = ({ task }: { task: Task }) => {
  return (
    <li>
      <input type="checkbox" checked={task.done} />
      <span>{task.message}</span>
    </li>
  );
};

export default TaskItem;
