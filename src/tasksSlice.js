import { createSlice } from "@reduxjs/toolkit";

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case 'tasks/addTask':
      return [...state, action.payload];
    case 'tasks/deleteTask':
      return state.filter(task => task.id !== action.payload);
    case 'tasks/editTask': {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        const newState = [...state];
        newState[index] = action.payload;
        return newState;
      }
      return state;
    }
    case 'tasks/toggleComplete': {
      const index = state.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        const newState = [...state];
        newState[index] = { ...newState[index], completed: !newState[index].completed };
        return newState;
      }
      return state;
    }
    default:
      return state;
  }
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => tasksReducer(state, { type: 'tasks/addTask', payload: action.payload }),
    deleteTask: (state, action) => tasksReducer(state, { type: 'tasks/deleteTask', payload: action.payload }),
    editTask: (state, action) => tasksReducer(state, { type: 'tasks/editTask', payload: action.payload }),
    toggleComplete: (state, action) => tasksReducer(state, { type: 'tasks/toggleComplete', payload: action.payload }),
  },
});

export const { addTask, deleteTask, editTask, toggleComplete } = tasksSlice.actions;
export default tasksSlice.reducer;
