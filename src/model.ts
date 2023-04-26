import { useReducer } from "react";

export interface Task {
  id: number;
  task: string;
  isDone: boolean;
}

// type Actions =
//   | { type: "add"; payload: string }
//   | { type: "remove"; payload: number }
//   | { type: "done"; payload: number };

// const TaskReducer = (state: Task[], action: Actions) => {
//   switch (action.type) {
//     case "add":
//       return [
//         ...state,
//         { id: Date.now(), task: action.payload, isDone: false },
//       ];
//     case "remove":
//       return state.filter((task) => task.id !== action.payload);
//     case "done":
//       return state.map((task) =>
//         task.id !== action.payload ? { ...task, isDone: !task.isDone } : task
//       );
//     default:
//       return state;
//   }
// };

// const ReducerExample = () => {
//   const [state, dispatch] = useReducer(TaskReducer, []);
// };
