import { Task } from "../interfaces/Task";

interface ITaskItem {
  task: Task;
  className: string;
  completeTask: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteTask: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const TaskItem = ({ task, className, completeTask, deleteTask }: ITaskItem) => {
  return (
    <li className={className} key={task.id}>
      <span className={`task`}>
        <input
          id="task"
          onChange={completeTask}
          type="checkbox"
          checked={task.done}
          data-id={task.id.toString()}
        />

        <span>{task.message}</span>
      </span>
      <button data-id={task.id?.toString()} onClick={deleteTask}>
        x
      </button>
    </li>
  );
};

export default TaskItem;
