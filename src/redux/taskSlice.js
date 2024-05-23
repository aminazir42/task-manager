import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  filters: {
    category: "All",
    priority: "All",
    status: "All",
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        text: action.payload.text,
        category: action.payload.category,
        dueDate: action.payload.dueDate,
        priority: action.payload.priority,
        completed: false,
        comments: [],
      });
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    editTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
        task.category = action.payload.category;
        task.dueDate = action.payload.dueDate;
        task.priority = action.payload.priority;
      }
    },
    addComment: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        task.comments.push({
          id: Date.now(),
          text: action.payload.text,
        });
      }
    },
    removeComment: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        task.comments = task.comments.filter(comment => comment.id !== action.payload.commentId);
      }
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    loadTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, removeTask, toggleTask, editTask, addComment, removeComment, setFilter, loadTasks } = taskSlice.actions;
export default taskSlice.reducer;
