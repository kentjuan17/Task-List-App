import React from "react";
import { Task } from "../model";
import "./styles.scss";
import TaskItem from "./TaskItem";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  completedTasks: Task[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<Props> = ({
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TaskList">
        {(provided, snapshot) => (
          <div
            className={`tasks ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="tasks_heading">Active Tasks</span>
            {tasks.map((task, index) => (
              <TaskItem
                index={index}
                task={task}
                key={task.id}
                setTasks={setTasks}
                tasks={tasks}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TasksRemove">
        {(provided, snapshot) => (
          <div
            className={`tasks remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="tasks_heading">Completed Tasks</span>
            {completedTasks.map((task, index) => (
              <TaskItem
                index={index}
                task={task}
                key={task.id}
                setTasks={setCompletedTasks}
                tasks={completedTasks}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
