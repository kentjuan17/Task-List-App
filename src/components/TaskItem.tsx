import React, { useState, useRef, useEffect } from "react";
import { Task } from "../model";
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import "./styles.scss";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskItem: React.FC<Props> = ({ index, task, tasks, setTasks }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.task);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editMode]);

  const handleDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, task: editTask } : task))
    );
    setEditMode(false);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`task_item ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, task.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {editMode ? (
            // display input for editing texts
            <input
              ref={inputRef}
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className="task_item-text"
            />
          ) : //  Conditional for pending or completed task
          task.isDone ? (
            <s className="task_item-text">{task.task}</s>
          ) : (
            <span className="task_item-text">{task.task}</span>
          )}

          <div>
            <span
              className="icon"
              onClick={() =>
                !editMode && !task.isDone && setEditMode(!editMode)
              }
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(task.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(task.id)}>
              <AiOutlineCheck />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TaskItem;
