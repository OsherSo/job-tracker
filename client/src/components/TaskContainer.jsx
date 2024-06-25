import Task from "./Task";

import { useToDoListContext } from "../pages/ToDoList";

import Wrapper from "../assets/wrappers/JobsContainer";

const TaskContainer = () => {
  const { data } = useToDoListContext();
  const { tasks, totalTasks } = data;

  if (tasks.length === 0) {
    return (
      <Wrapper>
        <h2>No tasks to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalTasks} task{tasks.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {tasks.map((task) => {
          return <Task key={task._id} {...task} />;
        })}
      </div>
    </Wrapper>
  );
};

export default TaskContainer;
