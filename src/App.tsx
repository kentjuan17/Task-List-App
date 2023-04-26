import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TaskList from "./components/TaskList";
import { Task } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (task) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          task,
          isDone: false,
        },
      ]);

      setTask("");
    }

    console.log(completedTasks);
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add;
    let active = tasks;
    let complete = completedTasks;

    if (source.droppableId === "TaskList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TaskList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTasks(complete);
    setTasks(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Task App</span>
        <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
        {/* Task List */}
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
